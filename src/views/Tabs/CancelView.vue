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
      <InputCurrency ref="myAmount" v-model="amount"></InputCurrency>
  </van-cell-group>
  <br>
  <van-cell-group inset>
      <van-field v-model="id" label="Folio" placeholder="..." />
      <van-field autocomplete="off" v-model="auth" label="Auth" placeholder="..." />
      <van-field v-if="isCancelable" autocomplete="new-password" v-model="password" label="Password" type="password" />
  </van-cell-group>
  <br>
  


  <van-row gutter="20" justify="center">
    <van-col span="22">
      <van-button type="primary" round block @click="focusAmount">Ingresar Cantidad</van-button>
      </van-col>
  </van-row><br>
  <van-row gutter="20" justify="center">
    <van-col span="22"><van-button type="danger" round block @click="onRefund">Devolver</van-button></van-col>
  </van-row>
</div>
</template>

<script>
  import { Toast } from 'vant';
  import { BWMITSale } from "../../entities/BWMITSale";
  // Import component
  import Loading from 'vue3-loading-overlay';
  // Import stylesheet
  import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
  import InputCurrency from "../../components/InputCurrency.vue";
import { BWTerminalUser } from '@/entities/BWTerminalUser';

export default {
  data() {
    return {
      amount: 0,
      id: null,
      auth: null,
      password: '',
      reference: null,
      isLoading: false,
      pointMode: false,
      company_uid: null
    }
  },
  components: { Loading, InputCurrency },
  computed: {
    formatedAmount() {
      return Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
      }).format(parseFloat(this.amount));
    },
    isCancelable() {
      return this.$config.cancel_permission.find(x => x == this.company_uid) ? true : false;
    }
  },
  methods: {
    onHide() {
      this.pointMode = false;
    },
    focusAmount() {
      this.$refs.myAmount.focus();
    },
    async onRefund() {
      this.isLoading = true;
      try {
        if (this.amount == 0)
          throw "Ingrese una cantidad superior a 0.00"
        if (!this.id)
          throw "Escriba el folio"
        if (!this.auth)
          throw "Escriba la autorizacion"
        if (this.isCancelable && this.password == null && this.password == "") 
          throw "Escriba una contraseña"
        
        if (this.isCancelable) {
          let company_uid = this.$cookies.get('company_uid');
          try {
            await new BWTerminalUser().cancel(company_uid, this.password);
          } catch (error) {
            throw "La contraseña maestra es incorrecta, intente de nuevo"
          }
        }
        
          
        let BWSale = new BWMITSale();
        BWSale.TrxCurrency = "1"; //* MXN
        BWSale.TrxReference = this.reference;
        BWSale.GetNetLicence = "ZTk4MzIzYzAtMTM1Ny00YTE4LWEwYTYtM2EyYTNlMTNkYzBi";
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
  created() {
    if (!this.$cookies.get("user")) 
        this.$router.push('/Login');
    this.company_uid = this.$cookies.get('company_uid');
  },
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