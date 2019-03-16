<template>
  <div class="page-rooms page-container">
    <v-layout row>
      <v-flex xs6 class="primary-title">
        <title-boat
          :targetClass="title.targetClass"
          :textUp="title.textUp"
          :textDown="title.textDown"
        />
      </v-flex>
    </v-layout>
    <v-carousel class="index-topic__carousels" height="43.86vw" hide-delimiters>
      <v-carousel-item
        v-for="(item, idx) in roomList[roomKey].imgList"
        :key="`roomsPhotoList${idx}`"
        class="page-rooms__carousels"
        prev-icon="mdi-chevron-left-circle"
        next-icon="mdi-chevron-right-circle"
      >
        <div class="primary-img">
          <img
            class="lg"
            v-lazy="item ? `/img/rooms${item}` : null"
            alt=""
          >
            <!-- :style="item ? {backgroundImage: `url(/img/rooms${item})`} : null" -->
        </div>
      </v-carousel-item>
    </v-carousel>
    <div class="primary-content page-rooms__content">
      <v-layout row>
        <v-flex xs9>
          <div class="page-rooms__left">
            <div class="page-rooms__space">
              <div class="page-rooms__theme white--text secondary">房間介紹</div>
              <p
                v-for="(item, idx) in roomType[roomTypeKey].info"
                :key="`roomTypeInfo${idx}`"
                class="page-rooms__text textBlack--text"
              >{{item.text}}：{{item.val}}</p>
              <div
                v-for="(list, listIdx) in iconList"
                :key="`iconList${listIdx}`"
                class="page-rooms__services-icon"
              >
                <p>{{list.text}}</p>
                <v-layout row wrap class="page-rooms__icon-list">
                  <v-flex
                    xs4
                    md3
                    v-for="(item, idx) in roomType[roomTypeKey][list.key]"
                    :key="`${list.key}${idx}`"
                    class="page-rooms__icon-list--icon"
                  >
                    <v-icon>{{item.icon}}</v-icon><span>{{item.val}}</span>
                  </v-flex>
                </v-layout>
                <!-- <services-icon
                  v-for="(item, idx) in servicesIconList"
                  :key="`servicesIconList${idx}`"
                  :type="item"
                /> -->
              </div>
            </div>
            <div class="page-rooms__space">
              <div class="page-rooms__theme white--text info">住房須知</div>
              <p class="page-rooms__text textBlack--text">{{info.liveNotice}}</p>
              <ul>
                <li
                  v-for="(item, idx) in info.liveRule"
                  :key="`liveRule${idx}`"
                  class="page-rooms__text textBlack--text"
                >{{item}}</li>
              </ul>
              <p class="page-rooms__text textBlack--text">{{info.end}}</p>
            </div>
            <div class="page-rooms__space">
              <div class="page-rooms__theme white--text warning">退訂政策</div>
              <ul>
                <li
                  v-for="(item, idx) in info.unsubscribe"
                  :key="`unsubscribe${idx}`"
                  class="page-rooms__text textBlack--text"
                >{{item}}</li>
              </ul>
            </div>
          </div>
        </v-flex>
        <v-flex xs3>
          <div class="page-rooms__right">
            <v-btn
              @click="methodOrder"
              class="page-rooms__order-btn white--text error"
            >{{orderBtnText}}</v-btn>
            <!-- <div class="page-rooms__summary">
              <p>{{info.roomSummary}}</p>
            </div> -->
          </div>
        </v-flex>
      </v-layout>
    </div>
    <show-rooms />
  </div>
</template>
<script>
import titleBoat from '@/components/titleBoat.vue';
import showRooms from '@/views/layout/components/showRooms.vue';
import constVar from '@/utils/constVar';
import { roomList, roomType } from '@/utils/constRooms';

export default {
  name: 'pageRooms',
  components: {
    titleBoat,
    showRooms,
    // servicesIcon,
  },
  mounted() {
    console.log('TCL: updated -> updated');
    this.scrollToTop();
  },
  watch: {
    roomKey: {
      handler(val) {
        if (!val) this.$router.push('/');
      },
      immediate: true,
    },
  },
  computed: {
    roomKey() {
      if (this.$route.query && this.$route.query.t) {
        this.$vuetify.goTo(-200, constVar.scrollPagAni);
        return this.$route.query.t;
      }
      return null;
    },
    roomTypeKey() {
      return this.roomKey ? this.roomList[this.roomKey].type : null;
    },
    title() {
      return {
        textUp: this.roomList[this.roomKey].textUp || '房間介紹',
        textDown: `ROOMS_${this.roomList[this.roomKey].textDown || ''}`,
        targetClass: 'target-rooms',
      };
    },
  },
  data() {
    return {
      constVar,
      roomList,
      roomType,
      // roomsPhotoList: roomList[roomKey].imgList,
      info: {
        roomType: '面積：8坪\n床型尺寸：加大雙人床*1 (182*188 cm)\n入住人數：2人\n加床：不可',
        liveNotice: '歡迎您來到飛樂米星空號民宿，為維護住宿的品質及安全，特訂住宿規則，請共同遵守。\n  入住時間:15:00\n  退房時間:10:00\n  專人/櫃檯服務時間:07:00 - 22:00\n  早餐時間7:00~9:00\n賠償金額參考\n  攜帶式 Wi-Fi 分享器遺失賠償費用: TWD 300\n  遙控器:電視、冷氣、智能電視盒: TWD 300\n  多頻道智能電視盒遺失賠償費用: TWD  2500\n發票/收據\n  如有需要，旅宿主人現場將提供收據。\n住房守則',
        liveRule: [
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
        end: '\n希望您將民宿當成溫馨的家，更是在地的好朋友，\n     謝謝您的合作，祝旅遊愉快! 平安順心!',
        unsubscribe: [
          '旅客於入住日前14日(含)取消訂房者，得請求旅宿主人退還100%已付總房費。',
          '旅客於入住日前7–13日(含)取消訂房者，得請求旅宿主人退還50%已付總房費。',
          '旅客於入住日前1-6日(含)取消訂房與入住當天未入住(No-show)者，旅宿主人得收取100%已付總房費。\n例:旅客預訂4/20入住。但旅客於4/6 23:59(UTC+8:00)前取消訂單，旅宿主人不收取任何房費。',
        ],
        // roomSummary: 'A202 童趣樂高四人房\n平日/$2680\n假日/$2880\n11-3月/$1800\n房型/A棟',
      },
      servicesIconList: ['wifi', 'tv', 'shower', 'tea'],
      orderBtnText: '立即\n訂房',
      iconList: [
        { text: '房間描述', key: 'description' },
        { text: '房間設備', key: 'device' },
        { text: '廚房設備', key: 'kitchen' },
        { text: '衛浴設備', key: 'bathroom' },
        { text: '服務與設施', key: 'allService' },
        { text: '安全設施', key: 'allDevice' },
      ],
    };
  },
  methods: {
    methodOrder() {
      this.$router.push('/order');
    },
    scrollToTop() {
      setTimeout(() => {
        this.$vuetify.goTo(-200, constVar.scrollPagAni);
      });
    },
  },
};
</script>
