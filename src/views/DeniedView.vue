<template>
<van-nav-bar class="login-navbar" title="Denegado" />
<br> 
<van-image
  src="/img/general/advertencia.png"
  fit="contain"
  width="12rem"
  height="12rem"
/>
<br>
<br> <h3>Error - Transaccion denegada</h3>
<h4> Codigo {{response.TrxResultCode}}</h4>
<h4> {{dictionary(response.TrxDescription)}}</h4>
    <!-- <pre>{{ JSON.stringify(request, null, 2) }}</pre> -->
<div style="margin: 16px;">
    <van-button round block type="primary" @click="goApp">
      Ir a App
    </van-button>
    <br>
    <!-- <div>{{config}}</div> -->
  </div>
</template>

<script>
import { BWMITSale } from '@/entities/BWMITSale';
export default {
    data()  {
        return {
            request: {},
            response: {
                TrxDescription: "N/D",
                TrxResultCode: "N/D",
            }
        }
    },
    computed: {
        // config() {
        //     /* eslint-disable */
        //     return posweb ? Object.keys(posweb) : "No existe posweb";
        // }
    },
    methods: {
        dictionary(descripcion) {
            if (descripcion.includes("Invalid/Unregistered value for TrxFValue"))
                return "El tipo de pago seleccionado es invalido para la afiliacion seleccionada, no se puede transaccionar de esta manera"
            else 
                return descripcion;
        },
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
    mounted() {
        //TODO: LOGEAR STATE EN SERVIDOR
        //* TIENE QUE SER SINCRONO PARA NO DETENER LO DEMAS
        try {
            new BWMITSale().saveState("OnApproved", response)
        } catch (error) {
            console.log(error);
        }
        var response = this.getQueryVariable('response');
        if (response) {
            this.response = JSON.parse(response);
        }
        if (this.$cookies.get("json")) {
            this.request = this.$cookies.get("json");
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