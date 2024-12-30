import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import File from '@/views/file/index.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: 'index',
        children: [
            {
                path: 'index',
                name: 'file',
                component: File,
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router