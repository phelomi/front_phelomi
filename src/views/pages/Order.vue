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
          <v-layout row wrap v-if="calendarByYear.length > 0">
            <v-flex sm12 md3>
              <h3 class="primary--text">請選擇房間</h3>
            </v-flex>
            <v-flex sm12 offset-md6 md2>
              <v-btn flat @click="methodFormResetRoom">
                重置
              </v-btn>
            </v-flex>
            <v-flex sm12>
              <calendar-list
                v-for="(item, idx) in calendarByYear"
                :key="`calendarByYear${idx}`"
                :year="item"
                :dateList="availableRoomList[item]"
                />
            </v-flex>
            <v-flex xs12 offset-md11 md1>
              <v-btn
                color="primary"
                @click="e1 = 2"
              >
                下一步
              </v-btn>
            </v-flex>
          </v-layout>
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
import calendarList from '@/components/calendarList.vue';
import constVar from '@/utils/constVar';
import { getDate, addDays } from '@/utils/dateMethod';

export default {
  name: 'pageOrder',
  components: {
    titleBoat,
    dateRange,
    calendarList,
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
      roomOccList: {
        occ: {
          // 20181228: { A: 3, B: 1, C: 2 },
          // 20181229: { A: 2, B: 3, C: 0 },
          // 20181230: { A: 0, B: 1, C: 2 },
          // 20181231: { A: 5, B: 0, C: 3 },
          // 20190101: { A: 2, B: 2, C: 4 },
          // 20190102: { A: 1, B: 3, C: 3 },
          // 20190103: { A: 5, B: 1, C: 2 },
          20190226: { A: 2, B: 3, C: 0 },
          20190227: { A: 0, B: 1, C: 2 },
          20190228: { A: 3, B: 1, C: 2 },
          20190231: { A: 5, B: 0, C: 3 },
          20190301: { A: 2, B: 2, C: 4 },
          20190302: { A: 1, B: 3, C: 3 },
          20190303: { A: 5, B: 1, C: 2 },
        },
        info: {
          A: 5, B: 3, C: 4,
        },
      },
      calendarByYear: [],
      availableRoomList: {},
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
    formatNumberDate(numberDate) {
      const stringDate = numberDate.toString();
      const year = stringDate.slice(0, 4);
      const month = stringDate.slice(4, 6);
      const date = stringDate.slice(6, 8);

      return { [year]: `${year}/${month}/${date}` };
    },
    reverseFormatNumberDate(stringDate) {
      return Number(stringDate.replace(/\/|-*/g, ''));
    },
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
      this.calendarByYear.splice(0);
      this.availableRoomList = {};
      const searchRangeBaseYear = {};
      Object.keys(this.roomOccList.occ).forEach((item, idx) => {
        const res = this.formatNumberDate(item);
        const yearKey = Object.keys(res)[0];
        const dateValue = res[Object.keys(res)[0]];
        if (searchRangeBaseYear[yearKey] === undefined) {
          searchRangeBaseYear[yearKey] = [dateValue];
        } else {
          searchRangeBaseYear[yearKey] = [...searchRangeBaseYear[yearKey], dateValue];
        }
      });
      this.calendarByYear = Object.keys(searchRangeBaseYear);
      // ["2018/12/28", "2018/12/29", "2018/12/30", "2018/12/31"]
      // const availableRoomList = {
      //   2018: [
      //     { date: '2018/12/28', rooms: {} },
      //     { date: '2018/12/29', rooms: {} },
      //     { date: '2018/12/30', rooms: {} },
      //     { date: '2018/12/31', rooms: {} },
      //   ],
      // };
      this.calendarByYear.forEach((item, idx) => {
        this.availableRoomList[item] = searchRangeBaseYear[item].map((date => ({ date, rooms: this.roomOccList.occ[this.reverseFormatNumberDate(date)] })));
      });
    },
    methodFormResetStepOne() {
      this.datePickerRange = this.getDatePickerRangeOri();
      // this.orderParamsStepOne = this.getParamsOriginStepOne();
      // this.$refs.formStepOne.resetValidation();
    },
    methodFormResetRoom() {
      this.calendarByYear.splice(0);
    },
  },
};
</script>
