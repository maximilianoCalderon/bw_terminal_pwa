<template>
<van-nav-bar class="login-navbar" title="Aprobada" />
<br> 
<van-image
  src="/img/general/transferencia.png"
  fit="contain"
  width="12rem"
  height="12rem"
/>
<br>
<br> <h3>Transaccion Aprobada</h3>
<h4> Importe {{response.TrxAmount}} {{response.TrxCurrency}}</h4>
<h4> Autorizacion {{response.TrxAuth}}</h4>
<h4> Folio {{response.TrxOriginalNumber}}</h4>
<h4> Referencia {{response.TrxReference}}</h4>
<h4> Concepto {{response.TrxConcept}}</h4>
<h4> Fecha {{response.TrxDate}} {{response.TrxTime}}</h4>
<h4> Tipo Pago {{response.TrxPaymentMode}}</h4>
<h4> Tarjeta {{response.TrxCardBank}} - {{response.TrxCardBrand}} - {{response.TrxCard}}</h4>
<h4> Tipo Tarjeta {{response.TrxCardInstrument}}</h4>
<div style="margin: 16px;">
    <van-button round block type="primary" @click="goApp">
      Ir a App
    </van-button>
  </div>
     <br>
    <!-- <div>{{config}}</div> -->
</template>

<script>
import { BWMITSale } from '@/entities/BWMITSale';
export default {
    data()  {
        return {
            response: {
                TrxAmount: "0.00",
                TrxCurrency: "MXN",
                TrxAuth: "N/D",
                TrxOriginalNumber: "N/D",
                TrxReference: "N/D",
                TrxDate: "N/D",
                TrxTime: "N/D",
                TrxPaymentMode: "N/D",
                TrxCardBank: "N/D",
                TrxCardBrand: "N/D",
                TrxCard: "N/D",
                TrxCardInstrument: "N/D",
                TrxConcept: null
            },
        }
    },
    computed: {
        // config() {
        //     /* eslint-disable */
        //     return posweb ? Object.keys(posweb) : "No existe posweb";
        // }
    },
    methods: {
        goApp() {
            //this.$router.push('/Admin');
            /* eslint-disable */
            try {
                //!! ESTA FUNCION CAMBIA MUCHO PUEDE SER index() o home()
                posweb.home();
            } catch (error) {
                this.$router.push('/Admin');
            }
        },
        getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (decodeURIComponent(pair[0]) == variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
        },
    },
    async mounted() {
        var response = this.getQueryVariable('response');

        //TODO: LOGEAR STATE EN SERVIDOR
        //* TIENE QUE SER SINCRONO PARA NO DETENER LO DEMAS
        try {
            new BWMITSale().saveState("OnApproved", response)
        } catch (error) {
            console.log(error);
        }

        if (response) {
            this.response = JSON.parse(response);
            //AQUI GUARDAMOS TODO ALV
            


            //* AQUI MANDAMOS OTRA VEZ LA FUNCION PARA GUARDAR CONCEPTO
            //* LO QUE SE DEBE DE HACER ES GUARDAR LA SESSION PARA LUEGO MANDAR UN UPDATE EN SERVER 
            this.response.TrxConcept = this.$cookies.get('concept');
            this.$cookies.remove("concept");
            try {
                await new BWMITSale().updateConcept(this.response.TrxOriginalNumber,this.response.TrxMerchant, this.response.TrxConcept);
            } catch (error) {
                console.log(error);
            }

        }
    },
}
</script>

<style>
  .myToast {
    --van-toast-default-width: 180px
    --van-toast-default-min-height: 180px
  }
  .login-navbar {
      --van-nav-bar-background-color: #20242e;
      --van-nav-bar-text-color: #ffffff;
      --van-nav-bar-title-text-color: #ffffff;
  }
</style>