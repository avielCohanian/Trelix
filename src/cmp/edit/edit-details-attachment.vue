<template>
  <section class="edit-details-attachment">
    <h3>Link name</h3>
    <input type="text" v-model="updateTxt" />
    <a @click="update" class="update">Update</a>
  </section>
</template>

<script>
export default {
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
