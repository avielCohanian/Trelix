<template>
    <article class="checklist">
        <span class="material-icons-outlined icon"> check_box </span>

        <header class="checklist-header">
            <div class="show" v-if="true">
                <h3>{{ checklist.title }}</h3>
                <div class="todos-btn">
                    <a
                        class="checked-item"
                        v-if="countTodosDone(checklist.id)"
                        @click="toggleCheckedItem(checklist.id)"
                        >Hide checked items</a
                    >
                    <a
                        v-else
                        class="checked-item"
                        @click="toggleCheckedItem(checklist.id)"
                        >Show checked items({{
                            countTodosDone(checklist.id)
                        }})</a
                    >
                    <a
                        class="delete-checklist"
                        @click="deleteChecklist(checklist.id)"
                        >Delete</a
                    >
                </div>
            </div>

            <div v-else class="description-edit">
                <input
                    type="textarea"
                    ref="editInput"
                    v-model="checklist.title"
                />

                <div class="description-edit-btn">
                    <a
                        class="close-btn el-icon-close"
                        @click="closeChecklist"
                    ></a>

                    <a class="save" @click="saveChecklist">Save</a>
                </div>
            </div>
        </header>
        <!-- :class="{ done: progress === 100 }" -->
        <el-progress :percentage="statistic"></el-progress>

        <ul class="todos" v-for="todo in checklist.todos" :key="todo.id">
            <el-checkbox class="checkbox" v-model="todo.isDone"> </el-checkbox>
            <li>
                <!-- @change="updateTodo(todo)" -->
                <div class="checklist-todo">
                    {{ todo.txt }}
                </div>
            </li>
        </ul>
        <a class="item-btn" @click="addTodo">Add an item</a>
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
            checklistName: this.checklist.name,
            newTodo: { text: '', isDone: false },
            editChecklist: false,
        };
    },
    methods: {
        countTodosDone(checklistId) {
            console.log(this.checklist);
            let list = this.checklist;
            let doneCount = list.todos.reduce((acc, todo) => {
                return todo.isDone ? acc + 1 : acc;
            }, 0);
            console.log(doneCount);
            return doneCount;
            // TODO: return count todos is done
        },
        toggleCheckedItem(checklistId) {
            // TODO: all logic Which button show
        },
        addTodo() {
            // TODO: open input and add todo
        },
        closeChecklist() {
            this.editChecklist = false;
        },
        saveChecklist() {
            // TODO emit to save
            this.editChecklist = false;
        },
    },
    computed: {
        statistic() {
            console.log(this.checklist.todos);
            let done = this.checklist.todos.reduce((acc, todo) => {
                console.log(todo.isDone);
                return todo.isDone ? ++acc : acc;
            }, 0);
            return (done / this.checklist.todos.length) * 100;
        },
    },
};
</script>

<style></style>
