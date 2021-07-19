import { createApp } from './vendor/vue.esm-browser.js';

const app = createApp({
  data() {
    return {
      total: 0,
      firstNum: 0,
      secondNum: 0,
      func: '',
    };
  },
  updated() {
    this.calculate();
  },
  methods: {
    calculate() {
      switch (this.func) {
        case 'sum':
          this.total = this.firstNum + this.secondNum;
          break;
        case 'subtract':
          this.total = +this.firstNum - this.secondNum;
          break;
        case 'multiply':
          this.total = this.firstNum * this.secondNum;
          break;
        case 'divide':
          this.total = this.firstNum / this.secondNum;
          break;
      }
    },
  },
}).mount('#app');
// Создайте Vue приложение
