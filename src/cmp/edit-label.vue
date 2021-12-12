<template>
  <section>
    <section class="edit-label" @click.stop :style="getStyle" v-if="!isEdit">
      <header>
        <h2>{{ header }}</h2>
        <a @click="closeModel" class="el-icon-close" v-show="!inMenu"> </a>
      </header>

      <input class="search" type="text" placeholder="Search labels..." v-model="filterLabels" />

      <h3 class="labels-title">Labels</h3>
      <ul>
        <li v-for="label in labelsToShow" :key="label.id" @click="updateLabels(label)">
          <div class="label-box">
            <span
              class="label-hover"
              :style="{
                backgroundColor: label.color,
              }"
            ></span>
            <span
              class="label"
              :style="{
                backgroundColor: label.color,
              }"
            >
              <span>
                <span class="label-title" v-if="label.title">{{ label.title }} </span>
              </span>
              <span v-if="card" v-show="cardLabel(label.id)" class="check-title el-icon-check check"></span>
            </span>
          </div>

          <span class="material-icons-outlined icon" @click.stop="editLabel(label)"> edit </span>
        </li>
      </ul>
      <a class="add-label" @click.stop="addLabel($event)"> Create a new label</a>
    </section>
    <section class="add-label" @click.stop v-else>
      <header>
        <h2>{{ header }}</h2>
        <a @click="closeModel" class="el-icon-close" v-show="!inMenu"> </a>
      </header>
      <span class="backIcon material-icons-outlined" @click="backLabel" v-show="!inMenu"> chevron_left </span>
      <h3 class="labels-name">Name</h3>
      <input v-if="!labelToEdit" class="search" type="text" v-model="newLabel.title" />
      <input v-else class="search" type="text" v-model="labelToEdit.title" />
      <h3 class="labels-title">Select a color</h3>
      <ul>
        <li v-for="(color, idx) in colors" :key="idx" @click="chooseColor(color)">
          <div
            v-if="!labelToEdit"
            class="label"
            :style="{
              backgroundColor: color,
            }"
          >
            <span class="material-icons-outlined" v-show="color === newLabel.color" @click="chooseColor(color)">
              check
            </span>
          </div>
          <div
            v-else
            class="label"
            :style="{
              backgroundColor: color,
            }"
          >
            <span class="material-icons-outlined" v-show="color === labelToEdit.color"> check </span>
          </div>
          <!-- <span class="material-icons-outlined" v-show="color === newLabel.color"> check </span> -->
        </li>
        <span class="no-color">
          <h3>No color.</h3>
          <p>This won't show up on the front of cards.</p>
        </span>
      </ul>
      <div class="flex-space">
        <a class="add-label" @click="addLabelEdit">Save</a>
        <a v-if="labelToEdit.type === 'edit' || type === 'edit'" class="delete-label" @click="deleteLabel">Delete</a>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'edit-label',
  props: {
    card: {
      type: Object,
    },
    inMenu: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
    },
  },
  data() {
    return {
      filterLabels: '',
      colors: [
        '#61bd4f',
        '#f2d600',
        '#ff9f1a',
        '#eb5a46',
        '#c377e0',
        '#0079bf',
        '#00c2e0',
        '#51e898',
        '#ff78cb',
        '#344563',
        '#b3bac5',
      ],
      newLabel: { color: '#51e898', title: '' },
      isEdit: false,
      type: 'new',
      labelToEdit: {
        type: 'new',
        color: '',
        title: '',
      },
    };
  },
  created() {
    if (this.labelToEdit) {
      console.log(this.labelToEdit);
    }
  },
  computed: {
    getStyle() {
      return this.inMenu ? { 'max-height': 'fit-content' } : '';
    },
    labelsToShow() {
      let labelToShow = this.$store.getters.boardLabels;
      if (this.card) {
        let currLabels = this.card.labelIds;
        labelToShow.forEach((label) => {
          let switchLabel = currLabels.find((currLabel) => currLabel.id === label.id);
          if (switchLabel) {
            label = switchLabel;
          }
        });
      }
      if (this.filterLabels) {
        const regex = new RegExp(this.filterLabels, 'i');
        labelToShow = labelToShow.filter((label) => regex.test(label.title));
      }
      return labelToShow;
    },
  },
  methods: {
    cardLabel(labelId) {
      let currLabels = this.card.labelIds;
      return currLabels.some((label) => label.lId === labelId);
    },
    updateLabels(label) {
      this.$emit('updateLabel', label);
    },
    addLabel(e) {
      this.isEdit = true;
      this.labelToEdit.type = 'new';
      this.type = 'new';
      // this.$emit('addLabel', 'Create label', e);
    },
    editLabel(label, e) {
      this.isEdit = true;
      this.labelToEdit.type = 'edit';
      this.type = 'edit';
      this.labelToEdit.color = label.color;
      this.labelToEdit.title = label.title;

      // this.$emit('editLabel', { labelId, e });
    },
    closeModel() {
      this.$emit('closeModel');
    },
    addLabelEdit() {
      console.log(this.labelToEdit);
      console.log(this.newLabel);
      if (this.labelToEdit.title) {
        console.log(this.labelToEdit);
        let labelToSave = JSON.parse(JSON.stringify(this.labelToEdit));
        this.$emit('newLabel', labelToSave);
      } else {
        this.$emit('newLabel', this.newLabel);
      }
    },
    deleteLabel(e) {
      if (this.labelToEdit) {
        this.$emit('deleteLabel', this.labelToEdit, e);
      }
    },
    chooseColor(color) {
      if (this.labelToEdit) {
        this.labelToEdit.color = color;
      } else {
        this.newLabel.color = color;
      }
    },
    backLabel(e) {
      this.$emit('backLabel', 'labels', e);
    },
    // closeModel() {
    //   this.$emit('closeModel');
    // },
  },
};
</script>

<style></style>
