<template>
  <div class="news-list">
    <v-layout row>
      <v-flex xs5 class="news-list__img">
        <img :src="img" alt="">
      </v-flex>
      <v-flex xs7 class="news-list__content">
        <v-layout column>
          <v-flex xs4 class="news-list__title">
            <h2 class="secondary--text text-under-line">{{title}}</h2>
          </v-flex>
          <v-flex xs4 class="news-list__intro">
            <p class="textBlack--text">{{intro}}</p>
          </v-flex>
          <v-flex xs4 class="news-list__more">
            <v-btn class="news-list__more-btn primary" @click="$router.push('news')">MORE</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  name: 'newsList',
  props: ['img', 'title', 'intro'],
  data() {
    return {

    };
  },
};
</script>
