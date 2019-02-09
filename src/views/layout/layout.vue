<template>
  <v-app>
    <layout-header />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <layout-footer />
  </v-app>
</template>
<script>
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
    };
  },
  methods: {
  },
};
</script>
