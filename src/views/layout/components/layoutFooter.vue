<template>
  <div class="layout-footer">
    <v-layout column class="layout-footer__outer">
      <v-flex xs6 class="layout-footer__content">
        <v-layout row>
          <v-flex xs5 class="layout-footer__logo">
            <img :src="imgPathLogoVertical" alt="">
          </v-flex>
          <v-flex xs7 class="layout-footer__contact">
            <v-layout>
              <v-flex
                v-for="(item, idx) in contactList"
                :key="`contactList${idx}`"
                xs3
                class="layout-footer__contact--list"
              >
                <a :href="item.url">
                  <v-layout row>
                    <v-flex xs4 class="layout-footer__contact--list-icon">
                      <img :src="item.icon" alt="">
                    </v-flex>
                    <v-flex xs8 class="layout-footer__contact--list-text">
                      <p class="secondary--text">{{item.text}}</p>
                    </v-flex>
                  </v-layout>
                </a>
              </v-flex>
              <v-flex xs3 class="layout-footer__contact--add-friend">
                <v-layout row>
                  <v-flex
                    v-for="(item, idx) in addFriendList"
                    :key="`addFriendList${idx}`"
                    xs6
                  >
                    <v-btn @click="goToUrl(item.url)" color="#40A637" class="white--text">
                      <img :src="item.icon" alt="">
                      <p class="white--text">{{item.text}}</p>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs3 class="layout-footer__social">
        <div class="layout-footer__social--group">
          <social-button />
        </div>
      </v-flex>
      <v-flex xs3 class="layout-footer__copyright">
        <p class="secondary--text">{{copyrightText}}</p>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import socialButton from '@/components/socialButton.vue';
import imgPathLogoVertical from '../../../assets/logo/logo_vertical.svg';
import imgPathPhone from '../../../assets/contact/icon_phone.svg';
import imgPathEmail from '../../../assets/contact/icon_email.svg';
import imgPathAddress from '../../../assets/contact/icon-address.svg';
import imgPathWechat from '../../../assets/contact/icon_white_wechat.svg';
import imgPathLine from '../../../assets/contact/icon_white_line.svg';

export default {
  name: 'layoutFooter',
  components: {
    socialButton,
  },
  data() {
    return {
      imgPathLogoVertical,
      copyrightText: '© 2019 Family Starry Sky Co., Ltd. All rights reserved. 飛樂米星空號有限公司 版權所有\nDesign by 方蘋果數位行銷設計有限公司',
      contactList: [
        { icon: imgPathPhone, text: '(00)1234-5678', url: '' },
        { icon: imgPathEmail, text: 'OOOOOO@gmail.com', url: '' },
        { icon: imgPathAddress, text: '澎湖縣馬公市山水里珠海182號', url: '' },
      ],
      addFriendList: [
        { icon: imgPathWechat, text: '微信加入好友', url: '' },
        { icon: imgPathLine, text: 'LINE 加入好友', url: '' },
      ],
    };
  },
  methods: {
    goToUrl(url) {
      window.open(url);
    },
  },
};
</script>
