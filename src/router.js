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
        requiresAuth: true,
      }
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("./views/Admin.vue"),
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: "/user",
      name: "user",
      component: () => import("./views/User.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/profile/:uid",
      name: "otherprofile",
      component: () => import("./views/OtherProfile.vue"),
      meta: {
        requiresAuth: true,
        isAdmin: true
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
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/csvparsing",
      name: "csvparsing",
      component: () => import("./views/CSVParsing.vue")
    },
    {
      path: "/videocall",
      name: "videocall",
      component: () => import("./views/Comet.vue"),
      meta: {
        requiresAuth: false
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = store.state.user;
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
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.isAdmin)) {
    let user = store.state.user;
    if (user) {
      if (user.role == "Admin") {
        next();
      } else {
        next({
          name: "profile"
        });
      }
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
