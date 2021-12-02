<template>
    <section>
        <div class="group">
            <header>
                <template v-if="!isEditTitle">
                    <h3 @click="isEditTitle = !isEditTitle">
                        {{ group.title }}
                    </h3>
                </template>
                <template v-if="isEditTitle">
                    <el-input
                    class="edit-title"
                        size="mini"
                        v-model="groupToEdit.title"
                        @keyup.enter.native="updateGroup"
                    ></el-input>
                </template>
                <i class="el-icon-more" @click="openModal = !openModal"></i>
            </header>
            <div class="modal" v-if="openModal">
                <div class="title">
                    <span
                        class="material-icons-outlined"
                        @click="openModal = !openModal"
                        >close</span
                    >
                    <!-- <i
                        class="el-icon-close"
                        @click="openModal = !openModal"
                    ></i> -->
                    <i>List actions</i>
                </div>
                <hr />
                <ul>
                    <li>Add card...</li>
                    <li>Copy list...</li>
                    <li>Move list...</li>
                    <li @click="deleteGroup">Archive this list</li>
                </ul>
            </div>
            <Container
                @drop="onDrop"
                :get-ghost-parent="getGhostParent"
                :remove-on-drop-out="true"
                @drop-ready="onDropReady"
            >
                <Draggable v-for="card in cardsToShow" :key="card.id">
                    <div class="draggable-item">
                        <card @click="showEdit(card.id)" :card="card" />
                    </div>
                </Draggable>
            </Container>
            <label for="addCard" @click="toggleCard" v-if="!isAddCard">
                <el-input
                    class="opacity"
                    name="addCard"
                    placeholder="+ Add a card"
                ></el-input>
            </label>
            <label v-if="isAddCard">
                <div class="btn-group">
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="Enter a title for this card... "
                        v-model="newCard.title"
                        @keyup.enter.native="addCard"
                    >
                        ></el-input
                    >

                    <div class="btn-add">
                        <div class="left">
                            <el-button type="primary" @click="addCard">
                                Add card</el-button
                            >
                            <p
                                class="material-icons-outlined left"
                                @click="toggleCard"
                            >
                                close
                            </p>
                        </div>
                        <p class="el-icon-more more"></p>
                    </div>
                </div>
            </label>
        </div>
    </section>
</template>

<script>
import { boardService } from '../service/board.service';
import { Container, Draggable } from 'vue-smooth-dnd';
import { applyDrag, generateItems } from '../service/util.service.js';
import card from './card.vue';

export default {
    components: { card, Container, Draggable },
    props: ['group'],
    name: 'group',
    data() {
        return {
            isEditTitle: false,
            isAddCard: false,
            openModal: false,
            groupToEdit: JSON.parse(JSON.stringify(this.group)),
            newCard: boardService.getEmptyCard(),
            cards: this.group.cards,
            items: generateItems(10, (i) => ({
                id: i,
                data: 'Draggable ' + i,
            })),
        };
    },
    methods: {
        toggleCard() {
            this.isAddCard = !this.isAddCard;
        },
        showEdit(cardId) {
            this.route.push(`/cardDetails/${cardId}`);
        },
        async updateGroup() {
            console.log(this.group);
            this.isEditTitle = !this.isEditTitle;
            try {
                var res = await this.$store.dispatch({
                    type: 'updateGroup',
                    group: this.groupToEdit,
                });
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        },
        async addCard() {
            try {
                console.log(this.newCard);
                var res = await this.$store.dispatch({
                    type: 'addCard',
                    newCard: this.newCard,
                    groupId: this.group.id,
                });
                this.newCard = boardService.getEmptyCard();
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        },
        async deleteGroup() {
            try {
                var res = await this.$store.dispatch({
                    type: 'deleteGroup',
                    groupId: this.group.id,
                });
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        },
        onDrop(dropResult) {
            // console.log(dropResult, 'dropResult');
            this.cards = applyDrag(this.cards, dropResult);
            console.log('drop ready', this.cards);
        },
        getGhostParent() {
            return document.body;
        },
        onDropReady(dropResult) {
            // this.cards.
            // console.log('drop ready', dropResult);
            // console.log('drop ready', this.cards);
        },
    },
    computed: {
        cardsToShow() {
            return this.group.cards;
        },
    },
};
</script>

<style></style>
