<template>
  <div class="location-list">
    <v-layout row>
      <v-flex xs8 class="location-list__left">
        <div class="location-list__title text-under-line">
          <div class="location-list__title--img">
            <img :src="titleIcon" alt="">
          </div>
          <h2 class="primary--text">{{title}}</h2>
        </div>
        <div class="location-list__address">
          <p class="primary--text">{{targetTitle}}</p>
          <h3 class="error--text">{{targetAddress}}</h3>
        </div>
        <div class="location-list__traffic">
          <h3 class="primary--text location-list__traffic--title">{{trafficTitle}}</h3>
          <div
            v-for="(item, idx) in trafficList"
            :key="`trafficList${idx}`"
            class="location-list__traffic-list"
          >
            <div class="primary--text location-list__traffic-list--row">
              <div class="location-list__traffic-list--target">{{item.target}}</div>
              <div class="location-list__traffic-list--describe">{{item.describe}}</div>
              <div class="location-list__traffic-list--number white--text error">{{item.number}}</div>
              <div class="location-list__traffic-list--unit">{{item.unit}}</div>
            </div>
          </div>
        </div>
      </v-flex>
      <v-flex xs4 class="location-list__right">
        <div class="location-list__img">
          <img :src="image" alt="">
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  name: 'locationList',
  props: [
    'title',
    'titleIcon',
    'targetTitle',
    'targetAddress',
    'trafficTitle',
    'trafficList',
    'image',
  ],
  data() {
    return {

    };
  },
};
</script>
