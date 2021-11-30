<template>
    <section class="groups">
        <div v-for=" group in getGroups" :key="group.id">
    <group :group="group" />
             </div>
    </section>
</template>

<script>
import group from './group.vue';

export default {
    name: 'groups',
    components:{
        group
    },
    data(){
        return{
        }
    },
     created() {
     
  },
  methods:{

  },
  computed:{
      getGroups(){
       return this.$store.getters.getBoard
      }
  }
};
</script>

<style></style>
