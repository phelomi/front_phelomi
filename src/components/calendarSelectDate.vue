<template>
  <div :class="[
    'calendar-select-date calendar-date__basis',
    offset && offset.left ? `calendar-date--offset-left-${offset.left}`: '',
    offset && offset.right ? `calendar-date--offset-right-${offset.right}`: '',
  ]">
    <div class="calendar-date__title">
      <p class="primary--text">{{dateTitle}}</p>
    </div>
    <div class="calendar-select-date__content">
      <div
        :class="['calendar-date__row', `tool-tip__color-${constVar.colorList[idx]}`]"
        v-for="(item, idx) in roomsKeys"
        :key="`roomsKeys${idx}`"
      >
        <div class="calendar-date__room-available">
          <p :class="`${constVar.colorList[idx]}--text`" >{{roomTypeInfo[item].name}}</p>
          <p :class="`${constVar.colorList[idx]}--text`" >{{methodShowRoomType(item)}}</p>
        </div>
        <div class="calendar-select-date__button-group">
          <v-btn
            @click="updateRoomNum(item,-1)"
            :disabled="!rooms[item] || !orderRoom[item]"
          >-</v-btn>
          <p
            :class="!rooms[item] ? 'grey--text text--lighten-1': 'textBlack--text'"
          >{{orderRoom[item]}}</p>
          <v-btn
            @click="updateRoomNum(item,1)"
            :disabled="!rooms[item] || rooms[item] === orderRoom[item]"
          >+</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDate } from '@/utils/dateMethod';
import { currencies } from '@/utils/calculation';
import constVar from '@/utils/constVar';

export default {
  name: 'calendarDate',
  props: ['date', 'rooms', 'offset', 'roomTypeInfo'],
  data() {
    return {
      constVar,
      orderRoom: {},
    };
  },
  watch: {
    rooms: {
      handler(val) {
        Object.keys(val).forEach((item) => { this.$set(this.orderRoom, item, 0); });
      },
      immediate: true,
    },
    orderRoom: {
      handler(val) {
        this.$emit('selectRoom', val);
      },
      deep: true,
    },
  },
  computed: {
    dateTitle() {
      return `${this.getDate(this.date, 'date')}(${this.getDate(this.date, 'day')})`;
    },
    roomsKeys() {
      return Object.keys(this.rooms);
    },
  },
  mounted() {
	console.log('TCL: activeClass', this.activeClass);
  },
  methods: {
    getDate,
    currencies,
    remainingRoom(item) {
      return this.rooms[item] - this.orderRoom[item];
    },
    updateRoomNum(item, addNum) {
      const min = 0;
      const max = this.rooms[item];
      const res = this.orderRoom[item] + addNum;
      if (res >= min && res <= max) {
        this.orderRoom[item] += addNum;
      }
    },
    methodShowRoomType(item) {
      return ` ${this.currencies(this.roomTypeInfo[item].price) || '--'}元 剩${this.remainingRoom(item)}間`;
    },
    methodCleadSelectedRoom() {
      Object.keys(this.orderRoom).forEach((item) => { this.$set(this.orderRoom, item, 0); });
    },
  },
};
</script>
