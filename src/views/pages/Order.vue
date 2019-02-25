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
                  @getSelectedDate="getSelectedDate"
                />
              </v-flex>
              <v-flex sm12 md2 ml-5>
                <v-btn
                  @click="methodSearchRommByTime"
                  class="primary"
                  :disabled="waitResponse"
                >
                  <v-icon>mdi-magnify</v-icon>
                  查詢房間
                </v-btn>
                <v-btn
                  flat
                  @click="methodFormResetStepOne"
                  :disabled="waitResponse"
                >
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
              <v-btn
                flat
                @click="methodFormResetRoom"
                :disabled="waitResponse"
              >
                重置搜尋結果
              </v-btn>
              <v-btn
                flat
                @click="clearSelected = true"
                :disabled="waitResponse"
              >
                重置已選房型
              </v-btn>
            </v-flex>
            <v-flex sm12>
              <calendar-list
                v-for="(item, idx) in calendarByYear"
                :key="`calendarByYear${idx}`"
                type="edit"
                :year="item"
                :dateList="availableRoomList[item]"
                @getSelectedRoom="getSelectedRoom"
                :clearSelected.sync="clearSelected"
                :roomTypeInfo="roomTypeInfo"
                />
            </v-flex>
            <v-flex xs12 class="page-order__footer mt-5">
              <v-btn
                color="primary"
                class="page-order__button-primary"
                @click="checkSelectedRoom()"
                :disabled="waitResponse"
              >
                下一步
              </v-btn>
            </v-flex>
          </v-layout>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="loading-view" v-if="waitResponse">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
          <v-layout row wrap v-if="calendarByYear.length > 0">
            <v-flex sm12 md3 offset-md-9>
              <h3 class="primary--text">確認訂房資訊</h3>
            </v-flex>
            <v-flex sm12>
              <calendar-list
                v-for="(item, idx) in calendarByYearCheck"
                :key="`calendarByYearCheck${idx}`"
                type="show"
                :year="item"
                :dateList="availableRoomListCheck[item]"
                @getSelectedRoom="getSelectedRoom"
                :roomTypeInfo="roomTypeInfo"
                />
            </v-flex>
          </v-layout>
          <v-divider class="my-5"></v-divider>
          <v-layout row wrap v-if="calendarByYear.length > 0">
            <v-flex sm12 md3>
              <h3 class="primary--text">填寫個人資料</h3>
            </v-flex>
            <v-flex sm12 md6>
              <v-form
                v-model="valid"
                ref="form"
                lazy-validation
                class="page-order__form--person-info"
              >
                <v-flex
                  sm12
                  px-2
                  v-for="(item, idx) in orderPersonInfoList"
                  :key="`orderPersonInfoList${idx}`"
                  :class="item.class"
                >
                  <v-text-field
                    v-model="orderPersonInfo[item.model]"
                    :label="item.label"
                    clearable
                    :rules="item.required ? nameRules : []"
                    :required="item.required"
                  ></v-text-field>
                </v-flex>
              </v-form>
            </v-flex>
            <v-flex xs12 class="page-order__footer mt-5">
              <v-btn
                flat
                @click="methodFormPersonInfoReset"
                :disabled="waitResponse"
              >重新填寫</v-btn>
              <v-btn
                color="primary"
                class="page-order__button-primary"
                @click="methodProcessPersonInfoParams"
                :disabled="waitResponse"
              >
                確定送出
              </v-btn>
              <v-btn
                flat
                @click="toStep(1)"
                :disabled="waitResponse"
              >回上一步</v-btn>
            </v-flex>
          </v-layout>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"
          ></v-card>
          <!-- <v-btn
            color="primary"
            @click="toStep(1)"
          >
            Continue
          </v-btn>
          <v-btn flat>Cancel</v-btn> -->
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-snackbar
      v-model="notifySetting.open"
      top
      right
      :timeout="notifySetting.timeout"
      :color="notifySetting.color"
      class="textBlack--text"
    >{{notifySetting.text}}<v-btn
        flat
        @click="notifySetting.open = false"
      >
        <v-icon color="textBlack">mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import httpMethod from '@/utils/httpMethod';
import titleBoat from '@/components/titleBoat.vue';
import dateRange from '@/components/dateRange.vue';
import calendarList from '@/components/calendarList.vue';
import constVar from '@/utils/constVar';
import { getDate, addDays, subtractDays } from '@/utils/dateMethod';

export default {
  name: 'pageOrder',
  components: {
    titleBoat,
    dateRange,
    calendarList,
  },
  data() {
    return {
      waitResponse: false,
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
          20190301: { A: 2, B: 2, C: 4 },
          20190302: { A: 1, B: 3, C: 3 },
          20190303: { A: 5, B: 1, C: 2 },
          20190304: { A: 5, B: 0, C: 3 },
          20190305: { A: 2, B: 1, C: 2 },
        },
        info: {
          A: { length: 2, name: '三人房型', price: 100000 },
          B: { length: 2, name: '四人房型', price: 200000 },
          C: { length: 2, name: '二人房型', price: 220000 },
        },
      },
      calendarByYear: [],
      availableRoomList: {},
      selectedRoom: new Map(),
      checkOrderRoomList: {},
      calendarByYearCheck: [],
      availableRoomListCheck: {},
      valid: false,
      nameRules: [
        v => !!v || '此欄位為必填',
      ],
      orderPersonInfoList: [
        {
          model: 'name', label: '聯絡姓名', required: true, class: 'md6',
        },
        {
          model: 'phone', label: '聯絡電話', required: true, class: 'md6',
        },
        {
          model: 'email', label: '電子郵件', required: true, class: 'md6',
        },
        {
          model: 'nationality', label: '國籍', required: true, class: 'md6',
        },
        {
          model: 'note', label: '備註', required: false, class: 'md12',
        },
      ],
      orderPersonInfo: this.getOrderPersonInfoOri(),
      clearSelected: false,
      notifySetting: {
        open: false,
        timeout: 5000,
        text: '',
        color: '',
      },
      selectedDateRange: null,
      emptyRoomType: {},
      roomTypeInfo: {},
      emptyOccList: {},
    };
  },
  mounted() {
    this.scrollToTop();
  },
  methods: {
    getDate,
    addDays,
    subtractDays,
    scrollToTop() {
      this.$vuetify.goTo(0, constVar.scrollPagAni);
    },
    formatNumberDate(numberDate) {
      const stringDate = numberDate.toString();
      const year = stringDate.slice(0, 4);
      const month = stringDate.slice(4, 6);
      const date = stringDate.slice(6, 8);

      return { [year]: `${year}/${month}/${date}` };
    },
    reverseFormatNumberDate(stringDate) {
      if (typeof stringDate === 'number') stringDate = this.getDate(stringDate, 'fullDateFormat');
      return Number(stringDate.replace(/\/|-*/g, ''));
    },
    getOrderPersonInfoOri() {
      return {
        name: null,
        phone: null,
        email: null,
        nationality: null,
        note: null,
      };
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
    formatOccList(occList, calcRemain = false, oriList) {
      let calendarByYear = [];
      const searchRangeBaseYear = {};
      const availableRoomList = {};
      Object.keys(occList).forEach((item, idx) => {
        const res = this.formatNumberDate(item);
        const yearKey = Object.keys(res)[0];
        const dateValue = res[Object.keys(res)[0]];
        if (searchRangeBaseYear[yearKey] === undefined) {
          searchRangeBaseYear[yearKey] = [dateValue];
        } else {
          searchRangeBaseYear[yearKey] = [...searchRangeBaseYear[yearKey], dateValue];
        }
      });
      calendarByYear = Object.keys(searchRangeBaseYear);
      // ["2018/12/28", "2018/12/29", "2018/12/30", "2018/12/31"]
      // const availableRoomList = {
      //   2018: [
      //     { date: '2018/12/28', rooms: {} },
      //     { date: '2018/12/29', rooms: {} },
      //     { date: '2018/12/30', rooms: {} },
      //     { date: '2018/12/31', rooms: {} },
      //   ],
      // };
      calendarByYear.forEach((item, idx) => {
        availableRoomList[item] = searchRangeBaseYear[item].map(((date) => {
          const roomList = occList[this.reverseFormatNumberDate(date)];
          const remainRoomList = {};
          if (calcRemain) {
            Object.keys(roomList).forEach((key) => {
              remainRoomList[key] = oriList[key].length - roomList[key];
            });
          }
          return {
            date,
            rooms: calcRemain ? remainRoomList : occList[this.reverseFormatNumberDate(date)],
          };
        }
        ));
      });
      return {
        calendarByYear,
        availableRoomList,
      };
    },
    async methodSearchRommByTime() {
      this.calendarByYear.splice(0);
      this.availableRoomList = {};
      const { startTime, endTime } = this.selectedDateRange;
      const params = {
        startTime: this.subtractDays(startTime, 7),
        endTime: this.addDays(endTime, 7),
      };
      this.methodFormatOccList(params);
      this.waitResponse = true;
      const res = await httpMethod({
        url: '/v1/api/front/occ/list',
        method: 'GET',
        params,
      });
      console.log(res);
      if (res && !res.code) {
        this.notifySetting = {
          ...this.notifySetting,
          open: true,
          text: `${res.msg}`,
          color: 'success',
        };
        this.methodGetEmptyRoom(res.data.info);
        const { calendarByYear, availableRoomList } = this.formatOccList(
          { ...this.emptyOccList, ...res.data.occ },
          true,
          res.data.info,
        );
        this.calendarByYear = calendarByYear;
        this.availableRoomList = availableRoomList;
      } else {
        this.notifySetting = {
          ...this.notifySetting,
          open: true,
          text: res.msg || '查詢失敗，請重新再弒，或聯絡客服人員',
          color: 'error',
        };
      }
      this.waitResponse = false;
    },
    methodGetEmptyRoom(roomInfo) {
      this.emptyRoomType = {};
      this.roomTypeInfo = {};
      Object.keys(roomInfo).forEach((roomType) => {
        this.emptyRoomType[roomType] = 0;
        const { name, price } = roomInfo[roomType];
        this.roomTypeInfo[roomType] = { name, price };
      });
    },
    methodFormatOccList(params) {
      const { startTime, endTime } = params;
      // this.reverseFormatNumberDate(this.getDate(startTime,'fullDateFormat'))
      this.emptyOccList = {};
      let countStartTime = startTime;
      while (countStartTime <= endTime) {
        this.emptyOccList[this.reverseFormatNumberDate(countStartTime)] = this.emptyRoomType;
        countStartTime = this.addDays(countStartTime, 1);
      }
    },
    methodFormResetStepOne() {
      this.datePickerRange = this.getDatePickerRangeOri();
      // this.orderParamsStepOne = this.getParamsOriginStepOne();
      // this.$refs.formStepOne.resetValidation();
    },
    methodFormResetRoom() {
      this.calendarByYear.splice(0);
    },
    toStep(step) {
      this.e1 = step;
      this.scrollToTop();
    },
    getSelectedRoom(date, selected) {
      this.selectedRoom.set(this.reverseFormatNumberDate(date), selected);
      this.selectedRoom = new Map([...this.selectedRoom.entries()].sort());
      this.checkOrderRoomList = {};
      for (const [key, value] of this.selectedRoom.entries()) {
        let allow = false;
        Object.keys(value).forEach((valKey) => {
          if (value[valKey]) allow = true;
        });
        if (allow) this.checkOrderRoomList[key] = value;
      }
    },
    checkSelectedRoom() {
      const { calendarByYear, availableRoomList } = this.formatOccList(this.checkOrderRoomList);
      this.calendarByYearCheck = calendarByYear;
      this.availableRoomListCheck = availableRoomList;

      if (this.calendarByYearCheck.length && Object.keys(this.availableRoomListCheck).length) {
        this.toStep(2);
      } else {
        this.notifySetting = {
          ...this.notifySetting,
          open: true,
          text: '提醒您，您尚未選擇房型！',
          color: 'warning',
        };
      }
    },
    orderSelectedRoom() {
      const result = [];
      const selectedRoomKeyList = [...this.selectedRoom.keys()];
      selectedRoomKeyList.forEach((key) => {
        // this.selectedRoom.get(key)
        const valueList = this.selectedRoom.get(key);
        Object.keys(valueList).forEach((val) => {
          for (let i = 0; i < valueList[val]; i += 1) {
            result.push({
              date: key,
              roomCid: val,
            });
          }
        });
      });
      return result;
    },
    methodFormPersonInfoReset() {
      this.orderPersonInfo = this.getOrderPersonInfoOri();
      this.$refs.form.resetValidation();
    },
    async methodProcessPersonInfoParams() {
      if (this.$refs.form.validate()) {
        const params = {
          ...this.orderPersonInfo,
          roomInfo: this.orderSelectedRoom(),
        };
        this.waitResponse = true;
        const res = await httpMethod({
          url: '/v1/api/front/order/new',
          method: 'POST',
          data: params,
        });
        if (res && !res.code) {
          this.notifySetting = {
            ...this.notifySetting,
            open: true,
            text: `${res.msg}`,
            color: 'success',
          };
          this.toStep(3);
        } else {
          this.notifySetting = {
            ...this.notifySetting,
            open: true,
            text: res.msg || '新增失敗，請重新再弒，或聯絡客服人員',
            color: 'error',
          };
        }
        this.waitResponse = false;
      }
    },
    getSelectedDate(val) {
      this.selectedDateRange = val;
    },
  },
};
</script>
