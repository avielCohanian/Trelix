<template>
    <section class="board-page">
            <nav-boards />
            <main-boards />



    </section>
</template>

<script>
import navBoards from '../cmp/nav-boards.vue';
import mainBoards from '../cmp/main-boards.vue';

export default {
    name: 'boardPage',
    components:{
        navBoards,
        mainBoards
    }
};
</script>

<style>
    .board-page{
        padding-top: 50px;
        width: 100vw;
        height: 100vh;
        background-color:blueviolet;
        display: flex;
    /* align-items: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: center; */
    }
</style>
