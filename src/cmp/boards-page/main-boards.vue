<template>
  <section class="main-boards">
        <div class="flex viewvd" v-if="userBoards &&userBoards.boardsStar  && userBoards.boardsStar.length" >
          <h3 class="startIcon"> Recently viewed </h3>
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
                      <h3 class="selected-fevorit hover"  :style="isFevorit(board)" @click.stop="changeFavorit(board._id,false)"> <span class="startIcon"></span> </h3>
                      
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
            <!-- <div v-for="board in userBoards.boardsStar" :key="board._id">
              <div class="card-board  flex pointer" :style="board.style" @click="openBoard(board._id)">
                      <h3 class="card-title "> {{board.title}} </h3>
                      <h3 class="selected-fevorit hover"  :style="isFevorit(board)"> <span class="startIcon"></span> </h3>
              </div>
            </div> -->
             <div class="card-board  flex-center pointer create-new"  @click="openBoard">
                      <h3 class="card-title "> Create new board </h3>
            </div>
          </div>
        </div>

  </section>
</template>

<script>
export default {
       props:{
        userBoards:{ type: Object }
    },
    data(){
        return{
          userConnect:{boards:['b101','b103'] ,starBoard:['b102']}
        }
    },
    created(){
        console.log(this.userBoards);
    },
    methods: {
      openBoard(id){
        this.$router.push(`/board/${id}`)
      },
      getBoards(){
        boards.map
      },
      isFevorit(board){
       return this.userConnect.boards.some(boardId=> board._id === boardId) ? {color:'rgb(184, 134, 11)'} : {color: '#f0ffff6e'}
      },
      changeFavorit(idBoard,isFavorit){
        this.$emit('changeFavorit',{idBoard,isFavorit})
      }
    },
    computed:{
    }

}
</script>

<style scoped>
.boards-container{
  gap: 10px;
}
    .main-boards{
        width: 85vw;
        max-width:820px ;
        padding: 15px;
    }
    .viewed{
      width: 100%;
  
    }
    .icon{
      margin-right: 5px;
    }
    .card-board{
      position: relative;
      width: 194px;
      height: 96px;
      border-radius: 4px;
      background-size: cover;
    background-repeat: no-repeat;
    margin: 0 16px 32px 0;
    }
    .card-title{
      /* width: 100%; */
      height: 18px;
      border-radius: 3px;


    }
     h3.card-title {
       padding-left: 8px;
            color: #fff;
        line-height: 20px;
     } 
     .selected-fevorit{
       position: absolute;
       bottom: 0;
       right: 0;
       opacity: 0;
       color: rgb(11, 184, 103);
     }
     .selected::before{
       content: '\e967';
       position: absolute;
       bottom: 10px;
       right: 10px;
       color: #f3d624;
     }
     .selected-fevorit:hover{
       opacity: 1;
     }
      .startIcon:before{
       content: "\e966";
     }
    
      /* .personal-boards{
            background: linear-gradient(#b22865, #cd5a91);
      } */
      .personal-logo{
        width: 32px;
        height: 32px;
        background: linear-gradient(#b22865, #cd5a91);
        border-radius: 2px;
        align-items: center;
      }
      .personal-logo h3{
        margin: 0;
        padding: 0;
        padding-bottom: 4px;
      }
      .create-new{
        background-color: #7c2c290a;
      }
      .create-new h3{
        color: #172b4d;
        font-weight: 400;

      }
     /* .hover :hover::before{
       content: "\e966";

     } */

</style>