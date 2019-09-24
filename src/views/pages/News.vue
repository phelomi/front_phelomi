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
    <template v-if="news[themeType]">
      <div
        v-if="news[themeType].img"
        class="primary-img page-news__img"
        v-lazy:background-image="news[themeType].img"
      >
        <img class="lg" v-lazy="news[themeType].img" alt="">
      </div>
      <div class="primary-content page-news__content">
        <h2 class="page-news__theme secondary--text text-under-line">
          {{news[themeType].theme || ''}}
        </h2>
        <p class="page-news__info textBlack--text">{{news[themeType].info || ''}}</p>
        <template v-if="news[themeType].extra">
          <p
            v-for="(item, itemIndex) in news[themeType].extra"
            :key="itemIndex"
            class="page-news__info"
            v-bind:style="{ color: item.color || '#231815' }" >{{item.text || ''}}</p>
        </template>
      </div>
      <show-rooms />
    </template>
  </div>
</template>
<script>
import titleBoat from '@/components/titleBoat.vue';
import showRooms from '@/views/layout/components/showRooms.vue';
import constVar from '@/utils/constVar';
import placeholder from '../../assets/bg_image/bg_placeholder.jpg';
import { mapGetters } from 'vuex';

export default {
  name: 'pageNews',
  components: {
    titleBoat,
    showRooms,
  },
  mounted() {
    this.scrollToTop();
  },
  computed: {
    themeType() {
      return this.$route.query.theme;
    },
    ...mapGetters(['news']),
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
    };
  },
  methods: {
    scrollToTop() {
      setTimeout(() => {
        this.$vuetify.goTo(-200, constVar.scrollPagAni);
      });
    },
  },
};
</script>
