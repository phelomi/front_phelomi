<template>
  <div class="order-rooms">
    <table>
      <tr>
        <th
          v-for="(item, idx) in titleRow"
          :key="`titleRow${idx}`"
        >{{item}}</th>
      </tr>
      <tr
        v-for="(item, idx) in orderList"
        :key="`orderList${idx}`"
      >
        <td
          v-if="item.haveDate"
          :rowspan="dateRows[item.haveDate].rowspan"
        >{{dateRows[item.haveDate].date}}</td>
        <td>{{item.roomName}}</td>
        <td>{{item.roomPrice}}</td>
        <td>{{item.roomCount}}</td>
        <td>{{item.subTotal}}</td>
      </tr>
      <tr class="sumtotal-row">
        <th colspan="4"></th>
        <th>總計</th>
      </tr>
      <tr>
        <td colspan="4"></td>
        <td>{{currencies(sumTotal)}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { currencies } from '@/utils/calculation';

export default {
  name: 'orderRooms',
  props: ['orderRoomList', 'roomTypeInfo'],
  watch: {
    orderRoomList: {
      handler(val) {
        this.orderList.splice(0);
        this.sumTotal = 0;
        val.forEach((value, key) => {
          let countDateRoomType = 0;
          Object.keys(value).forEach((roomType) => {
            if (value[roomType]) {
              countDateRoomType += 1;
              const list = {};
              list.haveDate = countDateRoomType === 1 ? key : null;
              list.roomName = this.roomTypeInfo[roomType].name;
              list.roomPrice = this.currencies(this.roomTypeInfo[roomType].price);
              list.roomCount = value[roomType];
              list.subTotal = this.currencies(this.calcSubTotal(
                this.roomTypeInfo[roomType].price,
                value[roomType],
              ));
              this.orderList.push(list);
            }
          });
          Object.keys(this.dateRows).forEach((dateKey) => {
            if (Number(dateKey) === key) this.dateRows[dateKey].rowspan = countDateRoomType;
          });
        });
      },
      immediate: true,
    },
  },
  data() {
    return {
      titleRow: ['日期', '房型', '單價', '數量', '小計'],
      orderList: [],
      sumTotal: 0,
    };
  },
  computed: {
    dateRows() {
      const res = {};
      this.orderRoomList.forEach((content, key) => {
        res[key] = {
          date: this.formatNumberDate(key),
          rowspan: 0,
        };
      });
      return res;
    },
  },
  methods: {
    currencies,
    formatNumberDate(numberDate) {
      const stringDate = numberDate.toString();
      const year = stringDate.slice(0, 4);
      const month = stringDate.slice(4, 6);
      const date = stringDate.slice(6, 8);

      return `${year}/${month}/${date}`;
    },
    calcSubTotal(price, unit) {
      const subTotal = price * unit;
      this.sumTotal += subTotal;
      return subTotal;
    },
    methodClearRoom() {
      this.orderList.splice(0);
      this.sumTotal = 0;
    },
  },
};
</script>
