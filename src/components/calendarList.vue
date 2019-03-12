<template>
  <div class="calendar-list">
    <div class="calendar-list__year">
      <h2 class="primary--text">{{year}}</h2>
    </div>
    <div class="calendar-list__date-list">
      <calendar-select-date
        ref="calendarSelectDate"
        v-for="(item, idx) in dateList"
        :key="`dateList${idx}`"
        :date="item.date"
        :rooms="item.rooms"
        :offset="getOffset(idx)"
        @selectRoom="selectRoom($event, item.date)"
        :roomTypeInfo="roomTypeInfo"
        :class="methodClassActive(item.date)"
      />
    </div>
  </div>
</template>
<script>
import calendarSelectDate from '@/components/calendarSelectDate.vue';
import { getDate, getDayRange, addDays } from '@/utils/dateMethod';

export default {
  name: 'calendarList',
  components: {
    calendarSelectDate,
  },
  props: ['year', 'dateList', 'clearSelected', 'roomTypeInfo', 'selectedDateRange'],
  data() {
    return {
    };
  },
  computed: {
    selectedDateRangeString() {
      const res = [];
      const { startTime, endTime } = this.selectedDateRange;
      let start = this.getDate(startTime, 'timestamp');
      const end = this.getDate(endTime, 'timestamp');
      while (start <= end) {
        res.push(this.getDate(start, 'fullDateFormat'));
        start = this.addDays(start, 1);
      }
      return res;
    },
  },
  watch: {
    clearSelected: {
      handler(val) {
        if (val) {
          if (Object.keys(this.$refs).length > 0) {
            this.$refs.calendarSelectDate.forEach((component) => {
              component.methodCleadSelectedRoom();
            });
          }
          this.$emit('update:clearSelected', false);
        }
      },
      immediate: true,
    },
  },
  mounted() {
  },
  methods: {
    getDate,
    getDayRange,
    addDays,
    selectRoom(selected, date) {
      this.$emit('addSelectedRoom', date, selected);
    },
    getOffset(currentIdx) {
      const currentDate = this.dateList[currentIdx].date;
      const currentDayIdx = this.getDate(currentDate, 'dayIndex');
      let left = null;
      let right = null;

      if (currentIdx === 0) {
        // 第一個
        left = currentDayIdx;
      } else {
        const prevDate = this.dateList[currentIdx - 1].date;
        const currentOffset = this.getDayRange(currentDate, prevDate);
        left = currentOffset < currentDayIdx ? currentOffset : currentDayIdx;
      }
      if (currentIdx === this.dateList.length - 1) {
        // 最後一個
        right = null;
      } else {
        const nextDate = this.dateList[currentIdx + 1].date;
        const nextDayIdx = this.getDate(nextDate, 'dayIndex');
        const nextOffset = this.getDayRange(nextDate, currentDate);
        if (nextOffset >= (6 - currentDayIdx)) right = 6 - currentDayIdx;
      }

      return { left, right };
    },
    methodClassActive(date) {
      return this.selectedDateRangeString.filter(item => item === date).length > 0
        ? 'calendar-select-date--active'
        : '';
    },
  },
};
</script>
