import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../pages/home.vue';
import about from '../pages/about.vue';
import boards from '../pages/board-page.vue';

import cardDetails from '../pages/card-details.vue';
import board from '../pages/board.vue';
import login from '../pages/login.vue';
import signup from '../pages/signup.vue';
import drugGroup from '../cmp/drug-group.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: boards,
        // component: home,
    },
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    {
        path: '/signup',
        name: 'signup',
        component: signup,
    },
    {
        path: '/about',
        name: 'about',
        component: about,
    },
    {
        path: '/:boardId/boards',
        name: 'boards',
        component: boards,
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
