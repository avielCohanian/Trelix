<template>
    <section class="group">
        <div v-for="card in group.cards" :key="card.id">
        <card @click="showEdit(card.id)" :card="card"/>
        </div>
         <label for="add" @click="add" v-if="!isAdd">
      <el-input name="add" placeholder="+ Add a list"></el-input>
    </label>
    <label v-if="isAdd">
      <el-input placeholder="Enter list title..." v-model="newCard.title"></el-input>
      <el-button type="primary" @click="addCard"> Add list</el-button>
      <i class="el-icon-close" @click="add"></i>
    </label>
    </section>
    
</template>

<script>
import { boardService } from '../service/board.service';
import card from './card.vue';

export default {
  components: { card },
  props:['group'],
    name: 'group',
     data() {
    return {
      isAdd: false,
      isAddCardOpen : false,
      newCard: boardService.getEmptyCard()
    };
  },
   methods: {
    add() {
      console.log("click");
      this.isAdd = !this.isAdd;
    },
    showEdit(cardId){
    this.route.push(`/cardDetails/${cardId}`)
    },
   async addCard() {
       try{
           console.log(this.newCard);
           var res = await this.$store.dispatch({type: "addCard", newCard: this.newCard, groupId : this.group.id })
             this.newCard = boardService.getEmptyCard()
           console.log(res);
       }catch(err){
           console.log(err);
       }
    },
    
  },
};
</script>

<style>
.group{
    border: 1px solid black;
}
</style>