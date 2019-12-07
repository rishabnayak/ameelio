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
      path: "/add-contact-form",
      name: "addContactForm",
      component: () => import("./views/AddContactForm.vue"),
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
    {
      path:"/super-user",
      name: "superUserView",
      component: () => import("./views/superUser.vue"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path:"/admin-requests",
      name: "admin-requests",
      component: () => import("./views/AdminRequests.vue"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path:"/admin-calendar",
      name: "admin-calendar",
      component: () => import("./views/AdminCalendar.vue"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path:"/manage-prisons",
      name: "manage-prisons",
      component: () => import("./views/ManagePrisons.vue"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path:"/reports",
      name: "reports",
      component: () => import("./views/Reports.vue"),
      meta: {
        requiresAuth: false
      }
    },
    {
      path:"/admin-messages",
      name: "admin-messages",
      component: () => import("./views/AdminMessages.vue"),
      meta: {
        requiresAuth: false
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
