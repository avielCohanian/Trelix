<template >
   <section class="cmp-about">
      <div class="menu-header about-header">
         <h3
            class="back-menu pointer material-icons-outlined back"
            @click="back">
            arrow_back_ios
         </h3>
         <h2 class="menu-header-txt">About this board</h2>
         <h3
            @click="closeMenu"
            class="close-menu material-icons-outlined pointer">
            close
         </h3>
      </div>
      <hr />
      <h2 class="about"><span> Board admins </span></h2>
      <div class="about-name">
         <avatar
         v-if="board.createdBy.imgUrl"
            class="avatar"
            :size="50"
            :src="`${board.createdBy.imgUrl}`"
         ></avatar>
         <avatar
         v-else
            class="avatar"
            :size="50"
            :username="`${board.createdBy.fullname}`"
         ></avatar>
         <div class="details">
            <h2>{{ board.createdBy.fullname }}</h2>
            <h3>{{ board.createdBy.email }}</h3>
         </div>
      </div>
      <div class="description">
         <header>
            <div><h2><span class="icon-description"></span> Description </h2> </div>
            <a
               class="edit-btn"
               v-if="!editDescription"
               @click="openEditDescription"
               >Edit</a>
         </header>
         <div class="description-container">
            <p v-if="!editDescription" @click="openEditDescription">
               {{ copyBoard.description }}
            </p>
            <div v-else class="description-edit">
               <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="It’s your board’s time to shine! Let people know what this board is used for and what they can expect to see."
                  ref="editInput"
                  v-model="copyBoard.description">
               </el-input>
               <div class="description-edit-btn">
                  <a
                     class="close-btn el-icon-close"
                     @click="closeDescription"
                  ></a>
                  <a class="save" @click="saveDescription">Save</a>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>

<script>
import Avatar from "vue-avatar";
import { boardService } from "../../service/board.service.js";
export default {
   props: {
      board: { type: Object },
   },
   data() {
      return {
         copyBoard: JSON.parse(JSON.stringify(this.board)),
         editDescription: null,
      };
   },
   created() {
      //  boardService.getById('b101').then(res=>{ })
   },
   methods: {
      closeMenu() {
         this.$emit("closeMenu");
      },
      back() {
         this.$emit("changeCmp", null);
      },
      openEditDescription() {
         // this.selectInInput();

         this.editDescription = !this.editDescription;
      },
      closeDescription() {
         this.editDescription = false;
      },
      saveDescription() {
         this.$store.dispatch({ type: "updateBoard", board: this.copyBoard });
         this.editDescription = false;
      },
   },
   components: {
      Avatar,
   },
};
</script>

<style>
</style>