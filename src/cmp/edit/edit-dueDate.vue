<template>
  <section class="edit-dueDate">
    <header>
      <h2>{{ header }}</h2>
      <a @click="closeModel" class="el-icon-close"> </a>
    </header>
    <date-picker type="date" @change="setDueDate" v-model="time1" valueType="format"></date-picker>
  </section>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
  name: 'edit-dueDate',
  props: {
    header: {
      type: String,
    },
  },
  data() {
    return {
      time1: null,
    };
  },
  methods: {
    closeModel() {
      this.$emit('closeModel');
    },
    setDueDate() {
      this.$emit();
      console.log(this.time1);
    },
  },

  components: { DatePicker },
};
</script>

<style></style>
