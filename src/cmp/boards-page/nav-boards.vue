<template>
   <section class="nav-boards ">
        <div class="boards pointer " :class="{'selected': to}" @click="changeCmp(true)">
            <div> <font-awesome-icon class="logo" :icon="[ 'fab', 'trello' ]" /> </div>
            <h2 class="nav" > Boards </h2>
        </div>
        <div class="template pointer " :class="{ 'selected' : !to}"  @click="changeCmp(false)">
            <h3 class="template-logo logo" > </h3>
            <h2 class="nav" > Templates </h2>
        </div>
        <div class="home">
            <div> </div>
            <div> </div>
        </div>
  </section>
</template>

<script>
export default {
    data(){
        return{
            to:true
        }
    },
    methods: {
        changeCmp(to){
            this.to=to
            this.$emit('showTemp',to)
        }
    },  
}
</script>

<style>
</style>