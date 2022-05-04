import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import Admin from '../views/AdminView.vue'

import Configuration from '../views/Tabs/ConfigurationView.vue'
import Session from '../views/Tabs/SessionView.vue'
import Terminal from '../views/Tabs/TerminalView.vue'
import Reports from '../views/Tabs/ReportsView.vue'

const tabs = [
  {
    path: '/Configuration',
    name: 'Configuracion',
    component: Configuration
  },
  {
    path: '/Session',
    name: 'Business Wallet - Perfil',
    component: Session
  },
  {
    path: '/Terminal',
    name: 'Business Wallet - Terminal',
    component: Terminal
  },
  {
    path: '/Reports',
    name: 'Business Wallet - Reportes',
    component: Reports
  }
]

const routes = [
  {
    path: '/Login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/Admin',
    name: 'Business Wallet',
    component: Admin,
    children: tabs
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
