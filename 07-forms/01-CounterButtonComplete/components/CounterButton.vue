<template>
  <button @click="$emit('update:count', ++currCount)">{{ currCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currCount: this.count,
    };
  },
  watch: {
    count(newValue) {
      this.currCount = newValue;
    },
  },
};
</script>
