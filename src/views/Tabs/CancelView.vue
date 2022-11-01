<template>
<div>
  <loading :active="isLoading" 
        :can-cancel="false" 
        color="#107de3"
        loader="bars"
        :is-full-page="true"></loading>
  <br><br><br>
   <van-cell-group inset>
      <h3>Importe Devolucion</h3>
      <h2>{{formatedAmount}}</h2>
  </van-cell-group>
  <br>
  <van-cell-group inset>
      <van-field v-model="id" label="Folio" placeholder="..." />
      <van-field v-model="auth" label="Auth" placeholder="..." />
  </van-cell-group>
  <br>
  


  <van-row gutter="20" justify="center">
    <van-col span="22">
      <van-button type="primary" round block @click="show = true">Ingresar Cantidad</van-button>
      </van-col>
  </van-row><br>
  <van-row gutter="20" justify="center">
    <van-col span="22"><van-button type="danger" round block @click="onRefund">Devolver</van-button></van-col>
  </van-row>
<van-number-keyboard
  :show="show"
  @blur="onHide"
  @input="onInput"
  extra-key="."
  @delete="onDelete"
/>
</div>
</template>

<script>
  import { Toast } from 'vant';
  import { BWMITSale } from "../../entities/BWMITSale";
  // Import component
  import Loading from 'vue3-loading-overlay';
  // Import stylesheet
  import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default {
  data() {
    return {
      amount: 0,
      id: null,
      auth: null,
      reference: null,
      show: false,
      isLoading: false,
      pointMode: false
    }
  },
  components: { Loading },
  computed: {
    formatedAmount() {
      return Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
      }).format(parseFloat(this.amount));
    },
  },
  methods: {
    onHide() {
      this.show = false;
      this.pointMode = false;
    },
    async onRefund() {
      this.isLoading = true;
      try {
        if (!this.id)
          throw "Escriba el folio"
        if (!this.auth)
          throw "Escriba la autorizacion"
        if (this.amount == 0)
          throw "Ingrese una cantidad superior a 0.00"
        
        let BWSale = new BWMITSale();
        BWSale.TrxCurrency = "1"; //* MXN
        BWSale.TrxReference = this.reference;
        BWSale.GetNetLicence = this.$cookies.get("licence");
        BWSale.TrxDevice = this.$cookies.get("device"); //* ESTE VA POR CONFIG DE USER
        BWSale.TrxAmount = this.amount;
        BWSale.TrxUser = this.$cookies.get("user"); 
          // BWSale.TrxAmount = this.amount.toString();
        var json = {
            TrxAmount: BWSale.TrxAmount,
            TrxOriginalNumber: this.id,
            TrxAuth: this.auth,
            License: "ZTk4MzIzYzAtMTM1Ny00YTE4LWEwYTYtM2EyYTNlMTNkYzBi",
            TrxReference: BWSale.TrxReference,
            TrxUser: BWSale.TrxUser,
            TrxCurrency: BWSale.TrxCurrency,
            TrxUrl: "https://integration.pos.io/payment/refund"
        }

        try {
          let cookieJSON = {...json};
          delete cookieJSON.License;
          delete cookieJSON.TrxUrl;
          this.$cookies.set('json', JSON.stringify(cookieJSON))
        } catch (error) {
          console.log(error)
        }

        this.amount = 0;
        this.reference = null;
        this.id = null;
        this.auth = null;
        this.show = false;
        this.isLoading = false;
        this.pointMode = false;
        /* eslint-disable */
        posweb.executeTransaction(JSON.stringify(json));
        //Toast.success("Transaccion enviada con exito");
      } catch (error) {
        if (error.response) {
          Toast.fail(error.response.data);
        }else {
          Toast.fail(error);
        }
      } finally {
        this.isLoading = false;
      }
    },
    onDelete() {
      this.pointMode = false;
      if (this.amount.toString().length == 1)
        this.amount = 0;
      else
        this.amount = parseFloat(this.amount.toString().slice(0, -1));
    },
    onInput(e) {
      if(e == ".")
        this.pointMode = true;
      else if (this.amount == 0) 
        this.amount = e;
      else 
      {
        let newAmount = this.pointMode ? parseFloat(this.amount.toString() + ("." + e.toString())) : parseFloat(this.amount.toString() + e.toString());
        let middlePoint = newAmount.toString().split('.');
        this.amount = (middlePoint.length == 2 ? !(middlePoint[1].length > 2) : true) ? newAmount : this.amount;
        this.pointMode = false;
      }
    }
  },
  // created() {
  //      if (!this.$cookies.get("user")) 
  //                   this.$router.push('/Login');
  // },
  mounted() {
    Toast.setDefaultOptions({ className: 'myToast' });
  }
}
</script>

<style>
.myToast {
    --van-toast-default-width: 180px
    --van-toast-default-min-height: 180px
  }
</style>