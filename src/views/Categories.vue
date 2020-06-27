<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <vCreateCat @created="addNewCategory" />
        <vUpdateCat
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @update="updateCategories"
        />
        <p v-else class="center">Категорий нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import vCreateCat from '@/components/v-create-cat';
import vUpdateCat from '@/components/v-update-cat';
export default {
  name: 'categories',
  components: { vCreateCat, vUpdateCat },
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0,
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch('FETCH_CATEGORIES');
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    },
  },
};
</script>
