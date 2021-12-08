<template>
  <section class="edit-dueDate">
    <div class="block">
      <span class="demonstration">With default time</span>
      <el-date-picker v-model="value3" type="datetime" placeholder="Select date and time" default-time="10:00:00">
      </el-date-picker>
    </div>
  </section>
</template>

<script>
export default {
  name: 'edit-dueDate',

  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date());
            },
          },
          {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            },
          },
          {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            },
          },
        ],
      },
      value1: '',
      value2: '',
      value3: '',
    };
  },
};
</script>

<style></style>
