<template>
  <div class="page-news page-container">
    <v-layout row>
      <v-flex xs6 class="primary-title page-news__title">
        <title-boat
          :targetClass="title.targetClass"
          :textUp="title.textUp"
          :textDown="title.textDown"
        />
      </v-flex>
    </v-layout>
    <div
      v-if="img[themeType]"
      class="primary-img page-news__img"
      :style="{backgroundImage:`url(${img[themeType]}), url(${placeholder})`}"
    >
      <!-- <img :src="img[themeType]" alt=""> -->
    </div>
    <div class="primary-content page-news__content">
      <h2 class="page-news__theme secondary--text text-under-line">{{theme[themeType] || ''}}</h2>
      <p class="page-news__info textBlack--text">{{info[themeType] || ''}}</p>
      <p v-if="themeType==='fireworks'" class="page-news__info" style="color:#4378BC">{{tmp[0]}}</p>
      <p v-if="themeType==='fireworks'" class="page-news__info" style="color:#808080">{{tmp[1]}}</p>
    </div>
    <show-rooms />
  </div>
</template>
<script>
import startImgUrl from '../../assets/news/open-img.jpg';
import newShipImgUrl from '../../assets/news/new-ship.jpg';
import fireworksImgUrl from '../../assets/news/fireworks-list.jpg';
import titleBoat from '@/components/titleBoat.vue';
import showRooms from '@/views/layout/components/showRooms.vue';
import constVar from '@/utils/constVar';
import placeholder from '../../assets/bg_image/bg_placeholder.jpg';

export default {
  name: 'pageNews',
  components: {
    titleBoat,
    showRooms,
  },
  mounted() {
    this.$vuetify.goTo(0, constVar.scrollPagAni);
  },
  computed: {
    themeType() {
      return this.$route.query.theme;
    },
  },
  data() {
    return {
      constVar,
      placeholder,
      title: {
        textUp: '最新消息',
        textDown: 'GOOD NEWS',
        targetClass: 'target-news',
      },
      theme: {
        start: '歡慶飛樂米星空號起航',
        fireworks: '澎湖花火節',
        newship: '全新百麗快速客輪開航',
      },
      img: {
        start: startImgUrl,
        fireworks: fireworksImgUrl,
        newship: newShipImgUrl,
      },
      info: {
        start: '即日起至5/30，歡慶飛樂米星空號起航優惠活動開跑囉，優惠限時開跑，凡訂房即贈送精美紀念品。',
        fireworks: '澎湖花火節：比跨年煙火還美麗，絕對不能錯過的精彩~~\n\n    2019澎湖花火節，2019澎湖國際海上花火節將於4月18日至6月27日華麗登場，每週一、四晚上在馬公市觀音亭施放，並增加5月12日（母親節）節慶加場活動，共計22場次。邀請大家一起參與澎湖觀光年度盛事，感受繽紛璀璨的花火饗宴、精彩節目及「世界最美麗海灣–澎湖灣」澎湃的活力。\n',
        newship: '全世界最快高速客輪！百麗新船3月開航　嘉義到澎湖竟然只要1H，高雄到馬公2小時、台中到馬公2小時10分鐘，蘇澳到花蓮1小時左右，暢遊藍色公路安全快速還「不會暈船」，享受海上風光！\n\n另外，百麗航運補充，百麗航運也將規劃五月的的第二艘船拓展台灣東部蘇澳至花蓮往返航線，以便利民眾更多元的交通選擇\n',
      },
      tmp: [
        '地點：馬公市觀音亭\n節目活動時間：晚上8點開始（開幕19:30開始）\n花火施放時間：晚上9點 施放15分鐘（開幕20分鐘）',
        '（最新消息及異動以「澎湖縣政府旅遊處」公告為主）',
      ],
    };
  },
};
</script>
