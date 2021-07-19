import { createApp } from './vendor/vue.esm-browser.js';

const app = createApp({
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    count() {
      this.counter++;
    },
  },
}).mount('#app');
