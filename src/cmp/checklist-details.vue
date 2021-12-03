<template>
    <article class="checklist">
        <span></span>
        <span class="material-icons-outlined icon"> check_box </span>

        <header class="checklist-header">
            <div class="show" v-if="true">
                <h3>{{ checklist.title }}</h3>
                <a
                    class="delete-checklist"
                    @click="deleteChecklist(checklist.id)"
                    >Delete</a
                >
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
        <a
            v-if="countTodosDone(checklist.id)"
            @click="toggleCheckedItem(checklist.id)"
            >Hide checked items</a
        >
        <a @click="toggleCheckedItem(checklist.id)"
            >Show checked items({{ countTodosDone(checklist.id) }})</a
        >
        <!-- :class="{ done: progress === 100 }" -->
        <el-progress :percentage="80"></el-progress>

        <ul class="todos" v-for="todo in checklist.todos" :key="todo.id">
            <li>
                <el-checkbox class="checkbox" v-model="todo.isDone">
                    <!-- @change="updateTodo(todo)" -->
                    <div class="checklist-todo">
                        {{ todo.txt }}
                    </div>
                </el-checkbox>
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
            isAddTodo: false,
            isOpenChangeName: false,
            isOpenChangeText: false,
            checklistName: this.checklist.name,
            newTodo: { text: '', isDone: false },
            todoText: '',
            currTodoId: '',
            editChecklist: false,
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
        closeChecklist() {
            this.editChecklist = false;
        },
        saveChecklist() {
            // TODO emit to save
            this.editChecklist = false;
        },
    },
};
</script>

<style></style>
