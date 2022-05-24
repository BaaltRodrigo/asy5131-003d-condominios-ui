import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Main from "../views/Main.vue";
import CobroIndex from "../views/cobros/CobroIndex";
import UserIndex from "../views/users/UserIndex";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    redirect: "home",
    component: Main,
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
      },
      {
        path: "usuarios",
        name: "Users",
        component: UserIndex,
      },
      {
        path: "cobros",
        name: "Cobros",
        component: CobroIndex,
      },
      {
        path: "about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
