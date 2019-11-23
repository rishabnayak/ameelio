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
      name: "external",
      component: () => import("./views/External.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/inmate",
      name: "inmate",
      component: () => import("./views/Inmate.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("./views/Admin.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/add-contact-form",
      name: "addContactForm",
      component: () => import("./views/AddContactForm.vue"),
      meta: {
        requiresAuth: true
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
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = store.state.user
    if (user) {
      if (to.name == "profile") {
        next();
      } else {
        if (user.role) {
          next();
        } else {
          next({
            name: "profile"
          });
        }
      }
    }
    else {
      next({ name: 'login' })
    }
  }
  else {
    next()
  }
})

export default router;
