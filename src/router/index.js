import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../pages/home.vue';
import about from '../pages/about.vue';

import cardDetails from '../pages/card-details.vue';
import board from '../pages/board.vue';
import drugGroup from '../cmp/drug-group.vue';

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
        path: '/board/:boardId',
        name: 'board',
        component: board,
        children: [
            {
                path: '/board/:boardId/:cardId',
                name: 'cardDetails',
                component: cardDetails,
            },
        ],
    },
    {
        path: '/drug',
        name: 'drugGroup',
        component: drugGroup,
    },
];

const router = new VueRouter({
    routes,
    cardDetails,
});

export default router;
