// router.ts
import { createRouter,createWebHistory } from 'vue-router';
import Home from "./Home.vue";
import App from "./App.vue";
import Philosophy from "./philosophy.vue";
import Profile from "./components/profile.vue";
 
const routes = [
    { path: '/', component: Home },
    // { path: '/home', component: Home },
    { path: '/app', component: App },
    { path: '/philosophy', component: Philosophy },
    { path: '/profile', component: Profile },
]
 
const router = createRouter({
    history: createWebHistory(), // HTML5 History モード
    routes,
})
 
export default router;