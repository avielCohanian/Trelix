<template>
<section class="cmp-background">
    <div class="menu-header background-header">
                <h3 class="back-menu pointer" @click="back"> 
                <span  class="material-icons-outlined back">arrow_back_ios</span></h3>
                <h2 class="menu-header-txt"> Change background </h2>
                <h3  @click="closeMenu" class="close-menu material-icons-outlined pointer">close </h3>
        </div>
        <hr>
  <div class="bcg-main" v-if="!showCmp" >
    <div class="choice-bcg-up">

    <div class="photos pointer" :style="getImg" @click="changeCmp('choicePhotos')" >
    </div>
    <div class="colors pointer" @click="changeCmp('choiceColors')">
      
    </div>
    </div>
    <hr>
    <h2 class="custom"> Custom </h2>
    <div>
      <h3 class="plus"></h3>
    </div>
  </div>
    <transition name="slide-fade" v-else>  
          <component @click="back" :is="getComponent" :imgs="imgs" @changeBcg="changeBcg"  :colors="colors" ></component>
    </transition>
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
        },
        closeMenu(){
          this.$emit('closeMenu')
        },
        back(){
          console.log(this.openOpt);
          const cmp = this.openOpt ? 'changeBackground' : null
         this.$emit('changeCmp', cmp)
        },

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