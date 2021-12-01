<template>
    <section>
        <div class="group">
            <h4>{{ group.title }}</h4>
            <div v-for="card in group.cards" :key="card.id">
                <card @click="showEdit(card.id)" :card="card" />
            </div>

            <label for="addCard" @click="toggleCard" v-if="!isAddCard">
                <el-input name="addCard" placeholder="+ Add a card"></el-input>
            </label>

            <label v-if="isAddCard" class="btn-group">
                <div >
                <el-input
                    placeholder="Enter a title for this card... "
                    v-model="newCard.title"
                ></el-input>
                <el-button type="primary" @click="addCard"> Add card</el-button>
                <!-- <font-awesome-icon icon="times" @click="toggleCard" /> -->
              
                <i class="el-icon-close" @click="toggleCard"></i>
            </div>
            </label>
        </div>

      
    </section>
</template>

<script>
import { boardService } from '../service/board.service';
import card from './card.vue';

export default {
    components: { card },
    props: ['group'],
    name: 'group',
    data() {
        return {
            isAddCard: false,
           
            newCard: boardService.getEmptyCard(),
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
        
    },
};
</script>

<style>

</style>
