<template>
    <section class="nav-menu" :style="openCmp">
        <!-- <i class="fab fa-trello"></i> -->
    <ul class="menu-list">
        <li class="menu-header">
        <h3 class="back-menu" @click="changeCmp(null)"></h3>
        <h2 class="menu-header-txt">{{headerTxt}}</h2>
        <h3 class="close-menu" @click="closeMenu"> </h3>
        </li>
        <hr>
        <div v-if="!showCmp">
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
        </div>
    </ul>
        <component :is="getComponent" :board="getBoard" @changeBcg="changeBcg"> </component>
        <hr>
        <menu-activity />
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
            bcgColor:null
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
       },
        headerTxt(){
            return !this.showCmp ? 'Menu' : this.showCmp
        },
        getBoard(){
            this.bcgColor =this.$store.getters.getBoard.style
            return this.$store.getters.getBoard
        },
        openCmp(){
    // transform: translateX(100%);
            return {transform: 'translateX(0%)'}
        }
    },
};
</script>

<style></style>
