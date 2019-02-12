<template>
  <div class="page-news">
    <v-layout row>
      <v-flex xs6 class="page-news__title">
        <title-boat
          :targetClass="title.targetClass"
          :textUp="title.textUp"
          :textDown="title.textDown"
        />
      </v-flex>
    </v-layout>
    <div class="page-news__img">
      <img src="../../assets/news/ad001.jpg" alt="">
    </div>
    <div class="page-news__content">
      <h2 class="page-news__theme secondary--text text-under-line">{{theme}}</h2>
      <p class="page-news__info textBlack--text">{{info}}</p>
    </div>
    <show-rooms />
  </div>
</template>
<script>
import titleBoat from '@/components/titleBoat.vue';
import showRooms from '@/views/layout/components/showRooms.vue';

export default {
  name: 'pageNews',
  components: {
    titleBoat,
    showRooms,
  },
  data() {
    return {
      title: {
        textUp: '最新消息',
        textDown: 'GOOD NEWS',
        targetClass: 'target-news',
      },
      theme: '歡慶飛樂米星空號起航',
      info: '即日起至5/5，歡慶飛樂米星空號起航優惠活動開跑囉，優惠限時開跑，凡訂房及贈送精美紀念品。',
    };
  },
};
</script>
