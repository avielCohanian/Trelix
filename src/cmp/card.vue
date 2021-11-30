<template>
    <section class="card">
        <label for="add" @click="add">
            <el-input
                v-if="!isAdd"
                name="add"
                placeholder="+ Add a list"
            ></el-input>
        </label>

        <div v-if="isAdd">
            <el-input
                placeholder="Enter list title..."
                v-model="card.txt"
            ></el-input>
            <el-button type="primary" @click="addCard"> Add list</el-button>
            <i class="el-icon-close" @click="add"></i>
        </div>
    </section>
</template>

<script>
export default {
    name: 'card',
    data() {
        return {
            isAdd: false,
            card: {
                txt: '',
            },
        };
    },
    methods: {
        add() {
            console.log('click');
            this.isAdd = !this.isAdd;
        },
        addCard() {},
    },
};
</script>

<style></style>
