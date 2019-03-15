<template>
  <div class="rooms-list">
    <a
      @click="$router.push({path:url,query: info})"
      class="rooms-list__link"
    >
      <v-layout column>
        <v-flex xs8 class="rooms-list__img">
          <img class="sm" v-lazy="img" alt="">
        </v-flex>
        <v-flex xs4 class="rooms-list__content">
          <v-layout column>
            <v-flex xs6 class="rooms-list__title justify-center">
              <h2
                :class="[
                  'primary--text text-sm-center rooms-list__title-text',
                  title.length >= 10 ? 'letter-space-zero' : ''
                ]"
              >{{title}}</h2>
            </v-flex>
            <v-flex xs6 class="rooms-list__intro">
              <p class="textBlack--text text-sm-center">{{intro}}</p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </a>
  </div>
</template>
<script>
export default {
  name: 'roomsList',
  props: ['img', 'title', 'intro', 'url', 'info'],
  data() {
    return {

    };
  },
};
</script>
