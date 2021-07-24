import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const app = createApp({
  data() {
    return {
      radio: '',
      title: 'Meetup Title',
    };
  },
  watch: {
    async radio(newValue) {
      const meetup = await fetchMeetupById(newValue);
      this.title = meetup.title;
    },
  },
  methods: {},
}).mount('#app');
