<template>
<section class="cmp-background">
  <div class="bcg-main" v-if="!showCmp" >
    <div class="choice-bcg-up">

    <div class="photos" :style="getImg" @click="changeCmp('choicePhotos')" >
    </div>
    <div class="colors" @click="changeCmp('choiceColors')">
      
    </div>
    </div>
    <hr>
    <h2 class="custom"> Custom </h2>
    <div>
      <h3 class="plus"></h3>
    </div>
  </div>

  <component :is="getComponent" :imgs="imgs" @changeBcg="changeBcg"  :colors="colors" v-else></component>
</section>
</template>

<script>
  import choicePhotos from '../menu/choice-photos.vue'
  import choiceColors from '../menu/choice-colors.vue'
 export default {
  props:{
    board:{
      type:Object
    }
  },
  data(){
    return{
      showCmp:null,
      openOpt:null,
        colors:{},
        imgs:{}
}
},
created(){
  this.loadImgAndColors()
},
methods:{
  loadImgAndColors(){
    this.colors= this.$store.getters.getColors
    this.imgs=this.$store.getters.getImgs
  },
  Openchoice(choice){
    this.openOpt=choice
  },
     changeCmp(cmp){
            this.showCmp = cmp
            this.openOpt =null
        },
        changeBcg(newBcg){
         const coppyBoard= JSON.parse(JSON.stringify(this.board))
         coppyBoard.style =newBcg
         this.$store.dispatch({type:'updateBoard',board:coppyBoard})
         this.$emit('changeBcg')
        }

   },
   computed:{
     getComponent(){
       return this.showCmp
           },
           getImg(){
             console.log(this.imgs.pic2);
          return this.imgs.pic2
       },
             },
components:{
  choicePhotos,
  choiceColors
}
}
</script>

<style>

</style>