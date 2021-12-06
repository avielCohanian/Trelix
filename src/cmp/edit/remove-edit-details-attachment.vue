<template>
  <section class="remove-edit-details-attachment">
    <p>Remove this attachment? There is no undo.</p>
    <a class="remove" @click="remove">Remove</a>
  </section>
</template>

<script>
export default {
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
