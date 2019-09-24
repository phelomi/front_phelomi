<template>
  <div class="index-news">
    <v-carousel
      class="index-topic__carousels"
      height="auto"
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
import { mapGetters } from 'vuex';

export default {
  name: 'indexNews',
  components: {
    newsList,
  },
  data() {
    return {
      // newsList: newsSM
      //   .reduce((acc, cur, index) => {
      //     const realIndex = parseInt(index / 2, 10);
      //     if (acc[realIndex]) acc[realIndex].push(cur);
      //     else acc.push([cur]);
      //     return acc;
      //   }, []),
    };
  },
  computed: {
    ...mapGetters(['newsSM']),
    newsList() {
      return this.newsSM.reduce((acc, cur, index) => {
        const realIndex = parseInt(index / 2, 10);
        if (acc[realIndex]) acc[realIndex].push(cur);
        else acc.push([cur]);
        return acc;
      }, []);
    },
  },
};
</script>
