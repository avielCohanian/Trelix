<template>
  <section class="remove-edit-details-attachment">
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
  },
  data() {
    return {};
  },
  methods: {
    remove() {
      this.$emit('remove');
    },
  },
};
</script>

<style></style>
