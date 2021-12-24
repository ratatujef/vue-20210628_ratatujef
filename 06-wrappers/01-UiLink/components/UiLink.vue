<template>
  <router-link v-if="isRoute" class="link"><slot /></router-link>
  <component :is="$attrs.tag" v-else class="link"><slot /></component>
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
