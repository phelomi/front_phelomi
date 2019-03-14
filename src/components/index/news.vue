<template>
  <div class="index-news">
    <v-carousel
      class="index-topic__carousels"
      height="36.22vw"
      hide-delimiters
      :interval="15000"
      :hide-controls="newsList.length <= 1"
    >
      <v-carousel-item
        v-for="(newsListGroup, idx) in newsList"
        :key="`newsList${idx}`"
        class="index-news__content"
        prev-icon="mdi-chevron-left-circle"
        next-icon="mdi-chevron-right-circle"
      >
        <news-list
          v-for="(item, idx) in newsListGroup"
          :key="`newsListGroup${idx}`"
          :img="item.img"
          :theme="item.theme"
          :title="item.title"
          :intro="item.intro"
        />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import newsList from '@/components/newsList.vue';
import news001 from '../../assets/img_sm/news001.jpg';
import news002 from '../../assets/img_sm/news002.jpg';
import news003 from '../../assets/img_sm/news003.jpg';

export default {
  name: 'indexNews',
  components: {
    newsList,
  },
  data() {
    return {
      newsList: [
        [
          {
            img: news001,
            theme: 'start',
            title: '歡慶飛樂米星空號起航',
            intro: '即日起至5/30，歡慶飛樂米星空號起航，優惠活動開跑囉',
          },
          {
            img: news002,
            theme: 'fireworks',
            title: '澎湖花火節',
            intro: '澎湖花火節4/19、4/23，精彩可期，錯過可惜，...',
          },
        ],
        [
          {
            img: news003,
            theme: 'newship',
            title: '全新百麗快速客輪開航',
            intro: '全世界最快高速客輪！百麗新船3月開航，嘉義到澎湖竟然只要...',
          },
          // {
          //   img: news002,
          //   title: '澎湖花火節',
          //   intro: '澎湖花火節4/19、4/23，精彩可期，錯過可惜，...',
          // },
        ],
      ],
    };
  },
};
</script>
