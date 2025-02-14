<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown v-model="localItem.type" title="Тип" :options="$options.agendaItemTypeOptions" name="type" />
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input v-model="localItem.startsAt" type="time" placeholder="00:00" name="startsAt" @change="updateItem" />
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input v-model="localItem.endsAt" type="time" placeholder="00:00" name="endsAt" @change="updateItem" />
        </ui-form-group>
      </div>
    </div>

    <ui-form-group v-if="isTalk || isOther" :label="title">
      <ui-input v-model="localItem.title" name="title" @change="updateItem" />
    </ui-form-group>
    <ui-form-group v-if="isTalk" label="Докладчик">
      <ui-input v-model="localItem.speaker" name="speaker" @change="updateItem" />
    </ui-form-group>
    <ui-form-group v-if="isTalk || isOther" label="Описание">
      <ui-input v-model="localItem.description" multiline name="description" @change="updateItem" />
    </ui-form-group>
    <ui-form-group v-if="localItem.type === 'talk'" label="Язык">
      <ui-dropdown
        v-model="localItem.language"
        title="Язык"
        :options="$options.talkLanguageOptions"
        name="language"
        @change="updateItem"
      />
    </ui-form-group>
    <ui-form-group v-if="!isTalk && !isOther" label="Нестандартный текст (необязательно)">
      <ui-input v-model="localItem.title" name="title" @change="updateItem" />
    </ui-form-group>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  agendaItemTypeOptions,
  talkLanguageOptions,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  emits: ['remove', 'update:agendaItem'],
  data() {
    return {
      localItem: Object.assign({}, this.agendaItem),
      starts: this.agendaItem.startsAt,
    };
  },
  computed: {
    isTalk() {
      return this.localItem.type === 'talk';
    },
    isOther() {
      return this.localItem.type === 'other';
    },
    title() {
      return this.isTalk ? 'Тема' : 'Заголовок';
    },
  },
  watch: {
    'localItem.startsAt'(newValue, oldValue) {
      if (!/([0-1]\d|2[0-3]):[0-5]\d/.test(newValue)) {
        return;
      }
      // Разделяем время на часы и минуты и переводим в минуты
      const timeToMinutes = (time) => {
        const [h, m] = time.split(':').map((x) => parseInt(x, 10));
        return h * 60 + m;
      };
      const newMinutes = timeToMinutes(newValue);
      const oldMinutes = timeToMinutes(oldValue);
      const oldEndsAtMinutes = timeToMinutes(this.localItem.endsAt);
      // Считаем изменение времени в минутах
      const deltaMinutes = newMinutes - oldMinutes;
      // Считаем новое значение
      const newEndsAtMinutes = (oldEndsAtMinutes + deltaMinutes + 24 * 60) % (24 * 60);
      // Пересчитываем обратно в часы и минуты
      const hours = Math.floor(newEndsAtMinutes / 60)
        .toString()
        .padStart(2, '0');
      const minutes = Math.floor(newEndsAtMinutes % 60)
        .toString()
        .padStart(2, '0');
      this.localItem.endsAt = `${hours}:${minutes}`;
    },
  },
  methods: {
    updateItem() {
      this.$emit('update:agendaItem', this.localItem);
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
