<template>
    <section class="board">
        <nav-menu />
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
    created() {
        // const boardId = this.$params.boardId;
        this.loadBoard()
    },
    methods:{
   async loadBoard(boardId='b101'){
        try {
           var res = await this.$store.dispatch({ type: 'loadBoard', boardId })
           console.log(res);
        } catch (err) {
            console.log(err);
        }
}
    }
};
</script>

<style></style>
