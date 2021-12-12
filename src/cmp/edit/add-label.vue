<template>
  <section class="add-label" @click.stop>
    <header>
      <h2>{{ header }}</h2>
      <a @click="closeModel" class="el-icon-close" v-show="!inMenu"> </a>
    </header>
    <span class="backIcon material-icons-outlined" @click="backLabel" v-show="!inMenu"> chevron_left </span>
    <h3 class="labels-name">Name</h3>
    <input v-if="!label.editCurrLabel" class="search" type="text" v-model="newLabel.title" />
    <input v-else class="search" type="text" v-model="label.editCurrLabel.title" />
    <h3 class="labels-title">Select a color</h3>
    <ul>
      <li v-for="(color, idx) in colors" :key="idx" @click="chooseColor(color)">
        <div
          v-if="!label.editCurrLabel"
          class="label"
          :style="{
            backgroundColor: color,
          }"
        >
          <span class="material-icons-outlined" v-show="color === newLabel.color" @click="chooseColor(color)">
            check
          </span>
        </div>
        <div
          v-else
          class="label"
          :style="{
            backgroundColor: color,
          }"
        >
          <span class="material-icons-outlined" v-show="color === label.editCurrLabel.color"> check </span>
        </div>
        <!-- <span class="material-icons-outlined" v-show="color === newLabel.color"> check </span> -->
      </li>
      <span class="no-color">
        <h3>No color.</h3>
        <p>This won't show up on the front of cards.</p>
      </span>
    </ul>
    <div class="flex-space">
      <a class="add-label" @click="addLabel">Save</a>
      <a v-if="label.type === 'edit' || type === 'edit'" class="delete-label" @click="deleteLabel">Delete</a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'add-label',
  props: {
    label: {
      type: Object,
      required: true,
    },
    inMenu: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
    },
    header: {
      type: String,
    },
  },
  data() {
    return {
      colors: [
        '#61bd4f',
        '#f2d600',
        '#ff9f1a',
        '#eb5a46',
        '#c377e0',
        '#0079bf',
        '#00c2e0',
        '#51e898',
        '#ff78cb',
        '#344563',
        '#b3bac5',
      ],
      newLabel: { color: '#51e898', title: '' },
    };
  },
  created() {
    if (this.label.editCurrLabel) {
      console.log(this.label);
    }
  },
  methods: {
    addLabel() {
      console.log(this.label);
      console.log(this.newLabel);
      if (this.label.editCurrLabel) {
        console.log(this.label.editCurrLabel);
        let labelToSave = JSON.parse(JSON.stringify(this.label.editCurrLabel));
        this.$emit('newLabel', labelToSave);
      } else {
        this.$emit('newLabel', this.newLabel);
      }
    },
    deleteLabel(e) {
      if (this.label.editCurrLabel) {
        this.$emit('deleteLabel', this.label.editCurrLabel, e);
      }
    },
    chooseColor(color) {
      if (this.label.editCurrLabel) {
        this.label.editCurrLabel.color = color;
      } else {
        this.newLabel.color = color;
      }
    },
    backLabel(e) {
      this.$emit('backLabel', 'labels', e);
    },
    closeModel() {
      this.$emit('closeModel');
    },
  },
};
</script>

<style></style>
