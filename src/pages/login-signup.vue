<template>
    <section class="user-login main-layout"></section>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            user: {
                fullname: '',
                username: '',
                password: '',
            },
            isLogin: false,
        };
    },
};
</script>

<style></style>
