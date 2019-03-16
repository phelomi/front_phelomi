<template>
  <div class="date-range">
    <v-layout row wrap class="date-range__pickers">
      <v-flex
        sm12 md6 px-2
        :class="['date-range__picker date-range__pickers--start', smAndDownPaddingTop]"
      >
        <v-text-field
          v-model="formattedStartDate"
          :label="labels.start"
          name="startDate"
          class="date-range__pickers-input"
          prepend-icon="mdi-calendar"
          readonly
          disabled
        />
        <v-date-picker
          :events="highlightRange ? dateRange.dates : events"
          :event-color="highlightRange ? dateRange.colors : eventColor"
          v-model="startDate"
          :min="minDate"
          :max="maxDate"
          locale="zh-Hant"
          no-title
          @change="onDateRangeChange"
        />
      </v-flex>
      <v-flex
        sm12 md6 px-2
        :class="['date-range__picker date-range__picker--end', smAndDownPaddingTop]"
      >
        <v-text-field
          :label="labels.end"
          v-model="formattedEndDate"
          name="endDate"
          class="date-range__pickers-input"
          prepend-icon="mdi-calendar"
          readonly
          disabled
        />
        <v-date-picker
          :min="minDate"
          :max="maxDate"
          :events="highlightRange ? dateRange.dates : events"
          :event-color="highlightRange ? dateRange.colors : eventColor"
          v-model="endDate"
          locale="zh-Hant"
          no-title
          @change="onDateRangeChange"
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { getDate, addDays, getDayRange } from '@/utils/dateMethod';

export default {
  name: 'daterange',
  props: {
    options: {
      type: Object,
      required: true,
    },
    labels: {
      type: Object,
      default() {
        return {
          start: '入住時間',
          end: '退房時間',
        };
      },
    },
    events: {
      type: [Array, Object, Function],
      default: () => null,
    },
    eventColor: {
      type: [String, Function, Object],
      default: 'warning',
    },
    highlightRange: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      minDate: null,
      dateRange: {
        dates: [],
        colors: {},
      },
      highlightColorClasses: 'accent',
    };
  },
  computed: {
    formattedStartDate() {
      return this.startDate ? this.getDate(this.startDate) : '';
    },
    formattedEndDate() {
      return this.endDate ? this.getDate(this.endDate) : '';
    },
    today() {
      return this.getDate();
    },
    maxDate() {
      return this.options.maxDate || this.today;
    },
    smAndDownPaddingTop() {
      return this.$vuetify.breakpoint.smAndDown ? 'pt-3' : '';
    },
  },
  watch: {
    startDate(val) {
      const startDate = this.getDate(val, 'timestamp');
      const endDate = this.getDate(this.endDate, 'timestamp');
      if (endDate - startDate < 0) this.endDate = '';
      this.onDateRangeChange();
    },
    endDate(val) {
      const endDate = this.getDate(val, 'timestamp');
      const startDate = this.getDate(this.startDate, 'timestamp');
      if (endDate - startDate < 0) this.startDate = '';
      this.onDateRangeChange();
    },
    options: {
      handler(val) {
        const {
          endDate, minDate, startDate,
        } = val;
        this.startDate = startDate;
        this.endDate = endDate;
        this.minDate = minDate;
      },
      immediate: true,
    },
  },
  mounted() {
    if (this.highlightRange) this.setInRangeData();
    this.onDateRangeChange();
  },
  methods: {
    getDate,
    addDays,
    getDayRange,
    onDateRangeChange() {
      if (this.highlightRange) this.setInRangeData();
      this.$emit('getSelectedDate', {
        startTime: this.startDate,
        endTime: this.endDate,
      });
    },
    setInRangeData() {
      const inRangeData = {
        dates: [],
        colors: {},
      };

      if (this.highlightRange) {
        const startDate = this.getDate(this.startDate, 'timestamp');
        const endDate = this.getDate(this.endDate, 'timestamp');
        const diffDays = (endDate - startDate) / (1000 * 3600 * 24);

        for (let i = 0; i <= diffDays; i += 1) {
          const date = this.getDate(this.addDays(startDate, i));
          inRangeData.dates.push(date);
          inRangeData.colors[date] = `date-range__date-in-range ${
            this.highlightColorClasses
          }`;

          if (i === 0) inRangeData.colors[date] += ' date-range__range-start';
          if (i === diffDays) { inRangeData.colors[date] += ' date-range__range-end'; }
        }
      }

      this.dateRange = inRangeData;
    },
  },
};
</script>
