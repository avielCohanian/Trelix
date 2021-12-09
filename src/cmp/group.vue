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
          <li>Copy list...</li>
          <li>Move list...</li>
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
          <li @click="dynamicCmp('members')">Members...</li>
          <li @click="dynamicCmp('labels')">Labels...</li>
          <li>Position...</li>
        </ul>
        <div class="dynamic-cmp" v-if="component.currCmp">
          <header>
            <h2>{{ component.name }}</h2>
            <a @click="closeModel" class="el-icon-close"> </a>
          </header>
          <component :is="component.currCmp" :card="newCard" @dynamicCmp="dynamicCmp"> </component>
        </div>
      </div>
      <div class="card-container">
        <!-- class="card-scroll list-group sortable-drag" -->
        <!-- class="card-ghost card-ghost-drop" -->
        <!-- :class="[isActive ? 'card-ghost' :  'sortable-drag' ,'item' , 'card-ghost-drop']" -->
        <!-- draggable=".item" -->
        <!-- animation: 150
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
            <div class="btn-add">
              <div class="left">
                <el-button class="btn" type="primary" @click="addCard"> Add card</el-button>
                <p class="material-icons-outlined left" @click="toggleCard">close</p>
              </div>
              <p class="el-icon-more more" @click="openModalAdd"></p>
            </div>
          </div>
        </label>
      </div>
      <label class="add-card" for="addCard" @click="toggleCard" v-if="!isAddCard">
        <!-- <el-input
                    class="opacity"
                    name="addCard"
                    placeholder="+ Add a card"
                ></el-input> -->
        <p class="add-card-btn"><span class="material-icons-outlined"> add </span> Add a card</p>
      </label>
    </div>
  </section>
</template>

<script>
import member from './edit/edit-member.vue';
import { applyDrag } from '../service/util.service.js';

import label from './edit-label.vue';
import { boardService } from '../service/board.service';
import card from './card.vue';
import { Container, Draggable } from 'vue-smooth-dnd';

export default {
  components: {
    card,
    Draggable,
    Container,
    'card-members': member,
    'card-labels': label,
  },
  props: ['group', 'board'],
  name: 'group',
  data() {
    return {
      // isCardDrop:false,
      title: 'xhr',
      isModalAdd: false,
      isEditTitle: false,
      isAddCard: false,
      openModal: false,
      component: {
        currCmp: null,
        name: '',
      },
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true,
      },

      newCard: boardService.getEmptyCard(),
    };
  },
  methods: {
    async onCardDrop(groupId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const board = Object.assign({}, this.board);
        const group = board.groups.filter((_g) => _g.id === groupId)[0];
        const groupIndex = board.groups.indexOf(group);
        const newGroup = Object.assign({}, group);
        newGroup.cards = applyDrag(newGroup.cards, dropResult);
        board.groups.splice(groupIndex, 1, newGroup);
        await this.$store.dispatch({ type: 'updateBoard', board: JSON.parse(JSON.stringify(board))});
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

    dynamicCmp(cmp) {
      this.component.name = cmp;
      this.component.currCmp = `card-${cmp}`;
    },
    closeModel() {
      this.component.currCmp = null;
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
          // groupId: this.group.id,
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
    getEmptyCard() {
      return this.newCard;
    },
    // cardsToShow() {
    // return this.group.cards
    // },
  },
  watch: {
    isEditTitle() {
      if (this.isEditTitle) {
        this.$refs.input.select();
      } else this.$refs.input.focus();
    },
    // group(val){
    //   this.group = val
    // }
  },
};
</script>

<style>
.card-ghost {
  width: 100%;
  height: 100%;
  /* background-color: brown; */
  transition: transform 0.15s ease;
  transform: rotateZ(8deg);
}
.drop-preview {
  background-color: rgb(218, 218, 218);
  border-radius: 3px;
}

.card-ghost-drop {
  /* background-color: brown; */

  width: 100%;
  height: 100%;
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg);
}
.smooth-dnd-container{
    min-height: 3px;
    min-width: 3px;;
}
</style>
