<template>
<div>
  <loading :active="isLoading" 
        :can-cancel="false" 
        color="#107de3"
        loader="bars"
        :is-full-page="true"></loading>
  <br><br><br>
   <van-cell-group inset>
      <h3>Importe</h3>
      <h2>{{formatedAmount}}</h2>
  </van-cell-group><br>
  
  
  <van-cell-group inset>
     <van-dropdown-menu>
    <van-dropdown-item v-model="paymentMode" :options="[
      { text: 'Contado', value: 0 },
      { text: '3 Meses sin intereses', value: 3 },
      { text: '6 Meses sin intereses', value: 6 },
      { text: '9 Meses sin intereses', value: 9 },
      { text: '12 Meses sin intereses', value: 12 },
    ]" />
  </van-dropdown-menu>
  </van-cell-group>
  <br>
  <van-cell-group inset>
      <van-field
    v-model="reference"
    label="Referencia"
    type="textarea"
    placeholder="Escriba una referencia"
    rows="3"
    autosize
  />
  </van-cell-group>
  <br>
  


  <van-row gutter="20" justify="center">
    <van-col span="22">
      <van-button type="primary" round block @click="show = true">Ingresar Cantidad</van-button>
      </van-col>
  </van-row><br>
  <van-row gutter="20" justify="center">
    <van-col span="22"><van-button type="success" round block @click="onPay">Pagar</van-button></van-col>
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
      reference: null,
      show: false,
      isLoading: false,
      paymentMode: 0,
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
    async onPay() {
      this.isLoading = true;
      try {
        if (!this.reference) {
          throw "Escriba una referencia"
        }
        if (this.amount == 0) {
          throw "Ingrese una cantidad superior a 0.00"
        }
        let BWSale = new BWMITSale();
        BWSale.TrxCurrency = "1"; //* MXN
        BWSale.TrxReference = this.reference;
        BWSale.TrxPaymentMode = this.paymentMode.toString();
        BWSale.GetNetLicence = this.$cookies.get("licence");
        BWSale.TrxDevice = this.$cookies.get("device"); //* ESTE VA POR CONFIG DE USER
        BWSale.TrxAmount = this.amount;
          // BWSale.TrxAmount = this.amount.toString();

        await BWSale.sale();
        Toast.success("Transaccion enviada con exito");
        this.amount = 0;
        this.reference = null;
      } catch (error) {
        this.errorMode = true;
        if (error.response) {
          //alert(error.response)
          Toast.fail(error.response.data);
        }else {
          Toast.fail(error);
        }
        //Toast.fail(error);
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