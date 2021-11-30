import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../pages/home.vue';
import about from '../pages/about.vue';

import cardEdit from '../pages/card-edit.vue';
import board from '../pages/board.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
    },
    {
        path: '/about',
        name: 'about',
        component: about,
    },
    {
        path: '/board',
        name: 'board',
        component: board,
    },
    {
        path: '/card/edit',
        name: 'cardEdit',
        component: cardEdit,
    },
];

const router = new VueRouter({
    routes,
    cardEdit,
});

export default router;
