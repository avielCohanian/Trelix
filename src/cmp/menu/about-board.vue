<template >
    <section class="cmp-about" > 
         <li class="menu-header about-header">
                <h3 class="back-menu" @click="back"> 
                <span  class="material-icons-outlined back">arrow_back_ios</span></h3>
                <h2 class="menu-header-txt"> About this board </h2>
                <h3  @click="closeMenu" class=" close-menu material-icons-outlined">close </h3>
         </li>
         <hr>
         <h2 class="about"><span> Board admins </span></h2>
         <div class="about-name">
             <avatar class="avatar" :size=50 :username="`${board.createdBy.fullname}`" ></avatar>
             <div class="details">
               <h2> {{board.createdBy.fullname}} </h2>
               <h3> {{board.createdBy.mail}} </h3>
             </div>
       </div>
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
//  boardService.getById('b101').then(res=>{ })
}
,methods:{
  closeMenu(){
    this.$emit('closeMenu')
  },
  back(){
    this.$emit('changeCmp',null)
  }
}
,components:{
  Avatar
}
}
</script>

<style>

</style>