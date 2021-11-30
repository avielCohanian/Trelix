<template>
    <div class="attachment">
        <label>
            computer
            <input type="file" hidden />
        </label>
        <hr />
        <label @click="dynamicCmp"> trelix </label>
        <hr />

        <form @submit.prevent="aa">
            <label>Attach a link</label>
            <el-input
                placeholder="Paste any link here..."
                v-model="link"
            ></el-input>
            <label v-if="link"
                >Link name(optional)
                <el-input v-model="linkName"></el-input>
            </label>
            <button hidden></button>
        </form>
        <hr />
    </div>
</template>

<script>
export default {
    name: 'attachment',
    data() {
        return {
            link: '',
            linkName: '',
        };
    },
    methods: {
        dynamicCmp() {
            this.$emit('dynamicCmp', 'trelix');
        },
        aa() {
            console.log(this.link);
            console.log(this.linkName);
        },
    },
};
</script>

<style></style>
