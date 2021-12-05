<template>
    <article class="checklist">
        <span class="material-icons-outlined icon"> check_box </span>

        <header class="checklist-header">
            <div class="show" v-if="!editTitleMode">
                <h3 @click="editTitle">
                    {{ checklist.title }}
                </h3>
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
                    class="description-edit-input"
                    type="textarea"
                    ref="editInput"
                    v-model="checklist.title"
                />

                <div class="description-edit-btn">
                    <a class="close-btn el-icon-close" @click="editTitle"></a>

                    <a class="save" @click="saveChecklist">Save</a>
                </div>
            </div>
        </header>

        <div class="progress-z">
            <el-progress
                :percentage="statistic"
                :status="progress"
            ></el-progress>
        </div>
        <ul class="todos-container">
            <li class="todos" v-for="todo in checklist.todos" :key="todo.id">
                <el-checkbox class="checkbox" v-model="todo.isDone">
                </el-checkbox>
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
            editTitleMode: false,
        };
    },
    methods: {
        countTodosDone(checklistId) {
            let list = this.checklist;
            let doneCount = list.todos.reduce((acc, todo) => {
                return todo.isDone ? acc + 1 : acc;
            }, 0);
            return doneCount;
            // TODO: return count todos is done
        },
        toggleCheckedItem(checklistId) {
            // TODO: all logic Which button show
        },
        addTodo() {
            // TODO: open input and add todo
        },

        saveChecklist() {
            // TODO emit to save
            this.editChecklist = false;
        },
        editTitle() {
            this.editTitleMode = !this.editTitleMode;
        },
    },
    computed: {
        statistic() {
            let done = this.checklist.todos.reduce((acc, todo) => {
                return todo.isDone ? ++acc : acc;
            }, 0);
            return (done / this.checklist.todos.length) * 100;
        },
        progress() {
            if (this.statistic === 100) {
                return 'success';
                return 'backgroundColor: #61bd4f';
            }
        },
    },
};
</script>

<style></style>
