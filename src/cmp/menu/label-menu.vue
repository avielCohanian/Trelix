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
      <edit-label v-if="!isEdit"  @editLabel="editLabel" @addLabel="addLabel" :inMenu="true"/>
      <add-label v-else   :label="label" @deleteLabel="deleteLabel" @newLabel="newLabel" :inMenu="true" :type="type"/>
   </section>
</template>

<script>
import editLabel from '../edit-label.vue'
import addLabel from '../edit/add-label.vue'
import { utilService } from '../../service/util.service.js';

export default {
   data(){
      return {
         isEdit:false,
         label:{},
         type:''
      }
   },
   methods: {
      closeMenu() {
         this.$emit("closeMenu");
      },
      back() {
         this.$emit("changeCmp", null);
      },
      editLabel({ labelId, e }) {
      console.log(labelId);
      let label = this.$store.getters.boardLabels;
      console.log(label);
      label = label.find((l) => l.id === labelId);
      this.label.currLabel = JSON.parse(JSON.stringify(label));
      this.type = 'edit'
      this.isEdit = true
    
      // this.dynamicCmp('addLabels', 'Change label', e);
    },
  newLabel(newLabel) {
    var board = JSON.parse(JSON.stringify(this.$store.getters.getBoard));
         console.log('upda',board,newLabel); 
    if (newLabel.id) {
        const lIdx = board.labels.findIndex((l) => l.id === newLabel.id);
        if (lIdx >= 0) {
          board.labels.splice(lIdx, 1, newLabel)}
       }else{
          newLabel.id = utilService.makeId();
         const newLabel = { id: newLabel.id, title: newLabel.title, color: newLabel.color };
         board.labels.push(newLabel);
       }
        this.$store.dispatch({ type: 'updateBoard', board });
        this.label = null;
        this.isEdit=false
    },
     addLabel(header, e) {
      this.type = 'add'
      this.isEdit=true
    },
    deleteLabel(label, e) {
        var board = JSON.parse(JSON.stringify(this.$store.getters.getBoard));
        const lIdx = board.labels.findIndex((l) => l.id === label.id);
        board.labels.splice(lIdx, 1)
        this.$store.dispatch({ type: 'updateBoard', board });
        this.isEdit=false

    }

   },
   components: {
      editLabel,
      addLabel
   },
};
</script>

<style>
</style>