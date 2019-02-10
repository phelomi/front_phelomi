<template>
  <div :class="['index-topic', backgroundColor]">
    <v-layout row>
      <v-flex xs6 class="index-topic__title">
        <titleBoat
          :textUp="textUp"
          :textDown="textDown"
        />
      </v-flex>
      <v-flex v-show="introText" xs6 class="index-topic__intro">
        <p class="textBlack--text text-under-line">{{introText}}</p>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 class="index-topic__content">
        <component
          :is="componentLoader"
        />
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import titleBoat from '@/components/titleBoat.vue';

export default {
  name: 'indexTopic',
  props: [
    'textUp',
    'textDown',
    'introText',
    'contentPath',
    'backgroundColor',
    'backgroundImage',
  ],
  components: {
    titleBoat,
  },
  data() {
    return {

    };
  },
  computed: {
    componentLoader() {
      const path = this.contentPath;
      return () => import(`@/${path}`);
    },
  },
};
</script>
