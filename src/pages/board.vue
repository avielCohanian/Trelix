<template>
    <section class="board" :style="board.style">
        <button @click="toggleMenu">menu</button>
        <nav-menu v-if="showMenu" :closeMenu="toggleMenu"/>
        <groups />
    </section>
</template>

<script>
import groups from '../cmp/groups.vue';
import NavMenu from '../cmp/nav-menu.vue';
export default {
    name: 'board',
    components: {
        groups,
        NavMenu,
    },
    data(){
return {
    showMenu : false
}
    },
    created() {
        // const boardId = this.$params.boardId;
        this.loadBoard()
    },
    methods:{
        toggleMenu(){
this.showMenu = !this.showMenu
        },
   async loadBoard(boardId='b101'){
        try {
           var res = await this.$store.dispatch({ type: 'loadBoard', boardId })
        //    console.log(res);
        } catch (err) {
            console.log(err);
        }
}
    }
};
</script>

<style></style>
