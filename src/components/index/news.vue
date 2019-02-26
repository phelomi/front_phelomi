<template>
  <div class="index-news">
    <v-carousel class="index-topic__carousels" height="36.22vw" hide-delimiters :interval="15000">
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
            title: '歡慶飛樂米星空號起航',
            intro: '即日起至5/5，歡慶飛樂米星空號起航，優惠活動開跑囉',
          },
          {
            img: news002,
            title: '澎湖花火節',
            intro: '澎湖花火節4/19、4/23，精彩可期，錯過可惜，...',
          },
        ],
        [
          {
            img: news001,
            title: '歡慶飛樂米星空號起航',
            intro: '即日起至5/5，歡慶飛樂米星空號起航，優惠活動開跑囉',
          },
          {
            img: news002,
            title: '澎湖花火節',
            intro: '澎湖花火節4/19、4/23，精彩可期，錯過可惜，...',
          },
        ],
      ],
    };
  },
};
</script>
