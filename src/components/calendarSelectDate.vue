<template>
  <div :class="[
    'calendar-select-date calendar-date__basis',
    offset ? `calendar-date--offset-${offset}`: ''
  ]">
    <div class="calendar-date__title">
      <p class="primary--text">{{dateTitle}}</p>
    </div>
    <div class="calendar-select-date__content">
      <div
        class="calendar-date__row"
        v-for="(item, idx) in roomsKeys"
        :key="`roomsKeys${idx}`"
      >
        <div class="calendar-select-date__room-available">
          <p :class="`${colorList[idx]}--text`" >● 1,500元 剩 {{remainingRoom(item)}}</p>
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
        <!-- <div class="calendar-select-date__room-available">
          <p :class="`${colorList[idx]}--text`" ></p>
        </div> -->

        <!-- <div class="calendar-select-date__room-type textBlack--text">{{item}}</div>
        <v-text-field
          type="number"
          min="0"
          :max="rooms[item]"
          v-model.number="orderRoom[item]"
          class="calendar-select-date__room-input"
        ></v-text-field> -->
      </div>
    </div>
  </div>
</template>
<script>
import { getDate } from '@/utils/dateMethod';

export default {
  name: 'calendarDate',
  props: ['date', 'rooms', 'offset'],
  data() {
    return {
      orderRoom: {},
      colorList: ['info', 'success', 'error', 'warning'],
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
  },
  methods: {
    getDate,
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
  },
};
</script>
