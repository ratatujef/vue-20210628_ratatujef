import { createApp } from './vendor/vue.esm-browser.js';

const app = createApp({
  data() {
    return {
      firstNum: 0,
      secondNum: 0,
      func: '',
    };
  },
  computed: {
    summ: function () {
      switch (this.func) {
        case 'sum':
          return this.firstNum + this.secondNum;
        case 'subtract':
          return +this.firstNum - this.secondNum;
        case 'multiply':
          return this.firstNum * this.secondNum;
        case 'divide':
          return this.firstNum / this.secondNum;
        default:
          return 0;
      }
    },
  },
}).mount('#app');
