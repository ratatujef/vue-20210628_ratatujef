<template>
  <div class="toasts">
    <div
      v-for="msg in messages"
      :key="msg"
      :class="{
        toast: true,
        toast_success: msg.succes,
        toast_error: msg.error,
      }"
    >
      <ui-icon v-if="msg.success" class="toast__icon" icon="check-circle" />
      <ui-icon v-if="msg.error" class="toast__icon" icon="alert-circle" />
      <span> {{ msg.msg }} </span>
    </div>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'TheToaster',
  components: { UiIcon },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    addMessage(msg, type) {
      const index = this.messages.push({ msg, [type]: true });
      // setTimeout(() => {
      //   this.messages.splice(index - 1, 1);
      // }, 1000);
    },
    success(msg) {
      this.addMessage(msg, 'success');
    },
    error(msg) {
      this.addMessage(msg, 'error');
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
