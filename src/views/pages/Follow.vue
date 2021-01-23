<template>
  <div class="page-follow page-container">
    <v-layout row>
      <v-flex xs6 class="primary-title">
        <title-boat
          :targetClass="title.targetClass"
          :textUp="title.textUp"
          :textDown="title.textDown"
        />
      </v-flex>
    </v-layout>
    <div
      v-if="follow[themeType]"
      class="primary-content" >
      <h2 class="page-follow__theme secondary--text text-under-line">
        {{follow[themeType].theme || ''}}
      </h2>
      <div v-if="follow[themeType].info">
        <v-layout
          row
          v-for="(item, idx) in follow[themeType].info"
          :key="`info${themeType}${idx}`"
          class="page-follow__content" >
          <v-flex xs4>
            <div class="page-follow__content--img">
              <img class="sm" v-lazy="item.img" alt="">
            </div>
          </v-flex>
          <v-flex xs8 class="page-follow__content--info">
            <h4
              v-if="item.title"
              class="page-follow__content--title textBlack--text"
            >・{{item.title}}</h4>
            <!-- <p class="page-follow__content--text textBlack--text">{{item.text}}</p> -->
            <p class="page-follow__content--text textBlack--text" v-html="item.text" />
          </v-flex>
        </v-layout>
      </div>
      <div class="primary-img" v-if="follow[themeType].primaryImg">
        <img class="lg" v-lazy="follow[themeType].primaryImg" alt="">
      </div>
    </div>
    <show-rooms />
  </div>
</template>
<script>
import titleBoat from '@/components/titleBoat.vue';
import showRooms from '@/views/layout/components/showRooms.vue';
import constVar from '@/utils/constVar';
import { mapGetters } from 'vuex';

export default {
  name: 'pageFollow',
  components: {
    titleBoat,
    showRooms,
  },
  mounted() {
    setTimeout(() => {
      this.scrollToTop();
    }, 200);
  },
  computed: {
    themeType() {
      return this.$route.query.theme;
    },
    ...mapGetters(['follow']),
  },
  data() {
    return {
      constVar,
      title: {
        textUp: '跟我醬玩！',
        textDown: '澎湖行程建議',
        targetClass: 'target-follow',
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
