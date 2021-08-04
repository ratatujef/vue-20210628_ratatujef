import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupDescription',
  props: {
    description: String,
  },
  template: `<p v-if='description' class="meetup-description">{{description}}</p>`,
});
