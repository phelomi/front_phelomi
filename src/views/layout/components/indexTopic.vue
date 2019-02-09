<template>
  <div class="index-topic">
    <v-layout row>
      <v-flex xs6 class="index-topic__title">
        <titleBoat />
      </v-flex>
      <v-flex xs6 class="index-topic__intro">
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 class="index-topic__content">
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import titleBoat from '@/components/titleBoat.vue';

export default {
  name: 'indexTopic',
  components: {
    titleBoat,
  },
  data() {
    return {

    };
  },
};
</script>
