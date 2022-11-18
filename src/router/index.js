import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import accountRoutes from "./account.routes";
import usersRoutes from "./users.routes";
import referralsRoutes from "./referrals.routes";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  { ...accountRoutes },
  { ...usersRoutes },
  { ...referralsRoutes },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
