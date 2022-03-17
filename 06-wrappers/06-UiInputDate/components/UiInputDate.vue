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

  // props: {
  //   modelValue: Number,

  //   type: {
  //     type: String,
  //     default: 'date',
  //     validator: (type) => ['date', 'datetime-local', 'time'].includes(type),
  //   },
  // },

  // emits: ['update:modelValue'],

  // computed: {
  //   value() {
  //     // No value - empty string
  //     if (typeof this.modelValue === 'undefined' || this.modelValue === null) {
  //       return '';
  //     }

  //     // YYYY-MM-DDTHH:MM:SS.mssZ
  //     const date = new Date(this.modelValue).toISOString();

  //     if (this.type === 'date') {
  //       // https://developer.mozilla.org/ru/docs/Web/HTML/Element/Input/date
  //       return date.substring(0, 10); // YYYY-MM-DD
  //     } else if (this.type === 'datetime-local') {
  //       // https://developer.mozilla.org/ru/docs/Web/HTML/Element/Input/datetime-local
  //       return date.substring(0, 16); // YYYY-MM-DDTHH:MM
  //     } else if (this.type === 'time') {
  //       // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time
  //       return this.$attrs['step'] && this.$attrs['step'] % 60 !== 0
  //         ? date.substring(11, 19) // HH:MM:SS
  //         : date.substring(11, 16); // HH:MM
  //     }

  //     // Something wrong - empty string as no value
  //     return '';
  //   },
  // },

  // methods: {
  //   handleInput($event) {
  //     if ($event.target.value === '') {
  //       this.$emit('update:modelValue', null);
  //       return;
  //     }

  //     this.$emit('update:modelValue', $event.target.valueAsNumber);
  //   },
  // },
};
</script>
