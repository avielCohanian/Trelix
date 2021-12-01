<template>
    <article class="checklist">
        <span></span>
        <!--TODO  למצוא אייקון מתאים -->
        <header class="checklist-header">
            <h3>{{ checklist.title }}</h3>
            <i class="el-icon-circle-check check-icon icon"></i>

            <a
                v-if="countTodosDone(checklist.id)"
                @click="toggleCheckedItem(checklist.id)"
                >Hide checked items</a
            >

            <a @click="toggleCheckedItem(checklist.id)"
                >Show checked items({{ countTodosDone(checklist.id) }})</a
            >
            <a @click="deleteChecklist(checklist.id)">Delete</a>
        </header>
        <!-- :class="{ done: progress === 100 }" -->
        <el-progress :percentage="50"></el-progress>

        <div class="todos" v-for="todo in checklist.todos" :key="todo.id">
            <div>
                <el-checkbox v-model="todo.isDone"></el-checkbox>
                <!-- @change="updateTodo(todo)" -->
                <div class="checklist-todo">
                    {{ todo.txt }}
                </div>
            </div>
            <el-button @click="addTodo">Add an item</el-button>
        </div>

        <!-- </div> -->
    </article>
</template>

<script>
export default {
    name: 'checklistDetails',
    props: {
        checklist: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isAddTodo: false,
            isOpenChangeName: false,
            isOpenChangeText: false,
            checklistName: this.checklist.name,
            newTodo: { text: '', isDone: false },
            todoText: '',
            currTodoId: '',
        };
    },
    methods: {
        countTodosDone(checklistId) {
            // TODO: return count todos is done
        },
        toggleCheckedItem(checklistId) {
            // TODO: all logic Which button show
        },
        addTodo() {
            // TODO: open input and add todo
        },
    },
};
</script>

<style></style>
