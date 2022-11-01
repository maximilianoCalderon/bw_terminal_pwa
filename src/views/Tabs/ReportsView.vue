<template>
  <div>
    <br><br><br>
    <p>Pagina en construcción</p>
    <p>Favor de ingresar en el apartado de "Reportes" en la aplicación de <strong>OptiMit</strong> para poder ver las transacciones de esta terminal</p>
    <!-- <van-cell-group inset>
      <van-field
        :readonly="true"
        v-model="formattedDate"
        @click="showCalendar = true"
        label="Fecha"
      >
      </van-field>
    </van-cell-group>
    <br>
    <van-cell-group inset>
      <van-calendar
      title="Seleccione una fecha"
      :min-date="minDate" :max-date="maxDate" 
      v-model:show="showCalendar"
      @confirm="onConfirm"
    />
    </van-cell-group>

    <van-tabs :sticky="true" v-model:active="activeTab">
      <van-tab title="Aprobadas">
        <van-pull-refresh
          v-model="loadingApproved"
          @refresh="onRefreshApproved"
        >
          <van-card
            v-for="sale in sales"
            :key="sale.id"
            :price="sale.trxAmount"
            :title="
              sale.trxCardBank +
              ' ' +
              sale.trxCardInstrument +
              ' ' +
              sale.trxCard
            "
            :currency="sale.trxCurrency"
            :thumb="'/img/banks/' + sale.trxCardBrand.toUpperCase() + '.png'"
          >
            <template #desc>
              <div>
                <b>Metodo</b>: {{ sale.trxPaymentMode }} <br />
                <b>Referencia</b>: {{ sale.trxReference }}
              </div>
            </template>
            <template #tags>
              <van-tag
                plain
                :type="getStatus(sale)"
                >{{ getStatusName(sale) }}
              </van-tag>
            </template>
          </van-card>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="Declinadas">
        <van-pull-refresh v-model="loadingDenied" @refresh="onRefreshDenied">
          <van-card
            v-for="denied in denieds"
            :key="denied.id"
            :price="denied.trxAmount"
            :title="denied.trxDescription"
            :currency="denied.trxCurrency"
            :thumb="require('../../assets/banks/denied.png')"
          >
            <template #desc>
              <div>
                <b>Codigo</b>: {{ denied.trxResultCode }} <br />
                <b>Referencia</b>: {{ denied.trxReference }}
              </div>
            </template>
            <template #tags>
              <van-tag plain type="danger">{{ denied.trxResult }}</van-tag>
            </template>
          </van-card>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="Error">
        <van-pull-refresh v-model="loadingError" @refresh="onRefreshError">
          <van-card
            v-for="error in errors"
            :key="error.id"
            :price="error.trxAmount"
            :title="error.trxDescription"
            :currency="error.trxCurrency"
            :thumb="require('../../assets/banks/error.png')"
          >
            <template #desc>
              <div>
                <b>Codigo</b>: {{ error.trxResultCode }} <br />
                <b>Referencia</b>: {{ error.trxReference }}
              </div>
            </template>
            <template #tags>
              <van-tag plain type="danger">{{ error.trxResult }}</van-tag>
            </template>
          </van-card>
        </van-pull-refresh>
      </van-tab> 
      </van-tabs> -->
      <br /><br /><br />
  </div>
</template>

<script>
// import { BWMITSale } from "../../entities/BWMITSale.js";
import moment from "moment";
import { Toast } from "vant";

export default {
  data() {
    return {
      sales: [],
      denieds: [],
      errors: [],
      activeTab: 0,
      showCalendar: false,
      date: new Date(),
      formattedDate: moment(new Date()).format("DD/MM/YYYY"),
      loadingApproved: false,
      loadingError: false,
      loadingDenied: false,
      minDate: new Date(2022, 0, 1),
      maxDate: new Date(2025, 0, 31),
      branch: null,
      company: null
    };
  },
  // created() {
  //           //Significa que no esta logeado, lo regresamos
  //           if (this.$config.session_storage == "session" || this.$config.session_storage == "local") 
  //           {
  //               if (!this.$storage.getStorageSync("user")) 
  //                   this.$router.push('/Login');
  //           } else if (this.$config.session_storage == "cookies")
  //           {
  //                if (!this.$cookies.get("user")) 
  //                   this.$router.push('/Login');
  //                else 
  //               {
  //                 this.company = this.$cookies.get("company_uid");
  //                 this.branch = this.$cookies.get("branch_uid");
  //               }
  //           }
  //       },
  // methods: {
  //   getStatusName(sale) {
  //     if (sale.trxUrl == "/payment/refund") {
  //       return "REFUND"
  //     } else {
  //       return 'APPROVED';
  //     }
  //   },
  //   getStatus(sale) {
  //     if (sale.trxUrl == "/payment/refund") {
  //       return "primary";
  //     }else if ( sale.trxResult == 'APPROVED'){
  //       return 'success';
  //     }else {
  //       return 'danger';
  //     }
  //   },
  //   async buscar() {
  //     this.loadingApproved = true;
  //     this.loadingError = true;
  //     this.loadingDenied = true;
  //     try {
  //       await this.getSales();
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       this.loadingApproved = false;
  //     this.loadingError = false;
  //     this.loadingDenied = false;
  //     }
  //   },
  //   async onRefreshApproved() {
  //     this.loadingApproved = true;
  //     try {
  //       this.sales = await new BWMITSale().data({
  //         TrxResult: "APPROVED",
  //         date: moment(this.date).format(),
  //         id_branch: this.branch,
  //         id_company: this.company
  //       });
  //     } catch (error) {
  //       Toast.fail("No se pudieron cargar las transacciones");
  //     } finally {
  //       this.loadingApproved = false;
  //     }
  //   },
  //   async onRefreshDenied() {
  //     this.loadingDenied = true;
  //     try {
  //       this.denieds = await new BWMITSale().data({
  //         TrxResult: "DENIED",
  //         date: moment(this.date).format(),
  //         id_branch: this.branch,
  //         id_company: this.company
  //       });
  //     } catch (error) {
  //       Toast.fail("No se pudieron cargar las transacciones");
  //     } finally {
  //       this.loadingDenied = false;
  //     }
  //   },
  //   async onRefreshError() {
  //     this.loadingError = true;
  //     try {
  //       this.errors = await new BWMITSale().data({
  //         TrxResult: "ERROR",
  //         date: moment(this.date).format(),
  //         id_branch: this.branch,
  //         id_company: this.company
  //       });
  //     } catch (error) {
  //       Toast.fail("No se pudieron cargar las transacciones");
  //     } finally {
  //       this.loadingError = false;
  //     }
  //   },
  //   async onConfirm(val) {
  //     this.showCalendar = false;
  //     this.date = val;
  //     this.formattedDate = moment(val).format("DD/MM/YYYY");
  //     this.loadingApproved = true;
  //     this.loadingError = true;
  //     this.loadingDenied = true;
  //     try {
  //       await this.getSales();
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       this.loadingApproved = false;
  //     this.loadingError = false;
  //     this.loadingDenied = false;
  //     }
  //   },
  //   async getSales() {
  //     this.sales = await new BWMITSale().data({
  //       TrxResult: "APPROVED",
  //       date: moment(this.date).format(),
  //       id_branch: this.branch,
  //       id_company: this.company
  //     });

  //     this.denieds = await new BWMITSale().data({
  //       TrxResult: "DENIED",
  //       date: moment(this.date).format(),
  //       id_branch: this.branch,
  //       id_company: this.company
  //     });

  //     this.errors = await new BWMITSale().data({
  //       TrxResult: "ERROR",
  //       date: moment(this.date).format(),
  //       id_branch: this.branch,
  //       id_company: this.company
  //     });
  //   },
  // },
  mounted() {
    // this.getSales();
    Toast.setDefaultOptions({ className: 'myToast' });
  },
};
</script>

<style>
.myToast {
    --van-toast-default-width: 180px
    --van-toast-default-min-height: 180px
  }
</style>