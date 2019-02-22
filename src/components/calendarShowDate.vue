<template>
  <div :class="[
    'calendar-show-date calendar-date__basis',
    offset ? `calendar-date--offset-${offset}`: ''
  ]">
    <div class="calendar-date__title">
      <p class="primary--text">{{dateTitle}}</p>
    </div>
    <div class="calendar-show-date__content">
      <div
        class="calendar-date__row"
        v-for="(item, idx) in roomsKeys"
        :key="`roomsKeys${idx}`"
      >
        <div class="calendar-show-date__room-type textBlack--text">{{item}}</div>
        <div class="calendar-show-date__room-available">
          <p class="textBlack--text">{{rooms[item]}}</p>
        </div>
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
      // orderRoom: {},
    };
  },
  watch: {
    // rooms: {
    //   handler(val) {
    //     Object.keys(val).forEach((item) => { this.$set(this.orderRoom, item, 0); });
    //   },
    //   immediate: true,
    // },
    // orderRoom: {
    //   handler(val) {
    //     this.$emit('selectRoom', val);
    //   },
    //   deep: true,
    // },
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
  },
};
</script>
