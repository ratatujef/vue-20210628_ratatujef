<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :style="background" @click="checkImageUploaded">
      <span class="image-uploader__text">{{ message }}</span>
      <input
        ref="input"
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="inputHandler($event.target)"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: ['preview', 'uploader'],
  emits: ['select', 'remove', 'upload', 'error'],
  computed: {
    background() {
      return this.preview ? { '--bg-url': `url(${this.preview})` } : '';
    },
    message() {
      if (this.preview) return 'Удалить изображение';
      else return 'Загрузить изображение';
    },
  },
  methods: {
    checkImageUploaded(event) {
      if (this.preview) {
        event.preventDefault();
        this.$emit('remove');
        this.$refs.input.value = '';
      }
    },
    inputHandler(target) {
      this.$emit('select', target.files[0]);
      this.uploader(target.files[0])
        .then((result) => this.$emit('upload', result))
        .catch((error) => this.$emit('error', error));
    },
  },
};
</script>

<style scoped>
.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
