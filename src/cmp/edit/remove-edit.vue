<template>
  <section class="remove-edit-details-attachment">
    <header>
      <h2>{{ title }}</h2>
      <a @click="closeModel" class="el-icon-close"> </a>
    </header>
    <p>{{ cmp.txt }}</p>
    <a class="remove" @click="remove">{{ cmp.btnTxt }}</a>
  </section>
</template>

<script>
export default {
  props: {
    cmp: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    remove() {
      this.$emit('cmpRemove');
    },
    closeModel() {
      this.$emit('closeModel');
    },
  },
};
</script>

<style></style>
