import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
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
      path: "/videocall/:uid",
      path: "/videocall",
      name: "videocall",
      component: () => import("./views/Comet.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/manageprisons",
      name: "manageprisons",
      component: () => import("./views/ManagePrisons.vue"),
      meta: {
        requiresAuth: true,
        isSuperUser: true
      },
    },
    {
      path: '/csv',
      name: 'csv',
      component: () => import("./views/CSV.vue"),
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.isSuperUser)) {
    let user = store.state.user;
    if (user) {
      if (user.role == "SuperUser") {
        next();
      } else {
        next({
          name: "home"
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
