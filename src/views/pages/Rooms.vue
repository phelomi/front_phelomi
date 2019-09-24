<template>
  <div class="page-rooms page-container">
    <v-layout row>
      <v-flex xs6 class="primary-title">
        <title-boat
          :targetClass="title.targetClass"
          :textUp="title.textUp"
          :textDown="title.textDown"
        />
      </v-flex>
    </v-layout>
    <v-carousel class="index-topic__carousels" height="43.86vw" hide-delimiters>
      <v-carousel-item
        v-for="(item, idx) in roomList[roomKey].imgList"
        :key="`roomsPhotoList${idx}`"
        class="page-rooms__carousels"
        prev-icon="mdi-chevron-left-circle"
        next-icon="mdi-chevron-right-circle"
      >
        <div class="primary-img">
          <img
            class="lg"
            v-lazy="item || null"
            alt=""
          >
            <!-- :style="item ? {backgroundImage: `url(/img/rooms${item})`} : null" -->
        </div>
      </v-carousel-item>
    </v-carousel>
    <div class="primary-content page-rooms__content">
      <v-layout row>
        <v-flex xs9>
          <div class="page-rooms__left">
            <div class="page-rooms__space">
              <div class="page-rooms__theme white--text secondary">房間介紹</div>
              <p
                v-for="(item, idx) in roomType[roomTypeKey].info"
                :key="`roomTypeInfo${idx}`"
                class="page-rooms__text textBlack--text"
              >{{item.text}}：{{item.val}}</p>
              <div
                v-for="(iconGroup, groupIdx) in roomType[roomTypeKey].iconIntro"
                :key="`iconList${groupIdx}`"
                class="page-rooms__services-icon"
              >
                <template v-if="iconGroup">
                  <p>{{iconGroup.text}}</p>
                  <v-layout row wrap class="page-rooms__icon-list">
                    <template v-if=iconGroup.icon>
                      <v-flex
                          xs4
                          md3
                          v-for="(icon, idx) in iconGroup.icon"
                          :key="`icon${idx}`"
                          class="page-rooms__icon-list--icon"
                        >
                          <template v-if="icon">
                            <v-icon>{{icon.icon}}</v-icon><span>{{icon.val}}</span>
                          </template>
                        </v-flex>
                    </template>
                  </v-layout>
                </template>
              </div>
            </div>
            <div class="page-rooms__space">
              <div class="page-rooms__theme white--text info">住房須知</div>
              <p class="page-rooms__text textBlack--text">{{info.liveNotice}}</p>
              <ul>
                <li
                  v-for="(item, idx) in info.liveRule"
                  :key="`liveRule${idx}`"
                  class="page-rooms__text textBlack--text"
                >{{item}}</li>
              </ul>
              <p class="page-rooms__text textBlack--text">{{info.end}}</p>
            </div>
            <div class="page-rooms__space">
              <div class="page-rooms__theme white--text warning">退訂政策</div>
              <ul>
                <li
                  v-for="(item, idx) in info.unsubscribe"
                  :key="`unsubscribe${idx}`"
                  class="page-rooms__text textBlack--text"
                >{{item}}</li>
              </ul>
            </div>
          </div>
        </v-flex>
        <v-flex xs3>
          <div class="page-rooms__right">
            <a
              :href="constVar.orderLink"
              target="_blank"
            >
              <v-btn
                class="page-rooms__order-btn white--text error"
              >{{orderBtnText}}</v-btn>
            </a>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <show-rooms />
  </div>
</template>
<script>
import titleBoat from '@/components/titleBoat.vue';
import showRooms from '@/views/layout/components/showRooms.vue';
import constVar from '@/utils/constVar';
import { roomList, roomType } from '@/utils/constRooms';
import { mapGetters } from 'vuex';

export default {
  name: 'pageRooms',
  components: {
    titleBoat,
    showRooms,
    // servicesIcon,
  },
  mounted() {
    this.scrollToTop();
  },
  watch: {
    roomKey: {
      handler(val) {
        if (!val) this.$router.push('/');
      },
      immediate: true,
    },
  },
  computed: {
    roomKey() {
      if (this.$route.query && this.$route.query.t) {
        this.$vuetify.goTo(-200, constVar.scrollPagAni);
        return this.$route.query.t;
      }
      return null;
    },
    roomTypeKey() {
      return this.roomKey ? this.roomList[this.roomKey].type : null;
    },
    title() {
      return {
        textUp: this.roomType[this.roomTypeKey].textUp || '房間介紹',
        textDown: `ROOMS_${this.roomList[this.roomKey].textDown || ''}`,
        targetClass: 'target-rooms',
      };
    },
    ...mapGetters({
      info: 'roomIntro',
    }),
  },
  data() {
    return {
      constVar,
      roomList,
      roomType: roomType(),
      // roomsPhotoList: roomList[roomKey].imgList,
      orderBtnText: '立即\n訂房',
    };
  },
  methods: {
    // methodOrder() {
    //   this.$router.push('/order');
    // },
    scrollToTop() {
      setTimeout(() => {
        this.$vuetify.goTo(-200, constVar.scrollPagAni);
      });
    },
  },
};
</script>
