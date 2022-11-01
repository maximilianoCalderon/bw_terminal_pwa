<template>
  <van-nav-bar class="admin-navbar" :fixed="true" :title="currentRouteName" />
  <router-view v-slot="{ Component }">
    <!-- Transicion general del sistema -->
    <FadeInOut entry="left" exit="right" :duration="350" mode="out-in">
      <component :is="Component" />
    </FadeInOut>
  </router-view>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="cart-o">Terminal</van-tabbar-item>
    <van-tabbar-item icon="exchange">Cancelacion</van-tabbar-item>
    <van-tabbar-item icon="user-circle-o">Perfil</van-tabbar-item>
    <van-tabbar-item icon="chart-trending-o">Reportes</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
    data() {
        return {
            active: null,
            title: 'Business Wallet'
        }
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        }
    },
    watch: {
        active(newValue) { 
            if (newValue == 0) {
                this.$router.push("/Terminal")
                //this.$router.push("/Terminal");
            }else if (newValue == 1) {
                this.$router.push("/Cancel");
            }else if (newValue == 2) {
                this.$router.push("/Session");
            }else if (newValue == 3) {
                this.$router.push("/Reports");
            }
        },
    },
    // created() {
    //          if (!this.$cookies.get("user")) 
    //                 this.$router.push('/Login');
    //     }           
}
</script>

<style>
.admin-navbar {
    --van-nav-bar-background-color: #20242e;
    --van-nav-bar-text-color: #ffffff;
    --van-nav-bar-title-text-color: #ffffff;
}
</style>