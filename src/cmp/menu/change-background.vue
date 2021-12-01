<template>
<section>
  <div class="bcg-main">
    <div >
      Photos
    </div>
    <div>
      Colors
    </div>
    <hr>
    <h2> Custom </h2>
    <div>
      <h3 class="plus"></h3>
    </div>
  </div>
  <div class="bcg-choice">
    <ul>
      <li v-for="(color,idx) in colors" :key="idx" :style="color">
        bcgColor
      </li>
    </ul>
  </div>
</section>
</template>

<script>
export default {
  data(){
    return{
        colors:{
            orange:{background:'rgb(210, 144, 52)'},
            blue:{background:'rgb(0, 121, 191)'},
            red:{background:'rgb(176, 70, 50)'},
            green:{background:'rgb(81, 152, 57)'},
            pink:{background:'rgb(205, 90, 145)'},
            purple:{background:'rgb(137, 96, 158)'},
            blueLight:{background:'rgb(0, 174, 204)'},
            greenLight:{background:'rgb(75, 191, 107)'},
            gray:{background:'rgb(131, 140, 145)'}
        }
}
}
}
</script>

<style>

</style>