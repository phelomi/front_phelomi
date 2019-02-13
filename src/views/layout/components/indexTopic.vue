<template>
  <div
    :class="[
      'index-topic page-container',
      backgroundColor,
      outerCssClass,
      withoutTitleChangeSetOuter
    ]"
    :style="backgroundImageStyle"
  >
    <v-layout row>
      <v-flex v-if="textUp" xs6 class="index-topic__title">
        <title-boat
          :targetClass="targetClass"
          :textUp="textUp"
          :textDown="textDown"
        />
      </v-flex>
      <v-flex v-if="introText" xs6 class="index-topic__intro">
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
    'outerCssClass',
    'targetClass',
  ],
  components: {
    titleBoat,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,

    };
  },
  computed: {
    componentLoader() {
      const path = this.contentPath;
      return () => import(`@/${path}`);
    },
    backgroundImageStyle() {
      return { backgroundImage: `url(${this.publicPath}${this.backgroundImage})` };
    },
    withoutTitleChangeSetOuter() {
      return !this.textUp && this.targetClass ? this.targetClass : null;
    },
  },
};
</script>
