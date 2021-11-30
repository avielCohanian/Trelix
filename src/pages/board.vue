<template>
    <section class="board">
        <nav-menu/>
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
};
</script>

<style></style>
