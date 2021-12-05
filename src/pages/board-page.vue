<template>
    <section class="board-page">
            <nav-boards />
            <main-boards :boards="boards"/>



    </section>
</template>

<script>
import navBoards from '../cmp/boards-page/nav-boards.vue';
import mainBoards from '../cmp/boards-page/main-boards.vue';
import {boardService} from '../service/board.service.js';

export default {
    name: 'boardPage',
    data(){
        return{
            boards:[]
        }
    },
    components:{
        navBoards,
        mainBoards
    },
    created() {
      this.loadBoards()
    },
    methods:{
       async loadBoards(){
           try{
              const boards = await boardService.getBoardsForDisplay()
              this.boards = boards
              console.log(boards);
           }catch(err){
               throw err
           }
        }
    }
};
</script>

<style>
    .board-page{
        padding-top: 80px;
        width: 100vw;
        height: 100vh;
        background-color:#fafbfc;
        display: flex;
    /* align-items: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: center; */
    }
</style>
