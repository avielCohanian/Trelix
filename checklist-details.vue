<template>
    <section class="checklist-details">
        <div class="checklist-header">
            <h4
                class="checklist-name"
                v-if="!isOpenChangeName"
                @click="toggleChangeName"
            >
                <i class="el-icon-circle-check check-icon"></i>
                {{ checklist.name }}
            </h4>
            <div v-else class="change-checklist-name">
                <input
                    class="task"
                    type="text"
                    v-model="checklistName"
                    @keyup.enter="changeChecklistName"
                />
                <button class="add-btn" @click="changeChecklistName">
                    Save
                </button>
                <button class="close-btn" @click="toggleChangeName">
                    <font-awesome-icon icon="times" />
                </button>
            </div>
            <button class="remove-checklist-btn" @click="removeChecklist">
                Delete
            </button>
        </div>

        <el-progress
            :class="{ done: progress === 100 }"
            :percentage="progress"
        ></el-progress>

        <div class="todos" v-for="todo in checklist.todos" :key="todo.id">
            <div>
                <el-checkbox
                    v-model="todo.isDone"
                    @change="updateTodo(todo)"
                ></el-checkbox>
                <div
                    class="checklist-todo"
                    v-if="currTodoId !== todo.id"
                    @click="setCurrTodoId(todo)"
                >
                    {{ todo.text }}
                </div>

                <div class="checklist-todo" v-if="currTodoId === todo.id">
                    <input
                        class="task"
                        type="text"
                        v-model="todo.text"
                        @keyup.enter="changeTodoName()"
                    />
                    <button class="add-btn" @click="changeTodoName()">
                        Save
                    </button>
                    <button class="close-btn" @click="setCurrTodoId()">
                        <font-awesome-icon icon="times" />
                    </button>
                </div>
            </div>
            <button
                class="close-btn remove-todo"
                v-if="!currTodoId"
                @click="removeTodo(todo)"
            >
                <font-awesome-icon icon="times" />
            </button>
        </div>

        <div
            class="edit-area add-item"
            v-if="!isAddTodo"
            @click="toggleAddTodo"
        >
            Add an item
        </div>
        <div v-else>
            <input
                class="task"
                type="text"
                placeholder="Add an item"
                v-model="newTodo.text"
                @keyup.enter="addTodo"
            />
        </div>
        <div v-if="isAddTodo">
            <button @click="addTodo" class="add-btn">Add</button>
            <button class="close-btn" @click="toggleAddTodo">
                <font-awesome-icon icon="times" />
            </button>
        </div>
    </section>
</template>

<script>
export default {
    name: 'checklist-details',
    props: {
        checklist: Object,
    },
    data() {
        return {
            isAddTodo: false,
            isOpenChangeName: false,
            isOpenChangeText: false,
            checklistName: this.checklist.text,
            newTodo: { text: '', isDone: false },
            todoText: '',
            currTodoId: '',
        };
    },
    methods: {
        toggleAddTodo() {
            this.isAddTodo = !this.isAddTodo;
        },
        toggleChangeName() {
            if (!this.isOpenChangeName) {
                this.checklistName = this.checklist.name;
            }
            this.isOpenChangeName = !this.isOpenChangeName;
        },
        changeChecklistName() {
            this.checklist.name = this.checklistName;
            this.$emit('update-checklist', this.checklist);
            this.toggleChangeName();
        },
        removeChecklist() {
            this.$emit('remove-checklist', this.checklist.id);
        },
        setCurrTodoId(todo = null) {
            if (todo) {
                this.currTodoId = todo.id;
                this.todoText = todo.text;
            } else {
                var changedTodo = this.checklist.todos.find(
                    (currTodo) => currTodo.id === this.currTodoId
                );
                changedTodo.text = this.todoText;
                this.currTodoId = '';
            }
        },
        addTodo() {
            this.$emit(
                'add-todo',
                this.checklist.id,
                JSON.parse(JSON.stringify(this.newTodo))
            );
            this.newTodo = { text: '', isDone: false };
        },
        updateTodo(todo) {
            this.$emit('update-checklist', this.checklist);
            this.$emit('update-todo-activity', todo);
        },
        removeTodo(todo) {
            const todoIndex = this.checklist.todos.findIndex(
                (currTodo) => currTodo.id === todo.id
            );
            this.checklist.todos.splice(todoIndex, 1);
            this.$emit('update-checklist', this.checklist);
        },
        changeTodoName() {
            this.$emit('update-checklist', this.checklist);
            this.currTodoId = '';
        },
    },
    computed: {
        progress() {
            const todos = this.checklist.todos.length;
            if (todos !== 0) {
                const doneTodos = this.checklist.todos.filter(
                    (todo) => todo.isDone
                );
                return Math.round((doneTodos.length / todos) * 100);
            } else return 0;
        },
    },
};
</script>
