import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import Trivia from './pages/Trivia.vue'
import ViewItem from './pages/ViewItem.vue'

const pinia = createPinia();

const routes = [
    { path: '/', name: 'home', component: Trivia },
    { path: '/view/:id', name: 'view', component: ViewItem, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');