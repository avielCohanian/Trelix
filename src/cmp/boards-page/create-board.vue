<template>
  <section class="create-new-board">
      <div class="screen-model" @click.stop="close">

    <div class="created-model " v-if="imgs && imgs.length > 0">
        <div class="header-created flex">

       <div class="board-title " :style="emptyBoard.style" @click.stop="" >
           <input placeholder="Add Board Title" v-model="emptyBoard.title" @click.stop="" />
           <div class="material-icons-outlined"> close</div>
       </div>
       <ul class="choice-bcg" @click.stop="">
           <li class="card-bcg" v-for="(bgc) in getBgcImg" :style="bgc.small" :key="bgc.description" @click="changeBgc(bgc.full)"> </li>
           <li class="card-bcg" v-for="(bgc , idx) in getBgcColor" :style="bgc" :key="idx"  @click="changeBgc(bgc)"> </li>
           <li class="card-bcg card-bcg-more" > </li>
       </ul>

    </div>

       <el-button @click="addBoard" > Create board </el-button>

     </div>
    </div>
  </section>
</template>

<script>
import {imgService} from '../../service/img.service.js'
import {boardService} from '../../service/board.service.js'
export default {
    props:{
        bgcs:{type : Array},

    },
    data(){
        return{
            imgs:[],
            emptyBoard: null
        }
    },
    async created(){
        this.loadEmptyBoard()
        await this.getImgs()
    },
    methods:{
        changeBgc(bgc){
            this.emptyBoard.style = bgc
        },
        async addBoard(){
            try{
                const coppyUser =this.$store.getters.getUserConnect
                const newBoard= await boardService.addBoard(this.emptyBoard ,coppyUser)
                coppyUser.boards.boards.push(newBoard._id)
                this.$store.dispatch({type:'updateUser',currUser:coppyUser})
                this.$router.push(`/board/${newBoard._id}`)
            }catch(err){
                throw err
            }
            
        },
        loadEmptyBoard(){
           this.emptyBoard= boardService.getEmptyBoard()
        },
       
        close(){
            this.$emit('closeCreate')
        }
        ,
        async getImgs(size=4){
           const imgs = await imgService.getImgs('Wallpapers',size)
           this.imgs = imgs
        }
    },
    computed:{
        getBgcColor(){
           return this.bgcs.slice(0,4)
        },
        getBgcImg(){
           return this.imgs
        }
    
    }

}
</script>

<style scope>
    .create-new-board{
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
    }
    .screen-model{
         height: 100vh;
        width: 100vw;
     background: rgba(0, 0, 0, 0.75);
    }
    .board-title{
        height: 96px;
        width: 296px;
         background-size: cover;

    }




    .ul{
        margin: 0;
        padding: 0;
    }
    .choice-bcg{
        width: 100px;
        height: 100px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        /* gap: 2px; */
    }
    .card-bcg{
        width: 28px;
        height: 28px;
        border-radius: 2px;
        background-size: cover;
            margin-left: 4px;
    }
    .card-bcg-more{
        background-color: rgb(245, 245, 245);
    }



    
</style>