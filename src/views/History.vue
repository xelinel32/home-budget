<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!records.length" class="center">
      Записей пока что нет
      <router-link to="/record">Добавить новую запись</router-link>
    </p>
    <section>
      <vHistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import vHistoryTable from '@/components/v-history-table';
export default {
  name: 'history',
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    // this.records = await this.$store.dispatch('FETCH_RECORDS');
    const records = await this.$store.dispatch('FETCH_RECORDS');
    this.categories = await this.$store.dispatch('FETCH_CATEGORIES');
    this.records = records.map((record) => {
      return {
        ...record,
        categoryName: this.categories.find((c) => c.id === record.categoryId)
          .title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      };
    });
    this.loading = false;
  },
  components: {
    vHistoryTable,
  },
};
</script>
