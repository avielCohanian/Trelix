<template>
  <section class="edit-dueDate">
    <header>
      <h2>{{ header }}</h2>
      <a @click="closeModel" class="el-icon-close"> </a>
    </header>
    <div class="dueDate-container">
      <date-picker
        type="date"
        :open="true"
        :default-value="new Date()"
        :clearable="false"
        :inline="true"
        @change="setDueDate"
        v-model="dueTime"
        valueType="format"
      ></date-picker>

      <div class="dueDate-show">
        <h3>Due date</h3>
        <input class="dueDate-checkbox" type="checkbox" />
        <input class="date dueDate-date" type="text" v-model="dueTime" placeholder="M/D/YYY" />
        <input class="date dueDate-hour" type="text" v-model="dueTime" placeholder="h/mm A" />
      </div>
      <div class="dueDate-reminder">
        <h3>Set due date reminder</h3>
        <select class="dueDate-select">
          <option v-for="(r, idx) in remindOption" :key="idx" value="r">{{ r }}</option>
        </select>
        <p class="dueDate-txt">Reminders will be sent to all members and watchers of this card.</p>
      </div>
      <div class="dueDate-btn">
        <a class="save-btn">Save</a>
        <a class="remove-btn">Remove</a>
      </div>
    </div>
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
      dueTime: null,
      remindOption: [
        'None',
        'At time of due date',
        '5 Minutes before',
        '10 Minutes before',
        '15 Minutes before',
        '1 Hour before',
        '2 Hours before',
        '1 Day before',
        '2 Days before',
      ],
    };
  },
  methods: {
    closeModel() {
      this.$emit('closeModel');
    },
    setDueDate() {
      // this.$emit();
      console.log(this.dueTime);
    },
  },

  components: { DatePicker },
};
</script>

<style></style>
