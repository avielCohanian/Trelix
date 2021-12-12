<template>
  <section>
    <section class="edit-cover" @click.stop v-if="!isEdit">
      <header>
        <h2>{{ header }}</h2>
        <a @click="closeModel" class="el-icon-close"> </a>
      </header>

      <div class="size">
        <h4>Size</h4>
        <div class="size-container">
          <div class="size-card half" @click="size('half')" v-if="!card.style.isFull" :style="isSelect">
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
          <div v-else class="size-card half" @click="size('half')">
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

          <span class="style" v-if="card.style.isFull" :style="isSelect">
            <div class="size-card full" @click="size('full')">
              <div class="header"></div>
              <div class="size-body">
                <span class="size-1"></span>
                <span class="size-2"></span>
              </div>
            </div>
          </span>
          <span class="style" v-else>
            <div class="size-card full" @click="size('full')">
              <div class="header"></div>
              <div class="size-body">
                <span class="size-1"></span>
                <span class="size-2"></span>
              </div>
            </div>
          </span>
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
            :style="{ backgroundImage: `url(${att.url})`, isSelect }"
            @click="changeBgc({ backgroundImage: `url(${att.url})` })"
          >
            <span></span>
          </li>
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
          ></li>
        </ul>
        <div class="btn-container">
          <a class="btn" @click="searchImgCmp($event)">Search for photos</a>
        </div>
      </div>
    </section>
    <section class="edit-cover-search" @click.stop v-else>
      <header>
        <h2>{{ header }}</h2>
        <a @click="closeModel" class="el-icon-close"> </a>
      </header>
      <input type="text" placeholder="Search Unsplash for photos" v-model="search" @input="searchByEdit" />

      <h4>Suggested searches</h4>
      <ul class="suggestedSearches">
        <li v-for="(s, idx) in suggested" :key="idx">
          <a @click="searchByEdit(s)">{{ s }}</a>
        </li>
      </ul>
      <h4>Top photos</h4>
      <ul class="imgs" v-if="imgs.length">
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
      imgsSearch: [],
      isEdit: false,
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
    searchImgCmp(e) {
      this.isEdit = true;
      this.debounce = utilService.debounce(this.searchByEdit, 1500);
      this.searchByEdit();
      // this.$emit('searchImgCmp', 'photo search', e);
    },
    size(size) {
      size = size === 'full';
      this.$emit('changeBcgSize', size);
    },
    closeModel() {
      this.$emit('closeModel');
    },

    async suggest(s) {
      this.search = s;
    },
    async searchByEdit(s) {
      if (s) {
        this.search = s;
      }
      let imgs = await imgService.getImgs(this.search);
      this.imgs = imgs.splice(0, 12);
      // this.imgs = imgsSearch.splice(0, 12);

      // let imgsSearch = await imgService.getImgs(this.search);
    },
    // closeModel() {
    //   this.$emit('closeModel');
    // },
    searchImg() {},
  },

  computed: {
    isSelect() {
      return { boxShadow: '0 0 0 2px #ffffff, 0 0 0 4px #5ba4cf' };
    },
    attToShow() {
      let attC = JSON.parse(JSON.stringify(this.card.attachment.computerAttachment));
      return attC.filter((att) => att.url);
    },
  },
};
</script>

<style></style>
