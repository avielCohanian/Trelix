<template >
<section class="cmp-about">

  <h1 class="about"> Board admin </h1>
  <h1>hi</h1>
</section>
</template>

<script>
import {boardService }from '../../service/board.service.js'
export default {
created(){

    boardService.getById('b101').then(res=>{
console.log(res); 
    })
}
}
</script>

<style>

</style>