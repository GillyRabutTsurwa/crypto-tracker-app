export const routes = [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // },
    {
        path: "/",
        name: "Home",
        component: () => import(/* webpackChunkName: "about" */ "@/pages/index.vue"),
    },
    {
        path: "/coins",
        name: "Coins Page",
        component: () => import(/* webpackChunkName: "about" */ "@/pages/coins/index.vue"),
    },
    {
        path: "/coins/:id",
        name: "Coin Page",
        component: () => import(/* webpackChunkName: "about" */ "@/pages/coins/[id]/index.vue"),
    },
];
