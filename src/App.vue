<template>
    <div id="app">
        <app-header v-if="createdBy" :createdBy="createdBy"/>
        <router-view class="main-layout"></router-view>

        <!-- <router-view /> -->
    </div>
</template>

<script>
import appHeader from '../src/cmp/app-header';

export default {
    
   async created(){
        try{
           await this.loadBoard()
        }catch(err){
            console.log(err);
        }
    },
    components: {
        appHeader,
    },
    computed:{
        createdBy(){
  var board =this.$store.getters.getBoard
  if(board) return board.createdBy
        }
    },
    methods:{
   async loadBoard(boardId='b101'){
        try {
           var res = await this.$store.dispatch({ type: 'loadBoard', boardId })
           console.log(res);
        } catch (err) {
            console.log(err);
        }
}
    },
};
</script>
