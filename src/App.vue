<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
    <v-icon
      class="scroll-to-top"
      color="secondary"
      @click="$vuetify.goTo(0, constVar.scrollPagAni)"
    >mdi-chevron-up-circle-outline</v-icon>
  </v-app>
</template>

<script>
import constVar from '@/utils/constVar';

export default {
  name: 'App',
  data() {
    return {
      constVar,
    };
  },
};
</script>
