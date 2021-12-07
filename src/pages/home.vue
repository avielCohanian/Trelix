<template>
    <section class="home">
        <home-header />
    </section>
</template>

<script>
// @ is an alias to /src
import homeHeader from '@/cmp/home-header.vue';

export default {
    name: 'home',
    components: {
        homeHeader
    },
    created(){

    }
};
</script>
