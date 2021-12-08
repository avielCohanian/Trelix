<template>


   <section class="cmp-colors ">
    <!-- <div class="scroll-container"> -->
      <div class="bcg-choice ">
         <ul class="">
            <li
               v-for="(color, idx) in colors"
               :key="idx"
               :style="color"
               class="card-color pointer"
               @click="changeBgc(color)"
            ></li>
         </ul>
      </div>
   <!-- </div> -->
   </section>
</template>

<script>
export default {
   props: {
      colors: { type: Array },
   },
   methods: {
      changeBgc(newBcg) {
         this.$emit("changeBcg", {img: newBcg, color:'#fff'});
      },
   },
};
</script>

<style>
</style>