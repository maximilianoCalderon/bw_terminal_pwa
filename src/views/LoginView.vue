<template>
<van-nav-bar class="login-navbar" title="Login" />
<br> 
<loading :active="isLoading" 
        :can-cancel="false" 
        color="#107de3"
        loader="bars"
        :is-full-page="true"></loading>
<van-image
  src="/img/general/logo.png"
  fit="contain"
  width="12rem"
  height="12rem"
/>
<br>
<van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
      v-model="user"
      name="user"
      label="Usuario"
       placeholder="Escribe el usuario..."
      class="login-field"
      :rules="[{ required: true, message: 'Username is required' }]"
    />
    <van-field
      class="login-field"
      name="password"
      v-model="password"
      type="password"
      placeholder="Escribe el password..."
      label="Password"
      :rules="[{ required: true, message: 'Password is required' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      Login
    </van-button>
  </div>
  <div style="margin: 16px;">
    <van-button round block type="warning" @click="goIndex">
      Regresar
    </van-button>
  </div>
</van-form>
<br>
<div v-html="getVars()"></div>
<!-- <div>{{config}}</div> -->

</template>

<script>
import { ref } from 'vue';
import { BWTerminalUser } from "../entities/BWTerminalUser";
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import { useCookies } from "vue3-cookies";
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default {
  setup() {
    const router = useRouter();
    const { cookies } = useCookies();
    const isLoading = ref(false);
    const user = ref('');
    const password = ref('');
    if (cookies.get('user'))
          router.push('/Admin');

    return {
      user,
      password,
      isLoading
    };
  },
  computed: {
    config() {
      /* eslint-disable */
      return "";
      // return posweb ? Object.keys(posweb) : "No existe posweb";
    }
  },
  methods: {
    goIndex() {
      /* eslint-disable */
      posweb.home();
    },
    getVars() {
       /* eslint-disable */
      try {
        
      } catch (error) {
        return "No se encontro la clase 'posweb'";
      }
    },
    async onSubmit(values) {
      try {
        this.isLoading = true;
        let response = await new BWTerminalUser().login(values);
        //*Agregar variables de session
        this.$cookies.set('user', values.user);
        this.$cookies.set('company', response.company);
        this.$cookies.set('branch', response.branch);
        this.$cookies.set('licence', "ZTk4MzIzYzAtMTM1Ny00YTE4LWEwYTYtM2EyYTNlMTNkYzBi");
        this.$cookies.set('name', response.name);
        this.$cookies.set('device', response.device);
        this.$cookies.set('company_uid', response.company_tax_number);
        this.$cookies.set('branch_uid', response.branch_tax_number);
        this.$router.push('/Admin');
      } catch (err) {
        Toast.setDefaultOptions({ className: 'myToast' });
        if (err.response) 
          Toast.fail(err.response.data);
        else
          Toast.fail('Error interno: ' + err);
      } finally {
        this.isLoading = false;
      }
    }
  },
  components: {
    Loading
  }
};
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