<template>
<div>
<van-dialog :show-confirm-button="false" v-model:show="showPopup" title="Concepto" show-cancel-button>
  <van-cascader
      v-model="cascaderValue"
      title="Concepto"
      :options="options"
      @close="show = false"
      @finish="onFinish"
    />
</van-dialog>
  <loading :active="isLoading" 
        :can-cancel="false" 
        color="#107de3"
        loader="bars"
        :is-full-page="true"></loading>
        
  <br><br><br>
  <van-notice-bar v-if="error"
  :text="error" />
   <van-cell-group inset>
      <h3>Importe</h3>
      <InputCurrency ref="myAmount" v-model="amount"></InputCurrency>
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
        v-model="concepto"
        is-link
        readonly
        label="Concepto"
        placeholder="..."
        @click="showPopup = true"
      />
  </van-cell-group>
  <br>
  <van-cell-group inset>
      <van-field
        :disabled="concepto != ''"
        v-model="reference"
        label="Referencia"
        type="textarea"
        :placeholder="concepto != '' ? '' : 'Escriba una referencia'"
        rows="3"
        autosize
        maxlength="20"
        show-word-limit
      />
  </van-cell-group>
  <br>
  <van-row gutter="20" justify="center">
    <van-col span="22">
      <van-button type="primary" round block @click="focusAmount">Ingresar Cantidad</van-button>
      </van-col>
  </van-row><br>
  <van-row gutter="20" justify="center">
    <van-col span="22"><van-button type="success" round block @click="onPay">Pagar</van-button></van-col>
  </van-row>
  <br>
  <!-- {{config}} -->
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
  import { BWMITConcept } from "../../entities/BWMITConcept";
  // Import component
  import Loading from 'vue3-loading-overlay';
  // Import stylesheet
  import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
  import InputCurrency from "../../components/InputCurrency.vue";

export default {
  data() {
    return {
      concepto: "",
      showPopup: false,
      cascaderValue: '',
      options: [],
      concepts: [],
      amount: 0,
      reference: null,
      show: false,
      isLoading: false,
      paymentMode: 0,
      pointMode: false,
      error: null
    }
  },
  components: { InputCurrency, Loading },
  computed: {
    //   config() {
    //   /* eslint-disable */
      
    //   return posweb ? Object.keys(posweb) : "No existe posweb";
    // },
    formatedAmount() {
      return Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
      }).format(parseFloat(this.amount));
    },
  },
  watch: {
    concepto(newValue) {
      this.reference = newValue != "" ? newValue.replace(" ", "_").toUpperCase().substring(0, 30) : this.reference; 
    }
  },
  methods: {
    uuid() {
      
    },
    focusAmount() {
      this.$refs.myAmount.focus();
    },
    onFinish(payload) { 
      this.showPopup = false;
      this.concepto = this.concepts.find(x => x.id == payload.value).name;
    },
    onHide() {
      this.show = false;
      this.pointMode = false;
    },
    async onPay() {
      this.isLoading = true;
      try {
        if (!this.reference)
          throw "Escriba una referencia"
        if (this.amount == 0)
          throw "Ingrese una cantidad superior a 0.00"

        let BWSale = new BWMITSale();
        BWSale.TrxCurrency = "1"; //* MXN
        BWSale.TrxReference = this.reference;
        BWSale.TrxPaymentMode = this.paymentMode.toString();
        BWSale.GetNetLicence = "ZTk4MzIzYzAtMTM1Ny00YTE4LWEwYTYtM2EyYTNlMTNkYzBi";
        BWSale.TrxDevice = this.$cookies.get("device"); //* ESTE VA POR CONFIG DE USER
        BWSale.TrxAmount = this.amount;
        BWSale.TrxUser = this.$cookies.get("user"); 
          // BWSale.TrxAmount = this.amount.toString();
        //* Debido a los problemas la referencia solo sera de 20 digitos, los ultimos
        // 10 seran un TIMESPAN
        var json = {
            TrxCurrency: BWSale.TrxCurrency,
            TrxAmount: BWSale.TrxAmount,
            License: "ZTk4MzIzYzAtMTM1Ny00YTE4LWEwYTYtM2EyYTNlMTNkYzBi",
            TrxUser: BWSale.TrxUser,
            TrxReference: BWSale.TrxReference + '|' + Math.floor(Date.now() / 1000).toString().substring(1),
            TrxPaymentMode: BWSale.TrxPaymentMode,
            TrxUrl: "https://integration.pos.io/payment/sale"
            // TrxUrl: "https://www.intelipos.io/mmc-ws/i/payment/sale"
        }

        try {
          let cookieJSON = {...json};
          // delete cookieJSON.License;
          // delete cookieJSON.TrxUrl;
          this.$cookies.set('json', JSON.stringify(cookieJSON))
        } catch (error) {
          console.log(error)
        }

        this.amount = 0;
        this.reference = null;
        this.show = false;
        this.isLoading = false;
        this.paymentMode = 0;
        this.pointMode = false;

        this.$cookies.set('concept', this.concepto);
        this.concepto = "";
        /* eslint-disable */
        posweb.executeTransaction(JSON.stringify(json));
        //Toast.success("Transaccion enviada con exito");
      } catch (error) {
        if (error.response) {
          this.error = error.response;
          Toast.fail(error.response.data);
        }else {
          this.error = error;
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
  async created() {
      //  if (!this.$cookies.get("user")) 
      //               this.$router.push('/Login');
    // this.concepts = await new BWMITConcept().get(company, branch);  
  },
  async mounted() {
    let company = this.$cookies.get('company');
    let branch = this.$cookies.get('branch');
    this.concepts = await new BWMITConcept().get(company, branch);
    /*
    options: [
      {
        text: 'Zhejiang',
        value: '330000',
        children: [{ text: 'Hangzhou', value: '330100' }],
      },*/
      this.options = [];
      //Agregamos clasificaciones
      this.concepts.forEach(concept => {
        if (!this.options.find(x => x.text == concept.classification)) {
          this.options.push({
            text: concept.classification,
            value: concept.classification,
            children: this.concepts.filter(y => y.classification == concept.classification).map(z => {
              return {
                text: z.name,
                value: z.id
              }
            })
          })
        }
      });
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