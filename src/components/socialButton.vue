<template>
  <div class="social-button">
    <a
      v-for="(item, idx) in socialButtonList"
      :key="`socialButtonList${idx}`"
      :href="item.url ? item.url : null"
      @click.stop="methodCopyText(item.target, item.id)"
      target="_blank"
      class="social-button__link"
    >
      <img v-lazy="item.imgPath" alt="" class="social-button__img">
      <div
        v-if="item.qrcodeImg"
        :class="['social-button__qrcode grey lighten-4', directionTop ? '' : 'down']"
      >
        <p>掃描QR code立即加入好友，</p>
        <p>或點擊icon複製{{item.target}}</p>
        <img :src="item.qrcodeImg" alt="">
        <p>{{item.target}}：{{item.id}}</p>
      </div>
    </a>
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
import imgPathFacebook from '../assets/social_icon/icon_facebook.svg';
import imgPathLine from '../assets/social_icon/icon_line.svg';
import imgPathWechat from '../assets/social_icon/icon_wechat.svg';
import imgPathInstagram from '../assets/social_icon/icon_instagram.svg';
import qrcodeLine from '../assets/qrcode/qrcode-line.jpg';
import qrcodeWechat from '../assets/qrcode/qrcode-wechat.jpg';

export default {
  name: 'socialButton',
  props: {
    directionTop: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      socialButtonList: [
        { url: 'https://www.facebook.com/%E9%A3%9B%E6%A8%82%E7%B1%B3%E6%98%9F%E7%A9%BA%E8%99%9F%E6%B0%91%E5%AE%BF-2201434893406940/', imgPath: imgPathFacebook },
        {
          url: '', imgPath: imgPathLine, target: 'LINE ID', id: '0967229968', qrcodeImg: qrcodeLine,
        },
        {
          url: '', imgPath: imgPathWechat, target: '微信ID', id: 'f0967229968', qrcodeImg: qrcodeWechat,
        },
        { url: 'https://www.instagram.com/familystarrysky/?hl=zh-tw', imgPath: imgPathInstagram },
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
      if (id) {
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
      }
    },
  },
};
</script>
