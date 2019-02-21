<template>
  <div class="page-order page-container">
    <v-layout row>
      <v-flex xs6 class="primary-title">
        <title-boat
          :targetClass="title.targetClass"
          :textUp="title.textUp"
          :textDown="title.textDown"
        />
      </v-flex>
    </v-layout>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">選擇房型</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2">填寫資料</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">完成訂房</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <!-- <v-form v-model="validStepOne" ref="formStepOne" lazy-validation> -->
            <v-layout row wrap>
              <v-flex sm12 md3>
                <h3 class="primary--text">請依入住期間，查詢房間狀況</h3>
              </v-flex>
              <v-flex sm12 md6>
                <date-range
                  :options="datePickerRange"
                />
              </v-flex>
              <v-flex sm12 md2 ml-5>
                <v-btn @click="methodSearchRommByTime" class="primary">
                  <v-icon>mdi-magnify</v-icon>
                  查詢房間
                </v-btn>
                <v-btn flat @click="methodFormResetStepOne">
                  重置
                </v-btn>
              </v-flex>
            </v-layout>
          <!-- </v-form> -->
          <v-divider class="my-5"></v-divider>

          <!--
              <v-flex sm12 md4 lg3 px-1 >
                <v-select
                  v-model="orderParamsStepOne.roomType"
                  :items="constVar.roomTypeList"
                  item-text="value"
                  item-value="id"
                  label="訂房房型"
                  :rules="nameRules"
                  required
                ></v-select>
              </v-flex>
          -->
          <v-layout row justify-end>
            <v-flex xs1>
              <v-btn
                color="primary"
                @click="e1 = 2"
              >
                下一步
              </v-btn>
            </v-flex>
          </v-layout>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"
          ></v-card>
          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            Continue
          </v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"
          ></v-card>
          <v-btn
            color="primary"
            @click="e1 = 1"
          >
            Continue
          </v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import titleBoat from '@/components/titleBoat.vue';
import dateRange from '@/components/dateRange.vue';
import constVar from '@/utils/constVar';
import { getDate, addDays } from '@/utils/dateMethod';

export default {
  name: 'pageOrder',
  components: {
    titleBoat,
    dateRange,
  },
  data() {
    return {
      constVar,
      title: {
        textUp: '預定房型',
        textDown: 'ORDER',
        targetClass: 'target-order',
      },
      e1: 0,
      validStepOne: false,
      validStepTwo: false,
      validStepThree: false,
      orderParamsStepOne: this.getParamsOriginStepOne(),
      datePickerRange: this.getDatePickerRangeOri(),
      // nameRules: [
      //   v => !!v || '此欄位為必填',
      // ],
    };
  },
  mounted() {
    this.$vuetify.goTo(0, constVar.scrollPagAni);
  },
  methods: {
    getDate,
    addDays,
    getDatePickerRangeOri() {
      return {
        startDate: this.getDate(),
        endDate: this.getDate(this.addDays(Date.now(), 2)),
        minDate: this.getDate(),
        maxDate: this.getDate(this.addDays(Date.now(), 90)),
      };
    },
    getParamsOriginStepOne() {
      return {
        roomType: null,
        nameShow: null,
        phoneShow: null,
        emailShow: null,
        nationalityShow: null,
        priceShow: null,
        totalPriceShow: null,
        noteShow: null,
      };
    },
    methodSearchRommByTime() {

    },
    methodFormResetStepOne() {
      this.datePickerRange = this.getDatePickerRangeOri();
      // this.orderParamsStepOne = this.getParamsOriginStepOne();
      // this.$refs.formStepOne.resetValidation();
    },
    methodDayFormat(date) {
      return getDate(date, 'date');
    },
  },
};
</script>
