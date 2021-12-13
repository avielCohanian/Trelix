<template>
  <section class="group-container">
    <div class="group">
      <header>
        <el-input
          ref="input"
          class="edit-title"
          size="mini"
          :class="{ focus: isEditTitle }"
          v-model="group.title"
          @keyup.enter.native="editTitle"
          @click.native="editTitle"
        ></el-input>
        <i class="el-icon-more" @click="openModal = !openModal"></i>
      </header>
      <div class="modal" v-if="openModal">
        <div class="title">
          <span class="material-icons-outlined" @click="openModal = !openModal">close</span>
          <p>List actions</p>
        </div>
        <hr />
        <ul>
          <li @click="openInput">Add card...</li>
          <!-- <li>Copy list...</li> -->
          <!-- <li>Move list...</li> -->
          <li @click="deleteGroup">Archive this list</li>
        </ul>
      </div>

      <div class="modal" v-if="isModalAdd">
        <div class="title">
          <span class="material-icons-outlined" @click="isModalAdd = !isModalAdd">close</span>
          <p>Options</p>
        </div>
        <hr />
        <ul>
          <li @click.stop.prevent="openMember">Members...</li>
          <!-- <li @click="dynamicCmp('labels')">Labels...</li> -->
        </ul>
        <!-- <div class="dynamic-cmp" v-if="component.currCmp">
          <header>
            <h2>{{ component.name }}</h2>
            <a @click="closeModel" class="el-icon-close"> </a>
          </header>
          <component
            :is="component.currCmp"
            :card="newCard"
            @dynamicCmp="dynamicCmp"
          >
          </component>
        </div> -->
      </div>

      <div class="card-container">
        <!-- class="card-scroll list-group sortable-drag"
        class="card-ghost card-ghost-drop"
        :class="[isActive ? 'card-ghost' :  'sortable-drag' ,'item' , 'card-ghost-drop']"
        draggable=".item"
        animation: 150
                    touchStartThreshold: 50 -->

        <Container
          class="hover"
          drag-handle-selector=".card"
          group-name="col"
          @drop="(e) => onCardDrop(group.id, e)"
          :get-child-payload="getCardPayload(group.id)"
          drag-class="card-ghost"
          :drop-placeholder="dropPlaceholderOptions"
        >
          <Draggable class="for" v-for="card in group.cards" :key="card.id">
            <div>
              <card :board="board" :card="card" @click.native="showEdit(card.id)" @updateGroup="loadGroup" />
              <div class="col-3" :value="card" :title="card.title"></div>
            </div>
          </Draggable>
        </Container>
        <div>
          <label v-if="isAddCard">
            <div class="btn-group">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="Enter a title for this card... "
                @keyup.enter.native="addCard"
                v-model="newCard.title"
              >
              </el-input>

              <div class="members" v-if="newCard.members && newCard.members.length > 0">
                <div v-for="member in newCard.members" :key="member._id">
                  <avatar v-if="member.imgUrl" :src="member.imgUrl" :size="28" class="member-img" />
                  <avatar v-else :username="member.username" :size="28" class="member"></avatar>
                </div>
              </div>

              <div class="btn-add">
                <div class="left">
                  <el-button class="btn" type="primary" @click="addCard"> Add card</el-button>
                  <p class="material-icons-outlined left" @click="toggleCard">close</p>
                </div>
                <p class="el-icon-more more" @click="openMember"></p>
              </div>
            </div>
          </label>
        </div>
      </div>
      <label class="add-card" for="addCard" @click="toggleCard" v-if="!isAddCard">
        <p class="add-card-btn"><span class="icon-add icon add-card"> </span> Add a card</p>
      </label>
    </div>

    <section class="add-member" @click.stop v-if="isOpenMember">
      <header>
        <!-- <h2>Members</h2> -->
        <a @click="openMember" class="el-icon-close"> </a>
      </header>

      <h3 class="member-title">Board members</h3>
      <ul class="list-Member">
        <li class="member" v-for="member in membersToShow" :key="member._id" @click="addMember(member)">
          <div class="curr-user">
            <avatar v-if="member.imgUrl" :src="member.imgUrl" :size="32" class="avatar"></avatar>
            <avatar v-else :username="member.fullname" class="avatar" :size="32"></avatar>

            <span class="user">
              <span>{{ member.fullname }}</span>
              <span>({{ member.username }})</span>
            </span>
          </div>

          <span class="check el-icon-check" v-if="cardMembers(member._id)"></span>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
// import member from "./edit/edit-member.vue";
import { applyDrag } from '../service/util.service.js';
import avatar from 'vue-avatar';
// import label from './edit-label.vue';
import { boardService } from '../service/board.service';
import card from './card.vue';
import { Container, Draggable } from 'vue-smooth-dnd';

export default {
  components: {
    avatar,
    card,
    Draggable,
    Container,
  },
  props: ['group', 'board'],
  name: 'group',
  data() {
    return {
      filterMember: '',
      // isCardDrop:false,
      isOpenMember: false,
      title: 'xhr',
      isModalAdd: false,
      isEditTitle: false,
      isAddCard: false,
      openModal: false,

      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true,
      },

      newCard: boardService.getEmptyCard(),
    };
  },
  methods: {
    openMember() {
      this.isOpenMember = !this.isOpenMember;
    },
    cardMembers(memberId) {
      let currMembers = this.newCard.members;
      return currMembers.some((member) => member._id === memberId);
    },
    async onCardDrop(groupId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        console.log(groupId, dropResult);
        const board = Object.assign({}, this.board);
        const group = board.groups.filter((_g) => _g.id === groupId)[0];
        const groupIndex = board.groups.indexOf(group);
        const newGroup = Object.assign({}, group);
        console.log(newGroup);
        newGroup.cards = applyDrag(newGroup.cards, dropResult);
        board.groups.splice(groupIndex, 1, newGroup);
        await this.$store.dispatch({
          type: 'updateBoard',
          board: JSON.parse(JSON.stringify(board)),
        });
      }
    },
    getCardPayload(groupId) {
      return (index) => {
        return this.board.groups.filter((_g) => _g.id === groupId)[0].cards[index];
      };
    },
    endDrug() {
      this.$emit('updateGroupDrug');
    },
    addMember(currMember) {
      if (this.newCard.members.some((member) => member._id === currMember._id)) {
        const labelIdx = this.newCard.members.findIndex((member) => member._id === currMember._id);
        this.newCard.members.splice(labelIdx, 1);
      } else {
        this.newCard.members.push(currMember);
      }

      // let memberToCheek = this.newCard.members.map(
      //   (member) => member._id === currMember._id
      // );
      // if (memberToCheek) {

      //   const idx = this.newCard.members.findIndex(
      //     (member) => member._id === currMember._id
      //   );
      //   this.newCard.members.splice(idx, 1);
      // } else {
      //   this.newCard.members.push(currMember);
      // }
    },
    openModalAdd() {
      this.isModalAdd = !this.isModalAdd;
    },
    openInput() {
      this.openModal = !this.openModal;
      this.toggleCard();
    },
    scroll() {
      var container = this.$el.querySelector('.card-container');
      container.scrollTop = container.scrollHeight;
    },
    toggleCard() {
      this.scroll();
      this.isAddCard = !this.isAddCard;
    },
    showEdit(cardId) {
      const { boardId } = this.$route.params;
      // this.$router.push(`board/${boardId}/${cardId}`);
    },
    editTitle() {
      this.isEditTitle = !this.isEditTitle;
      this.updateGroup(this.group);
    },
    async addCard() {
      if (!this.newCard.title) return;
      try {
        await this.$store.dispatch({
          type: 'addCard',
          newCard: this.newCard,
          groupId: this.group.id,
        });
        this.newCard = boardService.getEmptyCard();
        this.loadGroup();
      } catch (err) {
        console.log(err);
      }
    },
    async deleteGroup() {
      try {
        await this.$store.dispatch({
          type: 'deleteGroup',
        });
        this.loadGroup();
      } catch (err) {
        console.log(err);
      }
    },
    async updateGroup() {
      try {
        await this.$store.dispatch({
          type: 'updateGroup',
          group: this.group,
        });
        this.loadGroup();
      } catch (err) {
        console.log(err);
      }
    },
    loadGroup() {
      this.$emit('updateGroup');
    },
  },
  computed: {
    membersToShow() {
      return this.$store.getters.boardMembers;
    },
    getEmptyCard() {
      return this.newCard;
    },
  },
  watch: {
    isEditTitle() {
      if (this.isEditTitle) {
        this.$refs.input.select();
      } else this.$refs.input.focus();
    },
  },
};
</script>

<style>
.icon-add:before {
  content: '\e901';
}
.add-card {
  font-size: 14px;
}
</style>
