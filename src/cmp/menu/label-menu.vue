<template>
   <section>
      <div class="menu-header about-header">
         <h3
            class="back-menu pointer material-icons-outlined back"
            @click="back">
            arrow_back_ios
         </h3>
         <h2 class="menu-header-txt">Labels</h2>
         <h3
            @click="closeMenu"
            class="close-menu material-icons-outlined pointer">
            close
         </h3>
      </div>
      <hr />
      <edit-label />
   </section>
</template>

<script>
import editLabel from '../edit-label.vue'
export default {
   methods: {
      closeMenu() {
         this.$emit("closeMenu");
      },
      back() {
         this.$emit("changeCmp", null);
      },
   },
   components: {
      editLabel
   },
};
</script>

<style>
</style>