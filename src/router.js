import {createRouter,createWebHashHistory} from "vue-router";
import HomeComp from "@/components/HomeComp.vue";
import ActivitiesComp from "@/components/ActivitiesComp.vue";
import SignInComp from "@/components/SignInComp.vue";
import ProfileComp from "@/components/ProfileComp.vue";

const routes = [
    { path: '/', component: HomeComp },
    { path: '/activities', component: ActivitiesComp },
    { path: '/signin', component: SignInComp },
    { path: '/profile', component: ProfileComp },
]

export default createRouter({
    history: createWebHashHistory(),
    routes: routes
})