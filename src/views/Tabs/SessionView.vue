<template>
  <van-form>
  <br><br><br>
    <van-cell-group inset>
      <van-field
        label="Usuario"
        v-model="entity.user"
        name="pattern"
        :readonly="true"
      />
      <van-field
        label="Nombre"
        v-model="entity.name"
        name="pattern"
        :readonly="true"
      />
      <van-field
      label="Empresa"
        v-model="entity.company"
        name="validator"
        :readonly="true"
      />
      <van-field
      label="Empresa ID"
        v-model="entity.company_uid"
        name="validator"
        :readonly="true"
      />
      <van-field
      label="Sucursal"
        v-model="entity.branch"
        name="validatorMessage"
        :readonly="true"
      />
      <van-field
      label="Sucursal ID"
        v-model="entity.branch_uid"
        name="validator"
        :readonly="true"
      />
       <!-- <van-field
      label="Dispositivo"
        v-model="entity.device"
        name="validatorMessage"
        :readonly="true"
      /> -->
    </van-cell-group>
  <div style="margin: 16px;">
    <van-button @click="logout" icon="close" round block type="danger" native-type="submit">
      Salir
    </van-button>
  </div>
</van-form>
</template>

<script>
export default {
  data() {
    return {
      entity: {
        user: '',
        company: 'N / A',
        branch: 'N / A',
        name: "",
        device: "",
        company_uid: "",
        branch_uid: ""
      }
    }
  },
  methods: {
    logout() {
      this.$cookies.remove('user');
      this.$cookies.remove('company');
      this.$cookies.remove('branch');
      this.$cookies.remove('licence');
      this.$cookies.remove('name');
      this.$cookies.remove('device');
      this.$cookies.remove('company_uid');
      this.$cookies.remove('branch_uid');
      this.$router.push('/Login');
    }
  },
  created() {
        if (!this.$cookies.get("user")) 
          this.$router.push('/Login');
        else 
        {
          this.entity.user = this.$cookies.get("user").toUpperCase();
          this.entity.company = this.$cookies.get("company").toUpperCase();
          this.entity.branch = this.$cookies.get("branch").toUpperCase();
          this.entity.name = this.$cookies.get("name").toUpperCase();
          this.entity.device = this.$cookies.get("device").toUpperCase();
          this.entity.company_uid = this.$cookies.get('company_uid');
          this.entity.branch_uid = this.$cookies.get('branch_uid');
        }
    }
}
</script>

<style>
.myToast {
    --van-toast-default-width: 180px
    --van-toast-default-min-height: 180px
  }
</style>