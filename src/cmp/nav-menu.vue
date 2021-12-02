<template>
    <section class="nav-menu" >

    <ul class="menu-list"  v-if="!showCmp">
        <li class="menu-header">
        <h3 class="back-menu" @click="changeCmp(null)"></h3>
        <h2 class="menu-header-txt">Menu</h2>
        <h3  @click="closeMenu" class=" close-menu material-icons-outlined">close </h3>
        </li>
        <hr>
        <div class="container-main">

        <li class="menu-about" @click="changeCmp('aboutBoard')">
            <h2>
         <font-awesome-icon class="logo" :icon="[ 'fab', 'trello' ]" />
            </h2>
         <div>
        <h2> About this board </h2>
        <p> Add a description to your board </p>
         </div>
        </li>

        <li class="menu-background" @click="changeCmp('changeBackground')">
            <div class="border-color" :style="bcgColor"> </div>
        <h2> Change Background </h2>
        </li>
        <br>
        <!-- <li class="menu-stickers" @click="changeCmp('addStickers')">
        <h2> Stickers </h2>
        </li> -->
        <br>
        <li class="menu-nore" @click="changeCmp('moreMenu')"> 
        <h2> More </h2>
        </li>
        <menu-activity :board="getBoard" />
        </div>
    </ul>
    <transition name="slide-fade">
        <component :is="getComponent" @closeMenu="closeMenu" @changeCmp="changeCmp" :board="getBoard" @changeBcg="changeBcg"> </component>
    </transition>
    </section>
</template>

<script>
import aboutBoard from '../cmp/menu/about-board.vue'
import changeBackground from '../cmp/menu/change-background.vue'
import moreMenu from '../cmp/menu/more.vue'
import addStickers from '../cmp/menu/stickers.vue'
import menuActivity from '../cmp/menu/menu-activity.vue'

export default {
    name: 'smart-cmp-menu',
    data() {
        return {
            showCmp:null,
            bcgColor:null,
            board: this.getBoard
            // [
            //            {time:Date.now() -10000000, fullname:'MOSHE ZOHAR',event:{do:'added',in:{board:'fsg',id:'c102'}},
            //            img:'https://res.cloudinary.com/dshrwhc75/image/upload/v1638367919/luca-micheli-r9RW20TrQ0Y-unsplash_jnpfxx.jpg'}
            //     ,{time:Date.now() -10000000, fullname:'MOSHE ZOHAR',event:{do:'added',in:{board:'fsg',id:'c102'}},
            //            img:'https://res.cloudinary.com/dshrwhc75/image/upload/v1638367919/luca-micheli-r9RW20TrQ0Y-unsplash_jnpfxx.jpg'}
            //    ]
               //todo get acrivitis from board
            // board: this.getBoard
        }
    },
    methods: {
        changeCmp(cmp){
            this.showCmp = cmp
        },
        closeMenu(){
            this.$emit('closeMenu')
        },
        changeBcg(newColor){
            this.bcgColor =newColor
        }
      
       
    },
    components: {
        aboutBoard,
        changeBackground,
        moreMenu,
        addStickers,
        menuActivity
    },
    computed: {
       getComponent(){
           return this.showCmp
       }
      ,
        getBoard(){
            this.bcgColor = this.$store.getters.getBoard.style
            console.log(this.$store.getters.getBoard);
            return this.$store.getters.getBoard
        },
    //     openCmp(){
    // // transform: translateX(100%);
    //         return {transform: 'translateX(0%)'}
    //     }
    },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all .6s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
