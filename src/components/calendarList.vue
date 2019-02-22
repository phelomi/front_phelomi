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
        :offset="getOffset(idx,item.date)"
        @selectRoom="selectRoom($event, item.date)"
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
  props: ['year', 'dateList', 'type'],
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
    getOffset(currentIdx, currentDate) {
      if (currentIdx === 0) {
        return this.getDate(currentDate, 'dayIndex');
      }
      const haveOffset = this.subtractDays(this.dateList[currentIdx].date, this.dateList[currentIdx - 1].date);
      return haveOffset || null;
    },
    // calendarDateOffset() {
    //   console.log(this.idx, this.date);
    //   const haveOffset = getDate(this.date, 'dayIndex');
    //   return haveOffset ? `calendar-date--offset-${haveOffset}` : '';
    // },
  },
};
</script>
