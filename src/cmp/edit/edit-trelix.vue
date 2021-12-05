<template>
    <div class="trelix">
        <p>Card or board to add:</p>
        <el-input placeholder="Search terms or URL..." v-model="url"></el-input>
        <p v-if="groups">Cards:
            <ul  v-for="group in groups" :key="group.id">
                <li  v-for="card in group.cards" :key="card.id">
                    <p>{{card.title}}</p>
                    <p>in {{group.title}}</p>
                </li>
            </ul>
        </p>

        <ul v-if="groups">
            <p>Boards:</p>
            <li v-for="board in boards" :key="board._id"></li>
            <p>{{board.title}}</p>
            <!-- <p>{{board.title}}</p> להבין מה רוציםת מה רשום בכתוביות למטה--> 
        </ul>
    </div>
</template>

<script>
export default {
    name: 'trelix',
    data() {
        return {
            url: '',
            // cards: null,
            groups: null,
        };
    },
};
</script>

<style></style>
