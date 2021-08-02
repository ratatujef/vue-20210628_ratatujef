import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',
  props: { count: Number },
  emits: ['update:count'],
  data() {
    return {
      counter: this.count || 0,
    };
  },
  methods: {
    updateCounter() {
      this.$emit('update:count', this.count + 1 || 1);
    },
  },
  template: `<button type="button" 
  @click="updateCounter()"
  >{{count||0}}</button>`,
});
