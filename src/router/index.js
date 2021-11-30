import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../pages/home.vue';
import about from '../pages/about.vue';

import cardDetails from '../pages/card-details.vue';
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
        path: '/card/details',
        name: 'cardDetails',
        component: cardDetails,
    },
];

const router = new VueRouter({
    routes,
    cardDetails,
});

export default router;
