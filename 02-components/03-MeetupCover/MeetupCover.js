import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',
  props: {
    image: String,
    title: String,
  },
  computed: {
    background() {
      // return this.image ? `--bg-url: url(${this.image})` : '';
      return this.image ? `--bg-url: url(${this.image})` : '';
    },
  },
  template: `
    <div class="meetup-cover" :style="background">
        <h1 v-if='title' class="meetup-cover__title">{{title}}</h1>
    </div>`,
});
