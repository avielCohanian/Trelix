<template>
  <section class="edit-details">
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
  },
};
</script>

<style></style>
