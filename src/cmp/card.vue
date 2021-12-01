<template>
<!-- <section class="screen" @click="openEditor" v-if="openEditor"> -->
  <section class="card" @click="openDetails(card.id)">
      <header>  
    {{card.title}}
    <i class="el-icon-edit"  @click="openEditor"></i>
      </header>
      <div>
      <div class="icons">


        <avatar username="member.username" class="avatar" :size="30"></avatar>
      </div>
      </div>
    <main>
    <div v-if="isOpenEditor" class="editor">

    </div>

    </main>
   
  </section>
  <!-- </section> -->
</template>

<script>
import avatar from 'vue-avatar';

export default {
  name: "card",
  props:['card'],
  data(){
    return{
      isOpenEditor: false
    }
  },
  methods:{
    openEditor(){
    this.isOpenEditor= !this.isOpenEditor
    },
    openDetails(cardId){
      this.$route.push(`/cardDetails/${cardId}`)
    }
  },
 components: {
        avatar,
    },
};
</script>

<style></style>
