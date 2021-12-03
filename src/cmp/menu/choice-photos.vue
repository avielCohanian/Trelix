<template>
    <section class="cmp-img">
        <div class="bcg-choice" >
            <el-input placeholder="Search Background" v-model="search" @input="debounce" ></el-input>
          <div class="bcg-choice-container">
            <ul v-if="imgs.length" class="container-imgs">
              <li v-for="(img,idx) in imgs" :key="idx" :style="img.small" class="card-img pointer" @click="changeBgc(img.full)">
              </li>
            </ul>
          </div>
        </div>
    </section>
</template>

<script>
import {utilService} from '../../service/util.service.js'
import boardService from '../../service/board.service.js'
import {imgService} from '../../service/img.service.js'
export default {
    created(){
       this.searchBy()
       this.debounce = utilService.debounce(this.searchBy, 1500)
    },
    data(){
      return{
        search:'Wallpapers',
        imgs:[]
      }
    },
    methods:{
      changeBgc(newBcg){
        console.log(newBcg);
        this.$emit('changeBcg',newBcg)
      },
      async searchBy(){
        const imgs = await imgService.getImgs(this.search)
        this.imgs = imgs
        console.log(imgs);
      },
      debounce(){}
    }, 
}
</script>