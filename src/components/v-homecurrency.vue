<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="currency in currencies" :key="currency">
              <td>{{ currency }}</td>
              <td>{{ rates[currency].toFixed(3) }}</td>
              <td>{{ date | dateFilter }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import dateFilter from '@/filters/dateFilter';
export default {
  name: 'v-homecurrency',
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR'],
  }),
  filters: { dateFilter },
};
</script>
<style lang="scss"></style>
