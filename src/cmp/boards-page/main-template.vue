<template>
  <section class="template-boards main-boards" >
         <div class="flex viewed" >
          <span class="material-icons-outlined icon">published_with_changes</span>
          <h3> Popular template </h3>
        </div>
        <div>
          <div class="boards-container flex"  v-if=" templateBoards && templateBoards.length"> 
              <div v-for=" temp in getTempS" :key="temp._id">
                  <div class="card-board  flex pointer" :style="temp.style" @click="createBoardTemp(temp)">
                        <h3 class="card-title "> {{temp.title}} </h3>
                  </div>
              </div>
            </div>
          </div>
  </section>
</template>

<script>
import {boardService} from '../../service/board.service.js'
export default {
  props:{
    },
    data(){
      return{
        templateBoards:[]
      }
       
    },
    created(){
      this.getTemplate()
    },
    methods: {
      async getTemplate(){
        this.templateBoards =  await boardService.getTemplates()
      },
      openBoard(id){
        this.$router.push(`/board/${id}`)
      },
      async createBoardTemp(temp){
        const copyUser = JSON.parse(JSON.stringify(this.$store.getters.getUserConnect));
          try{
            const newBoard = await boardService.createBoardTemp(temp,copyUser)
             copyUser.boards.boards.push(newBoard._id);
              this.$store.dispatch({ type: 'updateUser', currUser: copyUser });
              this.$router.push(`/board/${newBoard._id}`);
          }catch(err){
            throw err
          }
      },
    },
    computed:{
      getTempS(){
        return this.templateBoards
      }
    },
    components:{
    }
}
</script>

<style scoped>

</style>