<template>
<section class="cmp-background">
  <div class="bcg-main" v-if="!showCmp">
    <div class="choice-bcg-up">

    <div class="photos" @click=" changeCmp('choicePhotos')">
      Photos
    </div>
    <div class="colors"  @click=" changeCmp('choiceColors')">
      
    </div>
    </div>
    <hr>
    <h2 class="custom"> Custom </h2>
    <div>
      <h3 class="plus"></h3>
    </div>
  </div>

  <component :is="getComponent" :photos="photos" @changeBcg="changeBcg"  :colors="colors" v-else></component>
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
      OpenchoiceColor:null,
      OpenchoicePhotos:null,
        colors:{
            orange:{background:'rgb(210, 144, 52)'},
            blue:{background:'rgb(0, 121, 191)'},
            red:{background:'rgb(176, 70, 50)'},
            green:{background:'rgb(81, 152, 57)'},
            pink:{background:'rgb(205, 90, 145)'},
            purple:{background:'rgb(137, 96, 158)'},
            blueLight:{background:'rgb(0, 174, 204)'},
            greenLight:{background:'rgb(75, 191, 107)'},
            gray:{background:'rgb(131, 140, 145)'}
        },
        photos:{}
}
},
methods:{
  Openchoice(choice){
    this.openOpt=choice
  },
     changeCmp(cmp){
       console.log(cmp);
            this.showCmp = cmp
            this.openOpt =null
        },
        changeBcg(newBcg){
         const coppyBoard= JSON.parse(JSON.stringify(this.board))
         coppyBoard.style =newBcg
         this.$store.dispatch({type:'updateBoard',board:coppyBoard})
        }

   },
   computed:{
     getComponent(){
       return this.showCmp
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