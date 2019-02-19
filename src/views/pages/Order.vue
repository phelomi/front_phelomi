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
          <v-form v-model="validStepOne" ref="formStepOne" lazy-validation>
            <v-layout row wrap>
              <v-flex sm12 md2>請依入住期間，查詢房間狀況</v-flex>
              <v-flex
                sm12
                md3
                v-for="(item, idx) in orderTimeParams"
                :key="`orderTimeParams${idx}`"
              >
                <v-menu
                  :ref="`menu${idx}`"
                  :close-on-content-click="false"
                  v-model="selectMenu[idx]"
                  :nudge-right="40"
                  :value="orderParamsStepOne[item.key]"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                >
                  <v-text-field
                    slot="activator"
                    v-model="orderParamsStepOne[item.key]"
                    :label="item.label"
                    clearable
                    prepend-icon="mdi-calendar"
                    readonly
                    :rules="nameRules"
                    required
                  ></v-text-field>
                  <v-date-picker
                    v-model="orderParamsStepOne[item.pick]"
                    scrollable
                    no-title
                    locale="zh-Hant"
                    show-current
                    class="d-flex"
                    :min="idx===0
                      ? getDate()
                      : getDate(orderParamsStepOne[orderTimeParams[idx-1].key])"
                    :max="idx===0 && orderParamsStepOne[orderTimeParams[idx+1].key]
                      ? getDate(orderParamsStepOne[orderTimeParams[idx+1].key])
                      : ''"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      color="primary"
                      @click="orderParamsStepOne[item.pick] = getDate()"
                    >今日</v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$set(selectMenu,idx,false)"
                    >取消</v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs[`menu${idx}`][0].save(orderParamsStepOne[item.key])"
                    >確定</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex sm12 md2  offset-md1>
                <v-btn @click="methodSearchRommByTime">
                  <v-icon>mdi-magnify</v-icon>
                  查詢
                </v-btn>
                <v-btn flat @click="methodFormResetStepOne">
                  重置
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
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
          <v-btn
            color="primary"
            @click="e1 = 2"
          >
            Continue
          </v-btn>
          <v-btn flat>Cancel</v-btn>
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
import constVar from '@/utils/constVar';
import getDate from '@/utils/dateMethod';

export default {
  name: 'pageOrder',
  components: {
    titleBoat,
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
      orderTimeParams: [
        { label: '入住時間', key: 'checkInTimeShow', pick: 'checkInTimePick' },
        { label: '退房時間', key: 'checkOutTimeShow', pick: 'checkOutTimePick' },
      ],
      selectMenu: [false, false],
      nameRules: [
        v => !!v || '此欄位為必填',
      ],
    };
  },
  mounted() {
    this.$vuetify.goTo(0, constVar.scrollPagAni);
    console.log('TCL: getDate', this.getDate());
  },
  watch: {
    'orderParamsStepOne.checkInTimePick': {
      handler(newVal) {
        if (newVal) {
          this.$set(this.orderParamsStepOne, 'checkInTimeShow', this.getDate(newVal, 'dateFormat'));
        }
      },
      immediate: true,
    },
    'orderParamsStepOne.checkOutTimePick': {
      handler(newVal) {
        if (newVal) {
          this.$set(this.orderParamsStepOne, 'checkOutTimeShow', this.getDate(newVal, 'dateFormat'));
        }
      },
      immediate: true,
    },
  },
  methods: {
    getDate,
    getParamsOriginStepOne() {
      return {
        roomType: null,
        nameShow: null,
        phoneShow: null,
        emailShow: null,
        nationalityShow: null,
        checkInTimeShow: null,
        checkInTimePick: null,
        checkOutTimeShow: null,
        checkOutTimePick: null,
        priceShow: null,
        totalPriceShow: null,
        noteShow: null,
      };
    },
    methodSearchRommByTime() {

    },
    methodFormResetStepOne() {
      this.orderParamsStepOne = this.getParamsOriginStepOne();
      this.$refs.formStepOne.resetValidation();
    },
  },
};
</script>
