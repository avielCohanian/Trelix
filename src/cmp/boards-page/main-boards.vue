<template>
  <section class="main-boards">
        <div class="flex viewed">
          <div class="material-icons-outlined icon"> schedule </div>
          <h3 class=""> Recently viewed </h3>
        </div>
        <div>
          <div class="boards-container flex"> 
            <div v-for="board in boards" :key="board._id">
                <div class="card-board  flex pointer" :style="board.style" @click="openBoard(board._id)">
                      <h3 class="card-title "> {{board.title}} </h3>
                      <h3 class="selected-fevorit hover"  :style="isFevorit(board)"> <span class="material-icons-outlined">grade</span> </h3>
                </div>
            </div>
          </div>
        <!-- <div class="flex viewvd" >
          <div class="startIcon"> <span class="material-icons-outlined">grade</span> </div>
          <h3 class=""> Recently viewed </h3>
        </div> -->
          <!-- <div class="board-container-favorit">
              <div class="card-board  flex pointer" :style="board.style" @click="openBoard(board._id)">
                      <h3 class="card-title "> {{board.title}} </h3>
              </div>
          </div> -->
        </div>
  </section>
</template>

<script>
export default {
       props:{
        boards:{ type: Array }
    },
    data(){
        return{
          userConnect:{boards:['b101','b103']}
        }
    },
    methods: {
      openBoard(id){
        console.log(id);
        this.$router.push(`/board/${id}`)
      },
      isFevorit(board){
       return this.userConnect.boards.some(boardId=> board._id === boardId) ? {color:'rgb(184, 134, 11)'} : {color: '#f0ffff6e'}

        
         
        

          
        
      }
    },

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
    }
    .card-title{
      /* width: 100%; */
      height: 18px;
      border-radius: 3px;


    }
     .card-title h3{
       padding: 8px;

     } 
     .selected-fevorit{
       position: absolute;
       bottom: 0;
       right: 0;
       opacity: 0;
       color: rgb(11, 184, 103);
       /* display: none; */
     }
     .selected-fevorit:hover{
       opacity: 1;
     }
      .startIcon:before{
       content: "\e966";
     }
    
     /* .hover :hover{
     } */

</style>