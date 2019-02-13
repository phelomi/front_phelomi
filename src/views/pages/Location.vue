<template>
  <div class="page-location page-container">
    <v-layout row>
      <v-flex xs6 class="primary-title">
        <title-boat
          :targetClass="title.targetClass"
          :textUp="title.textUp"
          :textDown="title.textDown"
        />
      </v-flex>
    </v-layout>
    <div class="primary-content page-location__content">
      <v-layout row>
        <v-flex xs9>
        </v-flex>
        <v-flex xs3>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import titleBoat from '@/components/titleBoat.vue';

export default {
  name: 'pageLocation',
  components: {
    titleBoat,
  },
  data() {
    return {
      title: {
        textUp: '交通位置',
        textDown: 'LOCATION',
        targetClass: 'target-location',
      },
      info: {

      },
    };
  },
  methods: {
  },
};
</script>
