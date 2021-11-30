<template>
    <section class="card-edit">
        <h3>edit</h3>
        <component :is="component" @trelix="trelix"> </component>
    </section>
</template>

<script>
import attachment from '../cmp/edit-attachment.vue';
export default {
    name: 'cardEdit',
    data() {
        return {
            component: 'card-attachment',
        };
    },
    methods: {
        trelix() {
            console.log('aa');
        },
    },
    components: {
        'card-attachment': attachment,
    },
    computed: {
        editRender() {
            return 'card-attachment';
        },
    },
};
</script>

<style></style>
