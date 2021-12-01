<template >
<section class="cmp-about" >

  <h2 class="about"> Board admin </h2>
  <div class="about-name">
  <avatar  :size=70 :username="`${board.createdBy.fullname}`" ></avatar>
  {{board.createdBy.fullname}}
  </div>
  {{board.createdBy.mail}}
  <!-- get user email -->
<!-- <pre>
  {{board}}
</pre> -->
    <h2 class="icon-description"> Description </h2>
</section>
</template>

<script>
import Avatar from 'vue-avatar'
import {boardService }from '../../service/board.service.js'
export default {

   props:{
    board:{type:Object}
  },

  
created(){
 

    boardService.getById('b101').then(res=>{
    })
}
,components:{
  Avatar
}
}
</script>

<style>

</style>