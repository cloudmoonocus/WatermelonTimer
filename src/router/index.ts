import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/timer'
        },
        {
            path: '/timer',
            name: 'timer',
            component: () => import('../views/Timer/timer-main.vue')
        }
    ]
})

export default router
