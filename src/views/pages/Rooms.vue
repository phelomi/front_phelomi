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
        v-for="(item, idx) in roomsPhotoList"
        :key="`roomsPhotoList${idx}`"
        class="page-rooms__carousels"
        prev-icon="mdi-chevron-left-circle"
        next-icon="mdi-chevron-right-circle"
      >
        <div class="primary-img">
          <img :src="item" alt="">
        </div>
      </v-carousel-item>
    </v-carousel>
    <div class="primary-content page-rooms__content">
      <v-layout row>
        <v-flex xs9>
          <div class="page-rooms__left">
            <div class="page-rooms__space">
              <div class="page-rooms__theme white--text secondary">房型介紹</div>
              <p class="page-rooms__text textBlack--text">{{info.roomType}}</p>
              <div class="page-rooms__services-icon">
                <services-icon
                  v-for="(item, idx) in servicesIconList"
                  :key="`servicesIconList${idx}`"
                  :type="item"
                />
              </div>
            </div>
            <div class="page-rooms__space">
              <div class="page-rooms__theme white--text info">住房須知</div>
              <p class="page-rooms__text textBlack--text">{{info.liveNotice}}</p>
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
              class="page-rooms__order-btn white--text"
            >{{orderBtnText}}</v-btn>
            <div class="page-rooms__summary">
              <p>{{info.roomSummary}}</p>
            </div>
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
import servicesIcon from '@/components/servicesIcon.vue';
import ad001 from '../../assets/rooms/ad001.jpg';

export default {
  name: 'pageRooms',
  components: {
    titleBoat,
    showRooms,
    servicesIcon,
  },
  data() {
    return {
      title: {
        textUp: '彩虹堡雙人房',
        textDown: 'ROOMS',
        targetClass: 'target-rooms',
      },
      roomsPhotoList: [ad001, ad001, ad001],
      info: {
        roomType: '面積：8坪\n床型尺寸：加大雙人床*1 (182*188 cm)\n入住人數：2人\n加床：不可',
        liveNotice: '入住時間：下午 3 點後 / 退房時間：上午 11 點前\n請勿攜帶寵物入宿(導盲犬除外)，飯店內全面禁菸。\n早餐服務-6:30至10:00\n客房服務-7:00-10:00 / 11:30-14:00 / 17:30-21:00\n提供設備租用：泳圈、趴板、陽傘、嬰兒推車等。',
        unsubscribe: [
          '訂金：收取總額房價30%（連假3日以上收取50%）',
          '取消：距住宿日14日前全額退還訂金、10~13日退還70%、7~9日退還50%、4~6日退還40%、2~3日退還30%、1日前退還20%、住宿當日恕無退還訂金。',
          '更改：請於住宿前1天通知（依房況配合更改房型，無法取消間數）',
          '延期：住宿前3天通知可保留訂金1次，並依原入住日起保留3個月，逾期未入住或取消將扣全額訂金不另行通知',
          '保留：已付訂金保留預訂至當日下午6點止；延遲入住須預先通知；逾時無法與房客取得聯繫時始可售出預訂客房，恕不退還訂金',
        ],
        roomSummary: 'A202 童趣樂高四人房\n平日/$2680\n假日/$2880\n11-3月/$1800\n房型/A棟',
      },
      servicesIconList: ['wifi', 'tv', 'shower', 'tea'],
      orderBtnText: '立即\n訂房',
    };
  },
  methods: {
    methodOrder() {
      console.log('Order');
    },
  },
};
</script>
