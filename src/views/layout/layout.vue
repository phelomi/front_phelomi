<template>
  <v-app>
    <layout-header />
    <v-content>
      <router-view></router-view>
    </v-content>
    <layout-footer />
    <v-icon
      class="scroll-to-top"
      color="secondary"
      @click="scrollToTop"
    >mdi-chevron-up-circle-outline</v-icon>
  </v-app>
</template>
<script>
import constVar from '@/utils/constVar';
import layoutHeader from './components/layoutHeader.vue';
import layoutFooter from './components/layoutFooter.vue';

export default {
  name: 'index',
  components: {
    layoutHeader,
    layoutFooter,
  },
  props: {
    source: String,
  },
  data() {
    return {
      constVar,
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
