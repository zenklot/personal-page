import {createRouter, createWebHistory} from 'vue-router'
import Home from '../view/Home.vue'
import Komentar from '../view/Komentar.vue'
import NotFound from '../view/NotFound.vue'

const routes = [
    {
        path: "/",
        component:Home,
        name: 'Home'
    },
    {
        path: "/komentar",
        component:Komentar,
        name: 'Komentar'
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router