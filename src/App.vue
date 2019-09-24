<template>
  <v-app>
    <v-content :class="{ main: init }">
      <template v-if="init">
        <v-progress-circular
          indeterminate
          :size="250"
          color="primary" />
      </template>
      <tempalte v-else>
        <router-view/>
      </tempalte>
    </v-content>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['init']),
  },
};
</script>
<style lang="stylus">
#app
  .main
    .v-content__wrap
      display flex
      justify-content center
      align-items center

</style>
