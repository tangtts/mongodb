import { createRouter, createWebHistory } from 'vue-router'
import Student from '../views/student/index.vue'
import Grades from '../views/student/grades.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/student',
      name: 'student',
      component: Student
    },
    {
      path: '/grades',
      name: 'grades',
      component: Grades
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('../views/teacher/index.vue')
    },
    {
      path: '/class',
      name: 'class',
      component: () => import('../views/class/index.vue')
    },
  ]
})

export default router
