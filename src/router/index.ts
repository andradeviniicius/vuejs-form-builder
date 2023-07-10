// Composables
import { createRouter, createWebHistory } from "vue-router";

function getFormDataFromLocalStorage() {
  const formData = window.localStorage.getItem("registeredForms");
  return formData ? JSON.parse(formData) : [];
}

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    meta: { transition: "fade" },
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
    ],
  },
  {
    path: "/forms/:id",
    component: () => import("@/layouts/default/Default.vue"),
    meta: { transition: "slide-right" },
    children: [
      {
        path: "",
        name: "EditFormPage",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/EditFormPage.vue"),
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/views/404Page.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
