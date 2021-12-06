<template>
  <div class="edit-attachment">
    <ul class="list">
      <li>
        <label class="attachment">
          Computer
          <input type="file" @change="onUploadImg" hidden />
        </label>
      </li>
      <li>
        <label class="attachment" @click="dynamicCmp"> Trelix </label>
      </li>
    </ul>
    <hr />

    <form @submit.prevent="aa">
      <label class="link">Attach a link</label>
      <input type="text" placeholder="Paste any link here..." v-model="link" />

      <label v-if="link" class="optional-link"
        >Link name(optional)
        <input type="text" v-model="linkName" />
      </label>

      <button hidden></button>
    </form>
    <a class="attach-btn">Attach</a>
    <hr />
  </div>
</template>

<script>
import { uploadImg } from '../../service/img.service.js';

export default {
  name: 'attachment',
  data() {
    return {
      link: '',
      linkName: '',
      isLoading: false,
    };
  },
  methods: {
    dynamicCmp() {
      this.$emit('dynamicCmp', 'trelix');
    },
    aa() {
      console.log(this.link);
      console.log(this.linkName);
    },
    async onUploadImg(ev) {
      this.isLoading = true;
      let res = await uploadImg(ev);
      let attachment = {
        name: res.original_filename,
        url: res.url,
        upAt: Date.now(),
      };
      this.$emit('computerAttachment', attachment);
      this.isLoading = false;
    },
  },
};
</script>

<style></style>
