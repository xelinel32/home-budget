<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ GET_INFO.bill | currency('RUB') }}</h4>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!cats.length" class="center">
      Категорий пока нет
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>
    <section v-else>
      <div v-for="cat in cats" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.spend | currency('RUB') }} из {{ cat.limit | currency('RUB') }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import currency from '@/filters/currency';
export default {
  name: 'planning',
  data: () => ({
    loading: true,
    cats: [],
  }),
  filters: { currency },
  async mounted() {
    const records = await this.$store.dispatch('FETCH_RECORDS');
    const catsAll = await this.$store.dispatch('FETCH_CATEGORIES');

    this.cats = catsAll.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === 'outcome')
        .reduce((total, record) => {
          return (total += Number(record.amount));
        }, 0);

      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red';

      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? 'Превышение на' : 'Осталось'
      } ${currency(Math.abs(tooltipValue))}`;
      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      };
    });

    this.loading = false;
  },
  computed: {
    ...mapGetters(['GET_INFO']),
  },
};
</script>
