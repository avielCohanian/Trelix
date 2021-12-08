<template>
  <section class="edit-details">
    <header>
      <h2>{{ title }}</h2>
      <a @click="closeModel" class="el-icon-close"> </a>
    </header>
    <h3>{{ cmp.txt }}</h3>
    <input type="text" v-model="updateTxt" />
    <a @click="update" class="update">{{ cmp.btnTxt }}</a>
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
    return {
      updateTxt: '',
    };
  },
  methods: {
    update() {
      this.$emit('update', this.updateTxt);
    },
    closeModel() {
      this.$emit('closeModel');
    },
  },
};
</script>

<style></style>
