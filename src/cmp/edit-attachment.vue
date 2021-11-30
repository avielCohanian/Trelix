<template>
    <div class="attachment">
        <label>
            computer
            <input type="file" hidden />
        </label>
        <label @click="trelixMode"> trelix </label>
    </div>
</template>

<script>
export default {
    name: 'attachment',

    methods: {
        trelixMode() {
            this.$emit('trelix');
        },
    },
};
</script>

<style></style>
