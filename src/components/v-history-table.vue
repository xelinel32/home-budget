<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, i) in records" :key="record.id">
        <td>{{ i }}</td>
        <td>{{ record.amount | currency('RUB') }}</td>
        <td>{{ record.data | dateFilter }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <button
            class="btn-small btn"
            v-tooltip="'Посмотреть'"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import currency from '@/filters/currency';
import dateFilter from '@/filters/dateFilter';
export default {
  name: 'v-history-table',
  props: {
    records: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  filters: { currency, dateFilter },
};
</script>

<style></style>
