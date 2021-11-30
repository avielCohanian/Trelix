<template>
    <section class="nav-menu">
        <h1> hi </h1>
        <component :is="getComponent" @trelix="trelix"> </component>
    </section>
</template>

<script>
import aboutBoard from '../cmp/menu/about-board.vue'
import changeBackground from '../cmp/menu/change-background.vue'
import moreMenu from '../cmp/menu/more.vue'

export default {
    name: 'smart-cmp-menu',
    data() {
        return {
        };
    },
    methods: {
    },
    components: {
        aboutBoard,
        changeBackground,
        moreMenu
    },
    computed: {
       getComponent(){
           return 'aboutBoard'
       }
    },
};
</script>

<style></style>
