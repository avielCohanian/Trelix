<template>
    <section class="nav-menu">
    <ul class="menu-list">
        <li class="menu-header">
        <!-- <h2 class="menu-header">{{headerTxt}}</h2> -->
        <h3 class="close-menu"> </h3>
        </li>
        <hr>
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
    </ul>
        <component :is="getComponent" > </component>
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
        };
    },
    methods: {
        changeCmp(cmp){
            this.showCmp = cmp
        }
        // headerTxt(){
        //     return showCmp ? 'Menu' : 
        // }
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
    },
};
</script>

<style></style>
