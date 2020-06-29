<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? 'Доход' : 'Расход' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>{{ record.description }}</p>
              <p>{{ record.amount | currency }}</p>
              <p>{{ record.categoryName }}</p>
              <small>{{ record.data | dateFilter }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Такой записи нет</p>
  </div>
</template>

<script>
import currency from '@/filters/currency';
import dateFilter from '@/filters/dateFilter';
export default {
  name: 'detail',
  filters: { currency, dateFilter },
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch('FETCH_RECORD_BY_ID', id);
    const category = await this.$store.dispatch(
      'FETCH_CATEGORY_BY_ID',
      record.categoryId
    );
    this.record = {
      ...record,
      categoryName: category.title,
    };
    this.loading = false;
  },
};
</script>
