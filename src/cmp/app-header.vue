<template>
    <section class="app-header">
        <nav>
            <div class="nav-list">
                <i class="el-icon-s-grid"></i>
                <div class="logo">Trelix</div>
                <ul>
                    <li>Workspace <i class="el-icon-arrow-down"></i></li>
                    <li>Recent <i class="el-icon-arrow-down"></i></li>
                    <li>Starred <i class="el-icon-arrow-down"></i></li>
                    <li>Templates <i class="el-icon-arrow-down"></i></li>
                    <li>Create</li>
                </ul>
            </div>
            <div class="search">
                <el-input placeholder="Search... "></el-input>
                <i class="el-icon-info"></i>
                <i class="el-icon-bell"></i>
                <avatar :size="35" username="member.username" class="member"></avatar>
            </div>
        </nav>
    </section>
</template>

<script>
import avatar from 'vue-avatar';

export default {
    name: 'appHeader',
    computed: {},
    methods: {},
    components: {
        avatar,
    },
};
</script>

<style></style>
