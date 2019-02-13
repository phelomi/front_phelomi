<template>
  <div class="index-location">
    <v-layout row>
      <v-flex xs8 class="index-location__intro">
        <p class="white--text">{{introText}}</p>
      </v-flex>
      <v-flex xs4 class="index-location__content">
        <v-layout column>
          <v-flex
            v-for="(item, idx) in locationList"
            :key="`locationList${idx}`"
            xs12
          >
            <a
              @click="$router.push('/location')"
              :class="['index-location__button', item.bgColor, `index-location__button--${idx}`]"
            >
              <img
                :src="item.icon"
                alt=""
                class="index-location__button--icon"
              >
              <p class="index-location__button--title white--text">{{item.title}}</p>
            </a>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import positionIcon from '../../assets/button/icon_position.svg';
import shipIcon from '../../assets/button/icon_ship.svg';
import airplaneIcon from '../../assets/button/icon_airplane.svg';

export default {
  name: 'news',
  components: {},
  data() {
    return {
      introText: '享受澎湖的海天一色，\n來一趟難忘的充電之旅。',
      locationList: [
        { title: '民宿地理位置', icon: positionIcon, bgColor: 'info' },
        { title: '搭船', icon: shipIcon, bgColor: 'warning' },
        { title: '搭飛機', icon: airplaneIcon, bgColor: 'error' },
      ],
    };
  },
};
</script>
