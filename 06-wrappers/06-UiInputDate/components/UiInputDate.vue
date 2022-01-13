<template>
  <ui-input
    v-bind="$attrs"
    :model-value="updatedValue"
    :type="type"
    @change="$emit('update:modelValue', $event.target.valueAsNumber)"
  >
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',
  components: { UiInput },
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: Number,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    updatedValue() {
      if (!this.modelValue) return '';
      const date = new Date(this.modelValue).toISOString();
      if (this.type === 'date') return date.slice(0, 10);
      if (this.type === 'time')
        return this.$attrs.step && this.$attrs.step % 60 !== 0 ? date.slice(11, 19) : date.slice(11, 16);
      if (this.type === 'datetime-local') return date.slice(0, 16);
      return '';
    },
  },
};
</script>
