<template>
  <section class="edit-cover">
    <div class="size">
      <h4>Size</h4>
      <a class="removeCaver" v-if="card.style.bgColor" @click="changeBgc(null)">Remove cover</a>
    </div>
    <div class="colors">
      <h4>Colors</h4>
      <ul>
        <li v-for="color in colors" :key="color">
          <div
            v-if="card.style.bgColor === color"
            class="color-btn"
            :style="{
              backgroundColor: color,
              boxShadow: '0 0 0 2px #ffffff, 0 0 0 4px #5ba4cf',
            }"
            @click="changeBgc(color)"
          ></div>
          <div
            v-else
            class="color-btn"
            :style="{ backgroundColor: color }"
            @click="changeBgc(color)"
          ></div>
        </li>
      </ul>
    </div>
    <div
      class="attachment"
      v-if="card.attachment.computerAttachment && card.attachment.computerAttachment.length"
    >
      <h4>Attachment</h4>
      <ul>
        <li
          v-for="(att, idx) in card.attachment.computerAttachment"
          :key="idx"
          :style="{ backgroundImage: `url(${att.url})` }"
          @click="changeBgc({ backgroundImage: `url(${att.url})` })"
        ></li>
      </ul>

      <div class="btn-container">
        <a class="btn"> Upload a cover image</a>
      </div>
    </div>
    <div class="unsplash">
      <h4>Unsplash</h4>
      <ul v-if="imgs.length">
        <li
          v-for="(img, idx) in imgs"
          :key="idx"
          :style="img.small"
          class="unsplash-card-img"
          @click="changeBgc(img.full)"
        >
          <!-- <a> {{ img.description }}</a> -->
        </li>
      </ul>
      <div class="btn-container">
        <a class="btn" @click="searchImgCmp">Search for photos</a>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from '../../service/util.service.js';
import { imgService } from '../../service/img.service.js';

export default {
  name: 'cover',
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      colors: [
        '#7BC86C',
        '#F5DD29',
        '#FFAF3F',
        '#EF7564',
        '#CD8DE5',
        '#5BA4CF',
        '#29CCE5',
        '#6DECA9',
        '#FF8ED4',
        '#172B4D',
      ],
      search: 'Wallpapers',
      imgs: [],
    };
  },
  created() {
    this.searchBy();
    this.debounce = utilService.debounce(this.searchBy, 1500);
  },
  methods: {
    changeBgc(newBcg) {
      let res = newBcg;
      if (typeof newBcg === 'object') res = newBcg.backgroundImage;
      this.$emit('changeBcg', res);
    },
    async searchBy() {
      const imgs = await imgService.getImgs(this.search);
      this.imgs = imgs.splice(0, 6);
    },
    isSelect() {
      return 'box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #5ba4cf';
    },
    searchImgCmp() {
      this.$emit('searchImgCmp', 'coverSearch');
    },
  },
  computed: {},
};
</script>

<style></style>
