<template>
    <div id="app">
        <app-header />
        <router-view class="main-layout"></router-view>

        <!-- <router-view /> -->
    </div>
</template>

<script>
import appHeader from '../src/cmp/app-header';

export default {
    components: {
        appHeader,
    },
};
</script>
