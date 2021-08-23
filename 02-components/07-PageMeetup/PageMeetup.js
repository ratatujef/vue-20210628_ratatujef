import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',
  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },
  props: {
    meetupId: Number,
  },

  data() {
    return {
      currentMeetup: null,
      fetchError: null,
    };
  },
  watch: {
    meetupId(value) {
      this.currentMeetup = null;
      this.fetchError = null;
      fetchMeetupById(value)
        .then((meetup) => (this.currentMeetup = meetup))
        .catch((error) => (this.fetchError = error.message));
    },
  },
  mounted() {
    fetchMeetupById(this.meetupId)
      .then((meetup) => (this.currentMeetup = meetup))
      .catch((error) => (this.fetchError = error.message));
  },
  template: `
    <div class="page-meetup">
      <!-- meetup view -->
    <meetup-view v-if="currentMeetup && !fetchError" :meetup="currentMeetup"/>
      <ui-container v-if="!currentMeetup && !fetchError" >
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="fetchError">
        <ui-alert>{{fetchError}}</ui-alert>
      </ui-container>
    </div>`,
});
