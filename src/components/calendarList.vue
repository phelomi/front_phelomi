<template>
  <div class="calendar-list">
    <div class="calendar-list__year">
      <h2 class="primary--text">{{year}}</h2>
    </div>
    <div class="calendar-list__date-list">
      <component
        :is="currentComponent"
        v-for="(item, idx) in dateList"
        :key="`dateList${idx}`"
        :date="item.date"
        :rooms="item.rooms"
        :offset="getOffset(idx)"
        @selectRoom="selectRoom($event, item.date)"
        :clearSelected.sync="clearSelected"
      />
    </div>
  </div>
</template>
<script>
import calendarSelectDate from '@/components/calendarSelectDate.vue';
import calendarShowDate from '@/components/calendarShowDate.vue';
import { getDate, subtractDays } from '@/utils/dateMethod';

export default {
  name: 'calendarList',
  components: {
    calendarSelectDate,
    calendarShowDate,
  },
  props: ['year', 'dateList', 'type', 'clearSelected'],
  data() {
    return {

    };
  },
  computed: {
    currentComponent() {
      return this.type === 'edit' ? calendarSelectDate : calendarShowDate;
    },
  },
  mounted() {
  },
  methods: {
    getDate,
    subtractDays,
    selectRoom(selected, date) {
      this.$emit('getSelectedRoom', date, selected);
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
        const currentOffset = this.subtractDays(currentDate, prevDate);
        left = currentOffset < currentDayIdx ? currentOffset : currentDayIdx;
      }
      if (currentIdx === this.dateList.length - 1) {
        // 最後一個
        right = null;
      } else {
        const nextDate = this.dateList[currentIdx + 1].date;
        const nextDayIdx = this.getDate(nextDate, 'dayIndex');
        const nextOffset = this.subtractDays(nextDate, currentDate);
        if (nextOffset >= (6 - currentDayIdx)) right = 6 - currentDayIdx;
      }

      return { left, right };
    },
  },
};
</script>
