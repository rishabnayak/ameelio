import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import firebase from "firebase";
import "firebase/auth";
import "firebaseui/dist/firebaseui.css";
import VueSidebarMenu from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
Vue.use(VueSidebarMenu);

Vue.config.productionTip = false
var app = null;
firebase.auth().onAuthStateChanged(async () => {
 if (!app) {
   await store.dispatch("setUser");
   new Vue({
     router,
     store,
     vuetify,
     render: h => h(App)
   }).$mount("#app");
 }
});
export const db = firebase.firestore();

