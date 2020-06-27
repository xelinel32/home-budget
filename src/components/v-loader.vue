<template>
  <div class="v-loader">
    <div class="preloader-wrapper offset-s3 active">
      <div class="spinner-layer" :class="color">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-loader',
  computed: {
    color() {
      const colors = [
        'spinner-red-only',
        'spinner-blue-only',
        'spinner-green-only',
      ];
      return colors[Math.floor(Math.random() * 3)];
    },
  },
};
</script>

<style lang="scss">
.v-loader {
  display: flex;
  justify-content: center;
}
</style>
