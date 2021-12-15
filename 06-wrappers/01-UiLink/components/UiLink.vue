<template>
  <router-link v-if="isRoute" class="link"><slot /></router-link>
  <a v-else class="link"><slot /></a>
</template>

<script>
export default {
  name: 'UiLink',
  computed: {
    isRoute() {
      return this.$attrs.to;
    },
  },
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
