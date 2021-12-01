<template>
<section class="cmp-img">

  <div class="bcg-choice" >
    <ul >
      <li v-for="(img,idx) in imgs" :key="idx" :style="img" class="card-img" @click="changeBgc(img)">
      </li>
    </ul>
  </div>

</section>
</template>

<script>
export default {
  props:{
    imgs:{
      type:Object
    }
  },
 

methods:{
  changeBgc(newBcg){
    console.log(newBcg);
 this.$emit('changeBcg',newBcg)
  }
}, 
components:{
}
}
</script>

<style>

</style>