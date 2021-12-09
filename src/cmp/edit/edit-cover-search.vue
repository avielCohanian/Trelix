<template>
  <section class="edit-cover-search" @click.stop>
    <header>
      <h2>{{ header }}</h2>
      <a @click="closeModel" class="el-icon-close"> </a>
    </header>
    <input type="text" placeholder="Search Unsplash for photos" v-model="search" @input="searchBy" />

    <h4>Suggested searches</h4>
    <ul class="suggestedSearches">
      <li v-for="(s, idx) in suggested" :key="idx">
        <a @click="searchBy(suggest(s))">{{ s }}</a>
      </li>
    </ul>
    <h4>Top photos</h4>
    <ul class="imgs" v-if="imgs && imgs.length">
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
  </section>
</template>

<script>
import { utilService } from '../../service/util.service.js';
import { imgService } from '../../service/img.service.js';
export default {
  name: 'edit-cover-search',
  props: {
    header: {
      type: String,
      // required: true,
    },
  },
  data() {
    return {
      suggested: [
        'Productivity',
        'Perspective',
        'Organization',
        'Colorful',
        'Nature',
        'Business',
        'Minimal',
        'Space',
        'Animals',
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
      this.$emit('changeBcg', newBcg.backgroundImage);
    },
    async suggest(s) {
      this.search = s;
    },
    async searchBy() {
      this.imgs = await imgService.getImgs(this.search);
      this.imgs = imgs.splice(0, 12);
    },
    closeModel() {
      this.$emit('closeModel');
    },
    searchImg() {},
  },
};
</script>

<style></style>
