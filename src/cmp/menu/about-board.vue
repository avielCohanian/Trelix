<template >
    <section class="cmp-about" > 
         <div class="menu-header about-header">
                <h3 class="back-menu" @click="back"> 
                <span  class="material-icons-outlined back">arrow_back_ios</span></h3>
                <h2 class="menu-header-txt"> About this board </h2>
                <h3  @click="closeMenu" class=" close-menu material-icons-outlined">close </h3>
         </div>
         <hr>
         <h2 class="about"><span> Board admins </span></h2>
         <div class="about-name">
             <avatar class="avatar" :size=50 :username="`${board.createdBy.fullname}`" ></avatar>
             <div class="details">
               <h2> {{board.createdBy.fullname}} </h2>
               <h3> {{board.createdBy.mail}} </h3>
             </div>
       </div>
              <div class="description">
                  <header>
                         <h2 class="icon-description"> Description </h2>
                         <a class="edit-btn" v-if="!editDescription" @click="openEditDescription">Edit</a>
                  </header>      
                        <div class="description-container">         
                             <p v-if="!editDescription" @click="openEditDescription">{{ copyBoard.description }}</p>
                             <div v-else class="description-edit"> 
                                  <el-input  type="textarea" :rows="5" placeholder="Add description..."
                                         ref="editInput" v-model="copyBoard.description">
                                  </el-input>
                                 <div class="description-edit-btn">
                                      <a class="close-btn el-icon-close" @click="closeDescription"></a>
                                      <a class="save" @click="saveDescription">Save</a>
                                </div>
                            </div>
                         </div>
               </div>
    </section>
</template>

<script>
import Avatar from 'vue-avatar'
import {boardService }from '../../service/board.service.js'
export default {

   props:{
    board:{type:Object}
  },
  data(){
    return {
        copyBoard: JSON.parse(JSON.stringify(this.board)),
        editDescription:null
    }
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
  },
  openEditDescription() {
            // this.selectInInput();

            this.editDescription = !this.editDescription;
        },
        closeDescription() {
            this.editDescription = false;
        },
        saveDescription() {
            this.card.description = this.description;
            this.editDescription = false;
        },
}
,components:{
  Avatar
}
}
</script>

<style>

</style>