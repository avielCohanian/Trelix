<template>
    <section class="card-edit">
        <h3>edit</h3>
        <component :is="component" @dynamicCmp="dynamicCmp"> </component>
    </section>
</template>

<script>
import attachment from '../cmp/edit-attachment.vue';
import trelix from '../cmp/edit-trelix.vue';
export default {
    name: 'cardEdit',
    data() {
        return {
            component: 'card-attachment',
        };
    },
    methods: {
        dynamicCmp(x) {
            this.component = `card-${x}`;
        },
        // editRender() {
        //     return 'card-attachment';
        // },
    },
    components: {
        'card-attachment': attachment,
        'card-trelix': trelix,
    },
    computed: {},
};
</script>

<style></style>
