<template>
  <section class="edit-cover">
    <header>
      <h2>{{ header }}</h2>
      <a @click="closeModel" class="el-icon-close"> </a>
    </header>

    <div class="size">
      <h4>Size</h4>
      <div class="size-container">
        <div class="size-card half" @click="size('half')">
          <!-- :style="{ bcg }" -->
          <div class="header"></div>
          <div class="size-body">
            <div class="size-1"></div>
            <div class="size-2"></div>
            <div class="size-3">
              <span class="size-3-1"></span>
              <span class="size-3-1"></span>
            </div>
            <div class="size-4"></div>
          </div>
        </div>

        <div class="size-card full" @click="size('full')">
          <div class="header"></div>
          <div class="size-body">
            <span class="size-1"></span>
            <span class="size-2"></span>
          </div>
        </div>
      </div>
    </div>
    <a class="removeCaver" v-if="card.style && (card.style.bgColor || card.style.bgUrl)" @click="changeBgc(0)"
      >Remove cover</a
    >
    <div class="colors">
      <h4>Colors</h4>
      <ul>
        <li v-for="color in colors" :key="color" v-show="card.style">
          <div
            v-if="card.style.bgColor === color"
            class="color-btn"
            :style="{
              backgroundColor: color,
              boxShadow: '0 0 0 2px #ffffff, 0 0 0 4px #5ba4cf',
            }"
            @click="changeBgc(color)"
          ></div>
          <div v-else class="color-btn" :style="{ backgroundColor: color }" @click="changeBgc(color)"></div>
        </li>
      </ul>
    </div>
    <div class="attachment" v-if="card.attachment.computerAttachment && card.attachment.computerAttachment.length">
      <h4>Attachment</h4>
      <ul>
        <li
          v-for="(att, idx) in attToShow"
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
        <a class="btn" @click="searchImgCmp($event)">Search for photos</a>
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
    header: {
      type: String,
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
    // this.debounce = utilService.debounce(this.searchBy, 1500);
    console.log(this.header, 'a123');
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
    searchImgCmp(e) {
      this.$emit('searchImgCmp', 'photo search', e);
    },
    size(size) {
      size = size === 'full';
      this.$emit('changeBcgSize', size);
    },
    closeModel() {
      this.$emit('closeModel');
    },
  },
  computed: {
    attToShow() {
      let attC = JSON.parse(JSON.stringify(this.card.attachment.computerAttachment));

      return attC;
    },
  },
};
</script>

<style></style>
