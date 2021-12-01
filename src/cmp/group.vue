<template>
    <section>
        <div class="group">
            <header>
                <h4>{{ group.title }}</h4>
                <i class="el-icon-more" @click="openModal = !openModal"></i>
            </header>
            <div class="modal" v-if="openModal">
                <div class="title">
                    <i
                        class="el-icon-close"
                        @click="openModal = !openModal"
                    ></i>
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
                <el-input name="addCard" placeholder="+ Add a card"></el-input>
            </label>
            <label v-if="isAddCard" class="btn-group">
                <div>
                    <el-input
                        placeholder="Enter a title for this card... "
                        v-model="newCard.title"
                    ></el-input>
                    <el-button type="primary" @click="addCard">
                        Add card</el-button
                    >
                    <!-- <font-awesome-icon icon="times" @click="toggleCard" /> -->

                    <i class="el-icon-close" @click="toggleCard"></i>
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
            isAddCard: false,
            openModal: false,
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
