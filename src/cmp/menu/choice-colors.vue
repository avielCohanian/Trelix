<template>
<section class="cmp-colors">
  <div class="bcg-choice" >
    <ul>
      <li v-for="(color,idx) in colors" :key="idx" :style="color" class="card-color" @click="changeBgc(color)">
      </li>
    </ul>
  </div>

</section>
</template>

<script>
export default {
  data(){
    return {

    }
  },
    
   props:{
    colors:{type:Object}

  },
methods:{
  changeBgc(newBcg){
 this.$emit('changeBcg',newBcg)
}
}
}

</script>

<style>

</style>