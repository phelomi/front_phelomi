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
      @click="$vuetify.goTo(0, constVar.scrollPagAni)"
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
  },
};
</script>
