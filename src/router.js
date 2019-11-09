import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
      meta: {
        requiresAuth: false
      }
    },
    /*
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Register.vue"),
      meta: {
        requiresAuth: false
      }
    },
    */
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = store.state.user;
    if (user) {
      if (to.name == "profile") {
        next();
      } else {
        if (user.companyName) {
          next();
        } else {
          next({
            name: "profile"
          });
        }
      }
    } else {
      next({
        name: "login"
      });
    }
  } else {
    next();
  }
});

export default router;
