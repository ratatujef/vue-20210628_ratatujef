import { defineComponent } from './vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupDescription from '../02-MeetupDescription/MeetupDescription.js';
import MeetupCover from '../03-MeetupCover/MeetupCover.js';
import MeetupInfo from '../04-MeetupInfo/MeetupInfo.js';
import MeetupAgenda from '../05-MeetupAgenda/MeetupAgenda.js';
import MeetupAgendaItem from '../05-MeetupAgenda/MeetupAgendaItem.js';
export default defineComponent({
  name: 'MeetupView',
  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgenda,
    MeetupAgendaItem,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <!-- meetup cover-->
      <meetup-cover :image="meetup.image" :title="meetup.title"/>
      <ui-container>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <!-- meetup description -->
            <meetup-description :description="meetup.description"/>
            <h3>Программа</h3>
            <!-- meetup agenda -->
            <ui-alert v-if="!meetup.agenda.length">Программа пока пуста...</ui-alert>
            <meetup-agenda v-else :agenda="meetup.agenda"/>
          </div>
          <div class="meetup__aside">
            <!-- meetup info -->
            <meetup-info :organizer="meetup.organizer" 
                          :place="meetup.place" 
                          :date="meetup.date" />
          </div>
        </div>
      </ui-container>
    </div>`,
});
