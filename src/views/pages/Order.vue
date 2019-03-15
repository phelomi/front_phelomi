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
    <v-stepper v-model="e1" class="page-order__stepper">
      <v-stepper-header>
        <v-stepper-step
          :complete="e1 > 1"
          step="1"
        >選擇房型</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          :complete="e1 > 2"
          step="2"
        >填寫資料</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          step="3"
        >完成訂房</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
            <v-layout row wrap>
              <v-flex sm12 md3>
                <h3 class="primary--text">請依入住期間，查詢房間狀況</h3>
              </v-flex>
              <v-flex sm12 md3 offset-md6>
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
                  重新查詢
                </v-btn>
              </v-flex>
              <v-flex sm12 :class=" $vuetify.breakpoint.lgAndUp ? 'page-order__date-range' : ''">
                <date-range
                  :options="datePickerRange"
                  @getSelectedDate="getSelectedDate"
                />
              </v-flex>
            </v-layout>
          <!-- </v-form> -->
          <v-divider id="hash-select-room" class="my-5"></v-divider>
          <v-layout row wrap v-if="calendarByYear.length > 0">
            <v-flex sm12 md3>
              <h3 class="primary--text">請選擇房間</h3>
            </v-flex>
            <v-flex
              sm12
              md6
              class="room-type-icon-group"
            >
              <span
                v-for="(item, idx) in roomTypeIcon"
                :key="`roomTypeIcon${idx}`"
                :class="`${constVar.colorList[idx]}--text headline pr-3`"
              >● {{item}}</span>
            </v-flex>
            <v-flex sm12 md3 class="text-align-end">
              <v-btn
                flat
                @click="methodFormResetRoom"
                :disabled="waitResponse"
              >
                重新查詢
              </v-btn>
              <v-btn
                flat
                @click="methodClearSelectedRoom"
                :disabled="waitResponse"
              >
                清除已選房型
              </v-btn>
            </v-flex>
            <v-flex sm12>
              <calendar-list
                v-for="(item, idx) in calendarByYear"
                :key="`calendarByYear${idx}`"
                :year="item"
                :dateList="availableRoomList[item]"
                @addSelectedRoom="addSelectedRoom"
                :clearSelected.sync="clearSelected"
                :roomTypeInfo="roomTypeInfo"
                :selectedDateRange="selectedDateRangeSearched"
                />
            </v-flex>
            <v-flex xs12 class="page-order__footer mt-5">
              <v-form
                v-model="joinValid"
                ref="joinForm"
                lazy-validation
              >
                <div class="page-order__join">
                  <p class="textBlack--text require-start">{{joinActivity.text}}</p>
                  <v-radio-group
                    v-model="joinActivity.val"
                    row
                    :rules="ruleList.require"
                    required
                  >
                    <v-radio color="primary" label="是" :value="1"></v-radio>
                    <v-radio color="primary" label="否" :value="2"></v-radio>
                  </v-radio-group>
                </div>
              </v-form>
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
          <v-layout row wrap>
            <v-flex sm12 md3>
              <h3 class="primary--text">確認訂房資訊</h3>
            </v-flex>
            <v-flex sm12 md8 offset-md2 pt-3>
              <order-rooms
                ref="orderRooms"
                :orderRoomList="orderRoomsList"
              />
            </v-flex>
          </v-layout>
          <v-divider class="my-5"></v-divider>
          <v-layout row wrap>
            <v-flex sm12 md3>
              <h3 class="primary--text">填寫個人資料</h3>
            </v-flex>
            <v-flex sm12 md10 offset-md1>
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
                    v-if="item.type === 'input'"
                    v-model="orderPersonInfo[item.model]"
                    :label="item.label"
                    clearable
                    :rules="ruleList[item.rules]"
                    :required="item.required"
                    :class="item.required ? 'require-start': ''"
                  ></v-text-field>
                  <v-radio-group
                    v-if="item.type === 'radio'"
                    v-model="orderPersonInfo[item.model]"
                    :rules="ruleList[item.rules]"
                    :required="item.required"
                    :class="item.required ? 'require-start': ''"
                    row
                  >
                    <p class="form__label">{{item.label}}</p>
                    <v-radio
                      v-for="(option,idx) in item.options"
                      :key="`options${idx}`"
                      :label="option.label"
                      :value="option.value"
                      color="primary"
                    ></v-radio>
                  </v-radio-group>
                  <v-radio-group
                    v-if="item.type === 'radioOther'"
                    v-model="orderPersonInfo[item.model]"
                    :rules="ruleList[item.rules]"
                    :required="item.required"
                    :class="item.required ? 'require-start': ''"
                    row
                    class="form__radio-other-group"
                  >
                    <p class="form__label">{{item.label}}</p>
                    <v-radio
                      v-for="(option,idx) in item.options"
                      :key="`radioOptions${idx}`"
                      :label="option.label"
                      :value="option.value"
                      color="primary"
                    ></v-radio>
                    <v-text-field
                      v-model="orderPersonInfo[item.otherModel]"
                      class="form__radio-other-group--other-input"
                      placeholder="請依照護照上填寫"
                      :disabled="orderPersonInfo[item.model] !== 2"
                      :required="orderPersonInfo[item.model] === 2"
                      :rules="orderPersonInfo[item.model] === 2 ? ruleList.require : []"
                      clearable
                    ></v-text-field>
                  </v-radio-group>
                  <div
                    v-if="item.type === 'checkboxOther'"
                    class="form__checkbox-other-group"
                  >
                    <p class="form__label">{{item.label}}</p>
                    <v-checkbox
                      v-for="(option, idx) in item.options"
                      :key="`checkboxOptions${idx}`"
                      v-model="orderPersonInfo[item.model]"
                      :label="option.label"
                      :value="option.value"
                      color="primary"
                    ></v-checkbox>
                    <v-text-field
                      v-model="orderPersonInfo[item.otherModel]"
                      class="form__checkbox-other-group--other-input"
                      placeholder="請輸入其他需求"
                      :disabled="!orderPersonInfo[item.model].find(i => i === 2)"
                      clearable
                    ></v-text-field>
                  </div>
                  <v-menu
                    v-if="item.type === 'timepicker'"
                    ref="menu"
                    v-model="item.menuModel"
                    :close-on-content-click="false"
                    :return-value.sync="orderPersonInfo[item.model]"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{on}">
                      <v-text-field
                        v-model="orderPersonInfo[item.model]"
                        :label="item.label"
                        prepend-icon="mdi-clock-outline"
                        clearable
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="item.menuModel"
                      v-model="orderPersonInfo[item.model]"
                      full-width
                      @click:minute="$refs.menu[0].save(orderPersonInfo[item.model])"
                      color="primary"
                      format="24hr"
                    ></v-time-picker>
                  </v-menu>
                </v-flex>
                <v-flex sm12 md2 mt-4>
                  <p class="primary--text page-order__notice-title">訂房須知</p>
                </v-flex>
                <v-flex sm12 md10 mt-4>
                  <p class="textBlack--text page-order__notice-content">{{noticeContent}}</p>
                  <ul>
                    <li
                      v-for="(item, idx) in noticeContent2"
                      :key="`liveRule${idx}`"
                      class="textBlack--text page-order__notice-content"
                    >{{item}}</li>
                  </ul>
                  <p class="textBlack--text page-order__notice-content">{{noticeContent3}}</p>
                  <ul>
                    <li
                      v-for="(item, idx) in noticeContent4"
                      :key="`liveRule${idx}`"
                      class="textBlack--text page-order__notice-content"
                    >{{item}}</li>
                  </ul>
                </v-flex>
                <v-flex sm12 md12 >
                  <v-checkbox
                    class="page-order__notice-checkbox require-start"
                    v-model="orderPersonInfo.agreeNotice"
                    label="我已閱讀過完整的訂房須知，同意並接受所有規定事項"
                    color="primary"
                    :rules="ruleList.require"
                    :required="true"
                  ></v-checkbox>
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
          <v-layout row wrap>
            <v-flex sm12 md3>
              <h3 class="primary--text">訂單已完成，請核對以下資訊</h3>
            </v-flex>
            <v-flex sm12 md10 offset-md1 py-3 v-if="orderInfoParams">
              <v-layout row wrap class="page-order__order-info">
                <v-flex
                  sm12 md4 py-1
                  v-for="(item, idx) in checkOrderInfo"
                  :key="`checkOrderInfo${idx}`"
                >
                  <span>{{item.label}}：</span>
                  <span>{{orderInfoParams[item.key]
                          && orderInfoParams[item.key].toString()
                          || ''}}</span>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex sm12 md3>
              <h3 class="primary--text">訂房資訊</h3>
            </v-flex>
            <v-flex sm12 md10 offset-md1 pt-3>
              <order-rooms
                :orderRoomList="orderRoomsList"
              />
            </v-flex>
          </v-layout>
          <v-divider class="my-5"></v-divider>
          <v-layout row wrap>
            <v-flex sm12 md3>
              <h3 class="primary--text">匯款資訊如下</h3>
            </v-flex>
            <v-flex sm12 md7>
              <p class="secondary--text page-order__notice-content--title">恭喜您訂房成功！</p>
              <p class="textBlack--text page-order__notice-content">{{orderSuccessText}}</p>
              <p class="textBlack--text page-order__notice-content">{{bankInfo}}</p>
            </v-flex>
          </v-layout>
            <v-flex xs12 class="page-order__footer mt-5">
              <v-btn
                color="info"
                class="page-order__button-primary"
                @click="methodNewOrder"
                :disabled="waitResponse"
              >
                新增訂單
              </v-btn>
            </v-flex>
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
import orderRooms from '@/components/orderRooms.vue';
import constVar from '@/utils/constVar';
import {
  getDate, addDays, subtractDays, getDayRange,
} from '@/utils/dateMethod';

export default {
  name: 'pageOrder',
  components: {
    titleBoat,
    dateRange,
    calendarList,
    orderRooms,
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
      joinActivity: {
        text: '',
        val: null,
      },
      valid: false,
      joinValid: false,
      ruleList: {
        require: [
          v => !!v || '此欄位為必填',
        ],
        requireNumber: [
          (v) => {
            if (!v) return '此欄位為必填';
            const reg = /^(\d+\.\d\d|\d+)$/;
            return reg.test(v) || '請輸入正確數字';
          },
        ],
        number: [
          (v) => {
            const reg = /^(\d+\.\d\d|\d+)$/;
            return reg.test(v) || '請輸入正確數字';
          },
        ],
        phone: [
          (v) => {
            if (!v) return '此欄位為必填';
            const reg = /^(\d+\.\d\d|\d+)$/;
            return reg.test(v) || '請輸入電話號碼，不用任何符號';
          },
        ],
        email: [
          (v) => {
            if (!v) return '此欄位為必填';
            const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            return reg.test(v) || '請輸入正確的Email格式';
          },
        ],
        none: [],
      },
      orderPersonInfoList: [
        {
          type: 'input',
          model: 'name',
          label: '聯絡姓名',
          required: true,
          rules: 'require',
          class: 'md6',
        },
        {
          type: 'radio',
          model: 'gender',
          label: '客戶性別',
          required: true,
          rules: 'require',
          class: 'md6',
          options: [
            { label: '男', value: '男' },
            { label: '女', value: '女' },
          ],
        },
        {
          type: 'input',
          model: 'phone',
          label: '聯絡電話',
          required: true,
          rules: 'phone',
          class: 'md6',
        },
        {
          type: 'input',
          model: 'email',
          label: '電子郵件',
          required: true,
          rules: 'email',
          class: 'md6',
        },
        {
          type: 'radioOther',
          model: 'nationalityOption',
          otherModel: 'nationalityText',
          label: '國籍',
          required: true,
          rules: 'require',
          class: 'md6',
          options: [
            { label: '本國', value: 1 },
            { label: '其他', value: 2 },
          ],
        },
        {
          type: 'radio',
          model: 'breakfast',
          label: '早餐',
          required: true,
          rules: 'require',
          class: 'md6',
          options: [
            { label: '正常', value: '正常' },
            { label: '素食', value: '素食' },
            { label: '不食用（不用不退費請知悉）', value: '不食用' },
          ],
        },
        {
          type: 'input',
          model: 'numberAdult',
          label: '成人人數',
          required: true,
          rules: 'requireNumber',
          class: 'md2',
        },
        {
          type: 'input',
          model: 'numberChild',
          label: '小孩人數',
          required: false,
          rules: 'number',
          class: 'md2',
        },
        {
          type: 'timepicker',
          model: 'arriveTime',
          menuModel: false,
          label: '預計抵達時間',
          required: false,
          rules: 'none',
          class: 'md6 offset-md2',
        },
        {
          type: 'checkboxOther',
          model: 'demandOption',
          otherModel: 'demandText',
          label: '其他需求',
          required: false,
          rules: 'none',
          class: 'md10',
          options: [
            { label: '無', value: '無' },
            { label: '租機車', value: '租機車' },
            { label: '租轎車', value: '租轎車' },
            { label: '租船出海', value: '租船出海' },
            { label: '其他', value: 2 },
          ],
        },
        {
          type: 'input',
          model: 'note',
          label: '備註',
          required: false,
          rules: 'none',
          class: 'md12',
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
      selectedDateRangeSearched: null,
      emptyRoomType: {},
      roomTypeInfo: {},
      emptyOccList: {},
      roomTypeIcon: [],
      noticeContent: '（一）入住資訊：\n歡迎您來到飛樂米星空號民宿，為維護住宿的品質及安全，特訂住宿規則，請共同遵守。\n  入住時間:15:00\n  退房時間:10:00\n  專人/櫃檯服務時間:07:00 - 22:00\n  早餐時間7:00~9:00\n賠償金額參考\n  攜帶式 Wi-Fi 分享器遺失賠償費用: TWD 300\n  遙控器:電視、冷氣、智能電視盒: TWD 300\n  多頻道智能電視盒遺失賠償費用: TWD  2500\n發票/收據\n  如有需要，旅宿主人現場將提供收據。\n住房守則',
      noticeContent2: [
        '大廳為共同使用空間，使用後請保持清潔，書報雜誌等物品閱畢請歸回原處，私人物品勿留置大廳內，大廳設有飲水機，請多加利用。',
        '為維護庭園清潔，請勿於庭園內烤肉及烹煮食物。',
        '戶外庭園燈將於晚上11:00關閉。',
        '請勿任意移動室內擺設(如床舖)',
        '離開房間時，請隨手將房門鎖上，貴重的物品請自行小心保管，退房時，請務必繳回房門的鑰匙及節電卡。',
        '為維護住房品質，本場所室內禁止吸煙、酗酒、嚼檳楖、賭博、大聲喧嘩，打麻將、攜帶寵物入內、若於房內抽煙，衛生局將依規定罰款2千~1萬',
        '為維護其他客人權益，請勿攜帶寵物，如不遵守之房客，店家有權利拒絕房客入住並沒收訂金',
        '房客退房後如房間內之設施有損壞或遺失，店家將會要求賠償或報警處理，入住房客請自重。',
        '請依房型人數住宿，超出人數，加床以加床墊為主，每人並加收500元（清潔費）',
        '如需接送機，請預先告知，班機或船抵達時間，以便安排，只住宿一天可選擇接機或送機(二選一)，搭機旅客 僅限於民宿＜-->機場，搭船旅客僅限於民宿＜--＞馬公港  (或龍門港)之間的接送，其餘地點均無法提供接送服務，敬請旅客配合！',
        '住宿尾款的部份，只接受現金或國民旅遊卡，行程及其他費用只接受現金，無刷卡付費服務，敬請見諒。',
        '假日定義(週五．六．日)平日定義(週一~週四)',
      ],
      noticeContent3: '\n希望您將民宿當成溫馨的家，更是在地的好朋友，\n     謝謝您的合作，祝旅遊愉快! 平安順心!\n\n（二）取消政策：',
      noticeContent4: [
        '旅客於入住日前14日(含)取消訂房者，得請求旅宿主人退還100%已付總房費。',
        '旅客於入住日前7–13日(含)取消訂房者，得請求旅宿主人退還50%已付總房費。',
        '旅客於入住日前1-6日(含)取消訂房與入住當天未入住(No-show)者，旅宿主人得收取100%已付總房費。\n例:旅客預訂4/20入住。但旅客於4/6 23:59(UTC+8:00)前取消訂單，旅宿主人不收取任何房費。',
      ],
      checkOrderInfo: [
        { label: '聯絡姓名', key: 'name' },
        { label: '客戶性別', key: 'gender' },
        { label: '聯絡電話', key: 'phone' },
        { label: '電子郵件', key: 'email' },
        { label: '國籍', key: 'nationality' },
        { label: '早餐', key: 'breakfast' },
        { label: '成人人數', key: 'numberAdult' },
        { label: '小孩人數', key: 'numberChild' },
        { label: '預計抵達時間', key: 'arriveTime' },
        { label: '其他需求', key: 'demand' },
        { label: '備註', key: 'note' },
      ],
      orderInfoParams: null,
      orderRoomsList: {},
      bankInfo: '匯款銀行：中國信託商業銀行 文心分行（代號822）\n匯款帳號：4735-4049-3788\n匯款戶名：許秋燕\n\n匯款後，請務必以Email、Line、微信、簡訊或電話告知，註明匯款人姓名、電話、住宿日期、住宿房型、人數以及帳號後五碼，以便完成訂房手續 。',
      orderSuccessText: '提醒您：記得在2天內完成匯款，若未完成匯款即視同放棄訂單。',
    };
  },
  mounted() {
    this.scrollToTop();
  },
  methods: {
    getDate,
    addDays,
    subtractDays,
    getDayRange,
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
      // return {
      //   name: '王小明',
      //   gender: '男',
      //   phone: '09435987',
      //   email: 'sdf@cid.com',
      //   nationalityOption: 2,
      //   nationalityText: 'dd',
      //   breakfast: '不食用',
      //   numberAdult: '3',
      //   numberChild: '2',
      //   arriveTime: '14:14',
      //   demandOption: ['租機車', 2],
      //   demandText: 'gfg',
      //   note: 'sdfgdsfgsdfg',
      //   agreeNotice: true,
      // };
      return {
        name: null,
        gender: null,
        phone: null,
        email: null,
        nationalityOption: null,
        nationalityText: null,
        breakfast: null,
        numberAdult: 0,
        numberChild: 0,
        arriveTime: null,
        demandOption: [],
        demandText: null,
        note: null,
        agreeNotice: false,
      };
    },
    getDatePickerRangeOri() {
      return {
        startDate: '',
        endDate: '',
        minDate: this.getDate(),
        maxDate: this.getDate(this.addDays(Date.now(), 180)),
      };
    },
    // getParamsOriginStepOne() {
    //   return {
    //     roomType: null,
    //     nameShow: null,
    //     phoneShow: null,
    //     emailShow: null,
    //     nationalityShow: null,
    //     priceShow: null,
    //     totalPriceShow: null,
    //     noteShow: null,
    //   };
    // },
    // 整理日期，為了顯示月曆
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
    formatDateSearchRange() {
      // 開始時間不能小於今天
      // 開始至結束，時間不能超過一個月
      // 最長不能超過六個月
      const maxSearchLimit = 180;
      const searchDateRangeLimit = 30;
      const moreSearchDays = 7;
      const { startTime, endTime } = this.selectedDateRange;
      const selectDateRangeDays = this.getDayRange(endTime, startTime) + 1;
      let searchStartTime = null;
      let searchEndTime = null;
      if (selectDateRangeDays > searchDateRangeLimit) {
        this.notifySetting = {
          ...this.notifySetting,
          open: true,
          text: '搜尋時間間隔，不能大於30天。若有此需求，可來電詢問！',
          color: 'warning',
        };
        return false;
      }
      const overSearchRangeDays = (selectDateRangeDays + moreSearchDays * 2) - searchDateRangeLimit;
      if (selectDateRangeDays === searchDateRangeLimit) {
        searchStartTime = this.getDate(startTime, 'timestamp');
        searchEndTime = this.getDate(endTime, 'timestamp');
      } else if (overSearchRangeDays > 0) {
        const cutDays = (searchDateRangeLimit - selectDateRangeDays) / 2;
        const startTimeCutDays = Math.floor(cutDays);
        const endTimeCutDays = Math.ceil(cutDays);
        searchStartTime = this.subtractDays(startTime, startTimeCutDays, false);
        searchEndTime = this.addDays(endTime, endTimeCutDays, maxSearchLimit);
      } else {
        searchStartTime = this.subtractDays(startTime, moreSearchDays, false);
        searchEndTime = this.addDays(endTime, moreSearchDays, maxSearchLimit);
      }

      const params = {
        startTime: searchStartTime,
        endTime: searchEndTime,
      };
      return params;
    },
    // 查詢某段時間可以入住的房間
    async methodSearchRommByTime() {
      const { endTime, startTime } = this.selectedDateRange;
      if (!endTime || !startTime) {
        this.notifySetting = {
          ...this.notifySetting,
          open: true,
          text: '請選擇入住與退房時間',
          color: 'error',
        };
        return;
      }
      this.calendarByYear.splice(0);
      this.availableRoomList = {};

      const params = this.formatDateSearchRange();
      if (!params) return;
      this.selectedDateRangeSearched = this.selectedDateRange;
      this.methodFormatOccList(params);
      this.waitResponse = true;
      const res = await httpMethod({
        url: '/v1/api/front/occ/list',
        method: 'GET',
        params,
      });
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
        this.joinActivity.text = res.data.activity.label || '';
        this.$vuetify.goTo('#hash-select-room', constVar.scrollPagAni);
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
      this.roomTypeIcon.splice(0);
      Object.keys(roomInfo).forEach((roomType) => {
        this.emptyRoomType[roomType] = 0;
        const { name, price } = roomInfo[roomType];
        // 房型圖標列表
        this.roomTypeIcon.push(name);
        // 房型資訊Object
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
      this.methodResetJoinParams();
    },
    methodFormResetRoom() {
      this.calendarByYear.splice(0);
      this.methodResetJoinParams();
      setTimeout(() => {
        this.scrollToTop();
      });
    },
    methodResetJoinParams() {
      this.joinActivity.val = null;
      this.$refs.joinForm.resetValidation();
    },
    methodClearSelectedRoom() {
      this.clearSelected = true;
      this.selectedRoom.clear();
    },
    toStep(step) {
      this.e1 = step;
      setTimeout(() => {
        this.scrollToTop();
      });
    },
    // STEP 1: 當有房型被選到，執行這個funciton
    addSelectedRoom(date, selected) {
      // 被選到的房型，用map組成
      this.selectedRoom.set(this.reverseFormatNumberDate(date), selected);
    },
    async checkSelectedRoom() {
      if (!this.$refs.joinForm.validate()) {
        this.notifySetting = {
          ...this.notifySetting,
          open: true,
          text: '請選擇是否要參與活動',
          color: 'error',
        };
        return;
      }
      this.waitResponse = true;
      // 整理選到的房間
      this.selectedRoom = new Map([...this.selectedRoom.entries()].sort());

      // 20190307: {
      //   '5c73f6aaad26b8d3c2be3c4e': 0,
      //   '5c73f6aaad26b8d3c2be3c4f': 1,
      //   '5c73f6aaad26b8d3c2be3c50': 0,
      // }

      // 判斷是否能去下一步
      let countSelectedRooms = 0;
      this.selectedRoom.forEach((item) => {
        Object.values(item).forEach((rooms) => {
          countSelectedRooms += rooms;
        });
      });

      if (countSelectedRooms) {
        this.orderRoomsList = {};
        const res = await httpMethod({
          url: '/v1/api/front/check/order',
          method: 'POST',
          data: {
            roomInfo: this.orderSelectedRoom(),
            join: !!(this.joinActivity.val % 2),
          },
        });
        if (res && !res.code && Object.keys(res.data).length > 0) {
          this.orderRoomsList = res.data;
          this.toStep(2);
        } else {
          this.notifySetting = {
            ...this.notifySetting,
            open: true,
            text: res.msg || '處理錯誤，請重新再弒，或聯絡客服人員',
            color: 'error',
          };
        }
      } else {
        this.notifySetting = {
          ...this.notifySetting,
          open: true,
          text: '提醒您，您尚未選擇房型！',
          color: 'warning',
        };
      }
      this.waitResponse = false;
    },
    // 將選到的房間，整理成藥送給後端的格式
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
        this.orderInfoParams = {};
        const {
          name,
          gender,
          phone,
          email,
          nationalityOption,
          nationalityText,
          breakfast,
          numberAdult,
          numberChild,
          arriveTime,
          demandOption,
          demandText,
          note,
        } = this.orderPersonInfo;
        this.orderInfoParams = {
          name,
          gender,
          phone,
          email,
          nationality: nationalityOption === 1 ? '本國' : nationalityText,
          breakfast,
          numberAdult,
          numberChild,
          arriveTime,
          demand: demandOption.find(i => i === 2)
            ? [...demandOption.filter(i => i !== 2), demandText]
            : demandOption,
          note,
          roomInfo: this.orderSelectedRoom(),
        };
        this.waitResponse = true;
        const res = await httpMethod({
          url: '/v1/api/front/order/new',
          method: 'POST',
          data: {
            ...this.orderInfoParams,
            join: !!(this.joinActivity.val % 2),
          },
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
    methodNewOrder() {
      this.orderInfoParams = {};
      this.availableRoomList = {};
      this.emptyOccList = {};
      this.emptyRoomType = {};
      this.roomTypeInfo = {};
      this.methodResetJoinParams();
      this.$refs.orderRooms.methodClearRoom();
      this.methodFormResetRoom();
      this.methodClearSelectedRoom();
      this.methodFormPersonInfoReset();

      this.toStep(1);
    },
  },
};
</script>
