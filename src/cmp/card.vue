<template>
  <section
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    class="card-preview"
  >
    <div
      v-if="card.style && card.style.isFull === false && card.style.bgColor"
      class="cover-Half"
      :style="bgColorHalf"
      @click.stop="openDetails(true)"
    ></div>
    <div
      class="img-cover-Half"
      v-if="card.style && card.style.isFull === false && card.style.bgUrl"
      :style="bgUrlHalf"
      @click.stop="openDetails(true)"
    ></div>

    <span
      class="material-icons-outlined edit"
      @click.stop="openDetails(false)"
      :style="isShow"
    >
      create
    </span>

    <section
      :style="bgColorFull"
      class="card"
      @click.stop="openDetails(true)"
      :class="{
        'img-cover': card.style && card.style.isFull && card.style.bgUrl,
      }"
    >
      <div class="labels">
        <ul class="labels-container" v-if="myLabels">
          <!-- {{myLabels}} -->
          <li v-for="label in myLabels" :key="label.id">
            <span
              class="label"
              :style="{
                backgroundColor: label.color,
              }"
              :class="{ 'label-text': isLabelText }"
              @click.stop.prevent="toggleLabel"
            >
              <transition name="fade">
                <span class="label-title" v-if="label.title && isLabelText">{{
                  label.title
                }}</span>
              </transition>
            </span>
          </li>
        </ul>
      </div>
      <header class="single" v-if="card.title">
        <p
          :class="{
            white: card.style && card.style.isFull && card.style.bgUrl,
          }"
        >
          {{ card.title }}
        </p>
      </header>

      <!-- labels  -->

      <div class="icons" v-if="isBadgetsExist">
        <!-- dueDate -->
        <div
          class="due-date icon"
          v-if="card.dueDate"
          @mouseover="showCheck = true"
          @mouseleave="showCheck = false"
          @click.stop="isDone"
          :class="{ 'done-card': isCardDone }"
        >
          <span
            v-if="isCardDone && showCheck"
            class="material-icons-outlined icon"
          >
            check_box</span
          >
          <span
            v-if="showCheck && !isCardDone"
            class="material-icons-outlined icon check"
            >crop_din</span
          >
          <span
            v-if="!showCheck"
            class="due-date-icon icon el-icon-time check"
          ></span>
          <span v-if="card.dueDate.date">
            {{ card.dueDate.date | moment("MMM ") }}
            {{ dueDateDay }}</span
          >
        </div>

        <!-- description -->
        <span
          v-if="card.description && card.description.length > 0"
          class="el-icon-s-unfold icon description"
        ></span>

        <!-- attachment -->
        <span
          v-if="
            card.attachment.computerAttachment &&
            card.attachment.computerAttachment.length > 0
          "
          class="el-icon-paperclip icon"
        >
          {{ card.attachment.computerAttachment.length }}</span
        >

        <!-- checklist -->
        <span
          class="checklist icon"
          v-if="card.checklists && card.checklists.length > 0"
          :class="{ 'done-todos': isTodosDone }"
        >
          <span class="material-icons-outlined icon"> check_box</span>
          <span v-if="doneTodosAmount">{{ doneTodosAmount }}</span>
          <span>/</span>
          <span>{{ todosAmount }}</span>
        </span>

        <!-- comments  -->
        <span v-if="card.comments && card.comments.length > 0">
          <span class="el-icon-chat-round icon"></span>{{ card.comment }}</span
        >
      </div>
      <!-- members -->
      <div class="members" v-if="card.members && card.members.length > 0">
        <div v-for="member in card.members" :key="member._id">
          <avatar
            v-if="member.imgUrl"
            :src="member.imgUrl"
            :size="28"
            class="member-img"
          />
          <avatar
            v-else
            :username="member.username"
            :size="28"
            class="member"
          ></avatar>
        </div>
      </div>
    </section>
    <!-- <main>
      <div v-if="isOpenEditor" class="editor" @click="openEditor">
        <p
          class="material-icons-outlined btn-x pointer"
          @click.stop.prevent="openEditor"
        >
          close
        </p>
        <div class="edit-txt" @click.stop>
          <el-input type="textarea" :rows="5" v-model="cardToUpdate.title">
          </el-input>
          <el-button type="primary" @click.stop="openEditor">Save</el-button>
        </div>
        <div class="chose-edit">
          <ul>
            <li @click.stop.prevent="openDetails(card.id)" class="pointer">
              <span class="material-icons-outlined"> branding_watermark </span
              >Open card
            </li>
            <li
              @click.stop="dynamicCmp('labels', 'labels', $event)"
              class="pointer"
            >
              <span class="material-icons-outlined"> sell </span>Edit labels
            </li>
            <li
              @click.stop.prevent="dynamicCmp('members', 'members', $event)"
              class="pointer"
            >
              <span class="material-icons-outlined"> person_outline </span
              >Change members
            </li>
            <li
              @click.stop.prevent="dynamicCmp('cover', 'cover', $event)"
              class="pointer"
            >
              <span class="material-icons-outlined"> branding_watermark </span
              >Change cover
            </li>
            <li class="pointer">
              <span class="material-icons-outlined"> arrow_forward </span>Move
            </li>
            <li class="pointer">
              <span class="material-icons-outlined"> file_copy </span>Copy
            </li>
            <li @click.stop.prevent="dynamicCmp('dates')" class="pointer">
              <span class="material-icons-outlined"> watch_later </span>
              Edit dates
            </li>
            <li @click.stop.prevent="deleteCard" class="pointer">
              <span class="material-icons-outlined"> move_to_inbox </span
              >Archive
            </li>
          </ul>
        </div>
        <div class="dynamic-cmp" v-if="component.currCmp" @click.stop=""
        :style="{ top: component.position.y + 'px', left: component.position.x + 'px' }"
        >
          <header>
            <h2>{{ component.name }}</h2>
            <a @click.stop.prevent="closeModel" class="el-icon-close"> </a>
          </header>
          <component
            :is="component.currCmp"
            :card="card"
            :header="component.header"
            :label="label"
            @closeModel="closeModel"
            @dynamicCmp="dynamicCmp"
            @updateMember="updateMember"
            @changeBcg="changeBcg"
            @updateLabel="updateLabel"
            @addLabel="addLabel('Create label', $event)"
            @editLabel="editLabel"
            @newLabel="newLabel"
            @deleteLabel="deleteLabel"
            @changeBcgSize="changeBcgSize"
             @searchImgCmp="dynamicCmp('coverSearch', 'photo search', $event)"
            @backLabel="dynamicCmp('labels', 'labels', $event)"
          >
          </component>
        </div>
      </div>
    </main> -->
  </section>
</template>

<script>
import { boardService } from "../service/board.service";
import avatar from "vue-avatar";
// import member from "./edit/edit-member.vue";
// import label from "./edit-label.vue";
// import addLabel from './edit/add-label.vue';
// import cover from "./edit/edit-cover.vue";
// import attachment from "./edit/edit-attachment.vue";
// import trelix from "./edit/edit-trelix.vue";
// import coverSearch from './edit/edit-cover-search.vue';


export default {
  name: "card",
  props: { card: null },
  data() {
    return {
      isCardDone: false,
      labels: [],
      showCheck: false,
      isLabelText: false,
      isHover: false,
      isOpenEditor: false,
      cardToUpdate: null,
    //  component: {
    //     currCmp: null,
    //     header: '',
    //     position: { x: '', y: '' },
    //   },
    //   minComponent: {
    //     currCmp: null,
    //     name: '',
    //     txt: '',
    //     type: '',
    //     title: '',
    //     btnTxt: '',
    //     position: { x: '', y: '' },
    //   },
    //   label: { type: '', currLabel: null },
    //   propCmp: this.cmp,
      
    };
  },
  mounted() {},
  created() {
    // if (this.cmp) {
    //   this.dynamicCmp(this.cmp);
    // }
    try {
      this.cardToUpdate = JSON.parse(JSON.stringify(this.card));
      this.labels = this.myLabels;
      if (this.card.style && this.card.style.isFull === false) {
        if (this.card.style.bgUrl) return this.bgUrlHalf;
        else return this.bgColorHalf;
      } else if (this.card.style && this.card.style.isFull) {
        return this.bgColorFull;
      }
    } catch (res) {
      console.log(res);
    }
  },
  methods: {
    // changeBcg(color) {
    //   let card = JSON.parse(JSON.stringify(this.card));

    //   if (card.style.bgUrl !== color && color.length > 15) {
    //     card.style.bgUrl = color;
    //     card.style.bgColor = null;
    //   } else if (card.style.bgColor !== color) {
    //     if (color === card.style.bgColor || color === card.style.bgUrl) {
    //       console.log(color, "aa");
    //       card.style.bgColor = null;
    //       card.style.bgUrl = null;
    //     } else {
    //       card.style.bgColor = color;
    //       card.style.bgUrl = null;
    //     }
    //   } else {
    //     card.style.bgColor = null;
    //     card.style.bgUrl = null;
    //   }
    //   if (!card.style.isFull) card.style.isFull = false;

    //   this.closeModel();
    //   this.$emit("updateCard", card);
    // },
    // changeBcgSize(size) {
    //   let card = JSON.parse(JSON.stringify(this.card));
    //   card.style.isFull = size;
    //   this.$emit("updateCard", card);
    // },
    // isDone(){
    //   this.isCardDone = !this.isCardDone;
    // },
    async isDone() {
      this.isCardDone = !this.isCardDone;
      try {
        var res = await this.$store.dispatch({
          type: "updateDuedate",
          newDone: this.isCardDone,
          card: JSON.parse(JSON.stringify(this.card)),
        });
      } catch (err) {
        console.log(err);
      }
    },
    // async getLabel() {
    //   let { boardId } = this.$route.params;
    //   try {
    //     let labels = await boardService.getLabelByCard(boardId, this.card);
    //     return labels;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    toggleLabel() {
      this.isLabelText = !this.isLabelText;
    },
    // dynamicCmp(cmp, header, e = null) {
    //   console.log(cmp);
    //   console.log(header);
    //   // console.log(this.component);
    //   this.component.currCmp = null;
    //   // console.log( this.minComponent.currCmp);
    //   this.minComponent.currCmp = null;
    //   this.component.position = { x: "", y: "" };
    //   this.component.header =
    //     cmp.name && cmp.name.name ? cmp.name.name : header;

    //   console.log(this.component.header);
    //   this.component.position.x = 450;
    //   if (cmp.pos && (cmp.pos.y || cmp.pos.y === 0)) {
    //     console.log(this.component);
    //     this.component.position.y = cmp.pos.y;
    //   } else this.component.position.y = e.clientY;
    //   this.component.currCmp =
    //     cmp.name && cmp.name.name ? `card-${cmp.name.name}` : `card-${cmp}`;
    // },
    closeModel() {
      this.component.currCmp = null;
    },
    async deleteCard() {
      try {
        var res = await this.$store.dispatch({
          type: "deleteCard",
          card: this.card,
        });
        this.$emit("updateGroup");
        if (res) return this.openEditor();
      } catch (err) {
        console.log(err);
      }
    },
    async updateCard() {
      try {
        var res = await this.$store.dispatch({
          type: "updateCard",
          card: this.cardToUpdate,
        });
        this.$emit("updateGroup");
        if (res) this.openEditor();
      } catch (err) {
        console.log(err);
      }
    },
    //  async updateCard(card) {
    //   try {
    //     if (!card) card = JSON.parse(JSON.stringify(this.card));
    //     console.log(card);
    //     await this.$store.dispatch({
    //       type: 'updateCard',
    //       card,
    //     });
    //     this.cmp.cmp = null;
    //     this.cmp.id = null;
    //     await this.loadCard();
    //     this.$emit('updateCard');
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    openEditor() {
      this.isOpenEditor = !this.isOpenEditor;
    },
    async openDetails(isModal) {
      //TODO: card id
      console.log(isModal);
     await this.$store.commit({ type: 'updateModal', isModal });
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}/${this.card.id}`);
    },
    // updateLabel(label) {
    //   let card = JSON.parse(JSON.stringify(this.card));
    //   if (card.labelIds.some((labelId) => labelId.lId === label.id)) {
    //     const labelIdx = card.labelIds.findIndex(
    //       (labelId) => labelId.id === label.id
    //     );
    //     card.labelIds.splice(labelIdx, 1);
    //   } else {
    //     let currLabel = { lId: label.id, isDone: false };
    //     card.labelIds.push(currLabel);
    //   }
    //   this.$emit("updateCard", card);
    // },
    // addLabel(header, e) {
    //   this.label.type = "add";
    //   this.dynamicCmp("addLabels", header, e);
    // },
    // editLabel({ labelId, e }) {
    //   console.log(labelId);
    //   let label = this.$store.getters.boardLabels;
    //   label = label.find((l) => l.id === labelId);
    //   this.label.currLabel = JSON.parse(JSON.stringify(label));

    //   this.label.type = "edit";
    //   this.dynamicCmp("addLabels", "Change label", e);
    // },
    // deleteLabel(labelId) {
    //   console.log(labelId);
    //   this.$emit("deleteLabel", labelId);
    //   setTimeout(() => {
    //     this.closeModel();
    //   }, 0);
    // },
    // updateMember(currMember) {
    //   let card = JSON.parse(JSON.stringify(this.card));
    //   if (card.members.some((member) => member._id === currMember._id)) {
    //     const labelIdx = card.members.findIndex(
    //       (member) => member._id === currMember._id
    //     );
    //     card.members.splice(labelIdx, 1);
    //   } else {
    //     card.members.push(currMember);
    //   }
    //   this.$emit("updateCard", card);
    // },
    // async newLabel(newLabel) {
    //   this.updateLabel(newLabel);
    //   try {
    //     console.log(newLabel);
    //     await this.$store.dispatch({ type: "addLabel", newLabel });

    //     let card = JSON.parse(JSON.stringify(this.card));

    //     const lIdx = card.labelIds.findIndex((l) => l.id === newLabel.id);
    //     if (lIdx) {
    //       const labelToUpdate = { lId: newLabel.id, isDone: false };
    //       card.labelIds.splice(lIdx, 1, labelToUpdate);
    //       this.$emit("updateCard", card);
    //     }
    //     this.label.currLabel = null;
    //     this.closeModel();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  },
  computed: {
    labelsForDisplay() {
      if (this.card.labelIds) {
        return this.getLabel();
      }
    },
    isBadgetsExist() {
      let badgets = [
        "dueDate",
        "comments",
        "checklists",
        "attachment",
        "checklists",
        "description",
      ];
      return Object.keys(this.card).some((_key) => badgets.includes(_key));
    },
    bgColorHalf() {
      if (this.card.style.bgColor) {
        return { backgroundColor: `${this.card.style.bgColor}` };
      }
    },
    bgUrlHalf() {
      return { backgroundImage: `${this.card.style.bgUrl}` };
    },
    bgColorFull() {
      if (this.card.style && this.card.style.isFull) {
        if (this.card.style.bgColor) {
          return { backgroundColor: `${this.card.style.bgColor}` };
        }
        if (this.card.style.bgUrl) {
          return {
            backgroundImage: `${this.card.style.bgUrl}`,
          };
        }
      }
    },
    dueDateDay() {
      let t = this.card.dueDate.date;
      return new Date(t).getUTCDay() + 1;
    },
    isShow() {
      if (this.isHover) return { opacity: 1 };
      else return { opacity: 0 };
    },
    doneTodosAmount() {
      let doneTodos = 0;
      this.card.checklists.forEach((checklist) => {
        if (checklist.todos && checklist.todos.length) {
          doneTodos += checklist.todos.filter((todo) => todo.isDone).length;
        }
      });
      return doneTodos;
    },
    todosAmount() {
      let todos = 0;
      this.card.checklists.forEach((checklist) => {
        if (checklist.todos) {
          todos += checklist.todos.length;
        }
      });

      return todos;
    },
    isTodosDone() {
      return this.doneTodosAmount === this.todosAmount;
    },
    myLabels() {
      let boardLabels = JSON.parse(
        JSON.stringify(this.$store.getters.boardLabels)
      );
      let carrLabels = [];
      boardLabels.forEach((label) => {
        if (
          this.card.labelIds.some((labelId) => {
            if (labelId.lId === label.id) {
              label.idDone = labelId.isDone;
              return true;
            }
          })
        ) {
          carrLabels.push(label);
        }
      });
      return carrLabels;
    },

    // let { boardId } = this.$route.params;
    //   let labels = await boardService.getLabelByCard(boardId, this.card);
    //   console.log('labels',labels);
    //     return this.labels = labels
    // }
  },
  watch: {
    card(val) {
      this.card = val;
    },
    // '$store.getters.cmpDyn'() {
    //   console.log(this.$store.getters.cmpDyn);
    //   let cmp = JSON.parse(JSON.stringify(this.$store.getters.cmpDyn));
    //   if (cmp) {
    //     cmp.name.type ? this.minDynamicCmp(cmp) : this.dynamicCmp(cmp);
    //   }
    // },
  },
  components: {
    avatar,
    // 'card-attachment': attachment,
    // 'card-trelix': trelix,
    // 'card-members': member,
    // 'card-labels': label,
    // 'card-addLabels': addLabel,
    // 'card-cover': cover,
    // 'card-coverSearch': coverSearch,
  },
};
</script>
