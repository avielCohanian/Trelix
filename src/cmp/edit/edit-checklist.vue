<template>
  <section class="edit-checklist">
    <header>
      <h2>{{ header }}</h2>
      <a @click="closeModel" class="el-icon-close"> </a>
    </header>

    <h4 class="title">Title</h4>

    <input class="checklist-name" type="text" v-model="newChecklist.title" />

    <h4 class="title">Copy items from…</h4>
    <select v-model="card" class="select">
      <option disabled value="">Please select one</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <a class="add-btn" @click="saveChecklist">Add</a>
  </section>
</template>

<script>
import { boardService } from '../../service/board.service.js';

export default {
  name: 'edit-checklist',
  props: {
    card: {
      type: Object,
      required: true,
    },
    header: {
      type: String,
    },
  },
  data() {
    return {
      newChecklist: null,
    };
  },
  created() {
    this.newChecklist = boardService.getEmptyChecklist();
  },
  methods: {
    saveChecklist() {
      this.$emit('addChecklist', this.newChecklist);
      this.newChecklist = boardService.getEmptyChecklist();
    },
    closeModel() {
      this.$emit('closeModel');
    },
  },
  computed: {},
};
</script>

<style></style>
