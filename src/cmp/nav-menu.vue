<template>
    <section class="nav-menu">
    <ul class="menu-list">
        <li class="menu-header">
        <h3 class="back-menu" @click="changeCmp(null)"></h3>
        <h2 class="menu-header">{{headerTxt}}</h2>
        <h3 class="close-menu"> </h3>
        </li>
        <hr>
        <div v-if="!showCmp">
        <li class="menu-about" @click="changeCmp('aboutBoard')">
        <span>
        <h3 class="logo"> logo </h3>
        <h2> About this board </h2>
        </span>
        <p> Add a description to your board </p>
        </li>
        <li class="menu-background" @click="changeCmp('changeBackground')">
        <h2> Change Background </h2>
        </li>
        <li class="menu-stickers" @click="changeCmp('addStickers')">
        <h2> Stickers </h2>
        </li>
        <li class="menu-nore" @click="changeCmp('moreMenu')"> 
        <h2> More </h2>
        </li>
        </div>
    </ul>
        <component :is="getComponent" :board="getBoard"> </component>
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
            showCmp:null
            // board: this.getBoard
        };
    },
    methods: {
        changeCmp(cmp){
            this.showCmp = cmp
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
            return this.$store.getters.getBoard
        }
    },
};
</script>

<style></style>
