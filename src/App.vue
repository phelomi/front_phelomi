<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
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
