<template>
    <section class="board-page">
            <nav-boards />
            <main-boards :userBoards="getBoards" @changeFavorit="changeFavorit"/>
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
            userConnect:{},
            boards:{}
        }
    },
    components:{
        navBoards,
        mainBoards
    },
    created() {
            this.$store.dispatch({type:'loadBoards'})
            
    //   this.loadUser()
    },
    methods:{
       async loadUser(){
           try{
            //   await this.$store.dispatch({type:'logIn',userName:'abi@ababmi.com'})
            //   const userConnect = this.$store.getters.getUserConnect
            //   this.userConnect =userConnect
            //   this.$store.getters.getBoardsForDisplay
            //   console.log( this.$store.getters.getBoardsForDisplay);
            // const boards = await boardService.getBoardsForDisplay(this.userConnect)
            //   this.boards = boards
           }catch(err){
               throw err
           }
        },
     
       async changeFavorit(change){
          await  this.$store.dispatch({ type:'changeFavorit',change}) 
            this.$store.dispatch({type:'loadBoards'})

            
        }
    },
    computed:{
        getBoards(){
            console.log(this.$store.getters.getBoardsForDisplay);
            return  this.$store.getters.getBoardsForDisplay
        }
    },
    watch:{
        '$store.getters.getUserConnect'(){
            //   this.$store.dispatch({type:'loadBoards'})
            // this.loadBoards()
        // this. loadUser()
            
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
