<template>
  <div :class="componentClasses">
    <div v-if="$slots['left-icon']" class="input-group__icon input-group_icon-left">
      <slot name="left-icon" />
    </div>

    <component
      :is="inputType"
      :ref="inputType"
      :value="modelValue"
      :class="inputClasses"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <!-- почему-то через v-model + proxy не работает cм комменты (( 
      <component
      :is="inputType"
      :ref="inputType"
      v-model="modelValueProxy"
      :class="inputClasses"
    /> -->
    <div v-if="$slots['right-icon']" class="input-group__icon input-group_icon-right">
      <slot name="right-icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiInput',
  inheritAttrs: false,
  props: {
    small: Boolean,
    rounded: Boolean,
    multiline: Boolean,
    modelValue: String,
  },
  emits: ['update:modelValue'],
  computed: {
    // modelValueProxy: {
    //   get() {
    //     return this.modelValue;
    //   },
    //   set(value) {
    //     this.$emit('update:modelValue', value);
    //   },
    // },
    inputType() {
      return this.multiline ? 'textarea' : 'input';
    },
    inputClasses() {
      return {
        'form-control_sm': this.small,
        'form-control_rounded': this.rounded,
        'form-control': true,
      };
    },
    componentClasses() {
      return {
        'input-group': true,
        'input-group_icon': this.$slots['right-icon'] || this.$slots['left-icon'],
        'input-group_icon-right': this.$slots['right-icon'],
        'input-group_icon-left': this.$slots['left-icon'],
      };
    },
  },
  methods: {
    focus() {
      this.$refs[this.inputType].focus();
    },
  },
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s border-color;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon-left .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon-right .form-control {
  padding-right: 50px;
}

.input-group.input-group_icon .input-group__icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .input-group__icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .input-group__icon:last-child {
  right: 16px;
}
</style>
