<template>
  <a
    class="header__button"
    :href="url"
  >
    <span class="header__button__head"></span>
    <div class="header__button__body">
      <img :src="buttonBodyFront" alt="" class="header__button__body__front">
      <div class="header__button__body__text"><span>{{this.text}}</span></div>
      <img :src="buttonBodyEnd" alt="" class="header__button__body__end">
    </div>
  </a>
</template>
<script>
import buttonBodyFront from '../assets/button/button_header_body_front.svg';
import buttonBodyEnd from '../assets/button/button_header_body_end.svg';

export default {
  name: 'headerButton',
  props: ['text', 'url'],
  data() {
    return {
      buttonBodyFront,
      buttonBodyEnd,
      localText: '',
      localUrl: '',
    };
  },
  computed: {
    buttonLg() {
      return this.text.length > 4 ? 'header__button__lg' : '';
    },
  },
  methods: {

  },
};
</script>
