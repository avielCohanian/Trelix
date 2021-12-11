<template>
  <section class="main-boards">
        <div class="flex viewvd" v-if="userBoards &&userBoards.boardsStar  && userBoards.boardsStar.length" >
          <h3 ><span class="startIcon"></span> Starred boards </h3>
        </div>
          <div class="boards-container flex" v-if="userBoards &&userBoards.boardsStar && userBoards.boardsStar.length">
            <div v-for="board in userBoards.boardsStar" :key="board._id">
              
              <div class="card-board  flex pointer" :style="board.style" @click="openBoard(board._id)">
                      <h3 class="card-title "> {{board.title}} </h3>
                      <h3 class="selected " @click.stop="changeFavorit(board._id,true)"> <span class="selected"></span> </h3>
              </div>
            </div>
          </div>
           <div class="flex viewed" v-if="userBoards && userBoards.boards &&userBoards.boards.length">
          <div class="material-icons-outlined icon"> schedule </div>
          <h3 class=""> Recently viewed </h3>
        </div>
        <div>
          <div class="boards-container flex"  v-if="userBoards && userBoards.boards &&userBoards.boards.length"> 
            <div v-for="board in userBoards.boards" :key="board._id">
                <div class="card-board  flex pointer" :style="board.style" @click="openBoard(board._id)">
                      <h3 class="card-title "> {{board.title}} </h3>
                      <h3 class="selected-fevorit hover"   @click.stop="changeFavorit(board._id,false)"> <span class="startIcon"></span> </h3>
                </div>
            </div>
          </div>
        <div class="personal-boards flex viewvd" >
          <div class="personal-logo flex-center">
                <h3> p </h3>
          </div>
          <h3 class=""> Personal boards </h3>
        </div>
        <div class="boards-container flex">
             <div class="card-board  flex-center pointer create-new"  @click="CreateBoard">
                      <h3 class="card-title "> Create new board </h3>
            </div>
          </div>
        </div>
         <main-template  />
        <div class="create-board" v-if="iScreateBoard" >
          <create-board @closeCreate="CreateBoard" />
        </div>
  </section>
</template>

<script>
import createBoard from './create-board.vue'
import mainTemplate from './main-template.vue';
export default {
  props:{
    userBoards:{ type: Object },
    },
    data(){
      return{
        iScreateBoard:null,
        }
    },
    created(){
    },
    methods: {
       
      openBoard(id){
        this.$router.push(`/board/${id}`)
      },
      changeFavorit(idBoard,isFavorit){
        this.$emit('changeFavorit',{idBoard,isFavorit})
      },
      CreateBoard(){
        this.iScreateBoard = !this.iScreateBoard
      },
    },
    computed:{
    },
    components:{
      createBoard,
      mainTemplate
    }
}
</script>

<style scoped>

</style>