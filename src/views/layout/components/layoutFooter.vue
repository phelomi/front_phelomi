<template>
  <div class="layout-footer target-contact outer-contact" v-lazy:background-image="bgFooter">
    <v-layout column class="layout-footer__outer">
      <v-flex xs6 class="layout-footer__content">
        <v-layout row>
          <v-flex xs5 class="layout-footer__logo">
            <img v-lazy="imgPathLogoVertical" alt="">
          </v-flex>
          <v-flex xs7 class="layout-footer__contact">
            <v-layout>
              <v-flex
                v-for="(item, idx) in contactList"
                :key="`contactList${idx}`"
                xs3
                class="layout-footer__contact--list"
              >
                <a :href="item.url ? item.url : null" target="_blank">
                  <v-layout row>
                    <v-flex xs4 class="layout-footer__contact--list-icon">
                      <img v-lazy="item.icon" alt="">
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
                    <v-btn
                      @click="methodCopyText(item.target, item.id)"
                      color="#40A637"
                      class="white--text"
                    >
                      <img v-lazy="item.icon" alt="">
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
    <v-snackbar
      v-model="notifySetting.open"
      top
      right
      :timeout="notifySetting.timeout"
      :color="notifySetting.color"
      class="textBlack--text"
    >{{notifySetting.text}}<v-btn
        flat
        @click="notifySetting.open = false"
      >
        <v-icon color="textBlack">mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
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
import bgFooter from '../../../assets/bg_image/bg_footer.png';

export default {
  name: 'layoutFooter',
  components: {
    socialButton,
  },
  data() {
    return {
      bgFooter,
      imgPathLogoVertical,
      copyrightText: '© 2019 Family Starry Sky Co., Ltd. All rights reserved. 飛樂米星空號有限公司 版權所有\nDesign by 方蘋果數位行銷設計有限公司',
      contactList: [
        { icon: imgPathPhone, text: '(06)995-3288', url: 'tel:+886069953288' },
        { icon: imgPathPhone, text: '0967-229-968', url: 'tel:+886967229968' },
        { icon: imgPathEmail, text: '2019starrysky@gmail.com', url: 'mailto:2019starrysky@gmail.com' },
        { icon: imgPathAddress, text: '澎湖縣馬公市山水里珠江182號', url: '' },
      ],
      addFriendList: [
        {
          icon: imgPathWechat, text: '微信加入好友', target: '微信ID', id: 'f0967229968',
        },
        {
          icon: imgPathLine, text: 'LINE 加入好友', target: 'LINE ID', id: '0967229968',
        },
      ],
      notifySetting: {
        open: false,
        timeout: 5000,
        text: '',
        color: '',
      },
    };
  },
  methods: {
    methodCopyText(target, id) {
      const inputTag = document.createElement('input');
      inputTag.setAttribute('value', id);
      document.body.appendChild(inputTag);
      inputTag.select();
      const result = document.execCommand('copy');
      document.body.removeChild(inputTag);
      if (result) {
        this.notifySetting = {
          ...this.notifySetting,
          open: true,
          text: `已成功複製 ${target}`,
          color: 'success',
        };
      } else {
        this.notifySetting = {
          ...this.notifySetting,
          open: true,
          text: `${target} 複製失敗`,
          color: 'error',
        };
      }
    },
  },
};
</script>
