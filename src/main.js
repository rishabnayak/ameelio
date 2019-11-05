import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import firebase from "firebase";
import "firebase/auth";
import "firebaseui/dist/firebaseui.css";

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

firebase.initializeApp({
  apiKey: "AIzaSyBDN5UQB9hl_z_Nc6N3yC_dnnsCbJ-7tvs",
  authDomain: "ameelio-badeb.firebaseapp.com",
  databaseURL: "https://ameelio-badeb.firebaseio.com",
  projectId: "ameelio-badeb",
  storageBucket: "ameelio-badeb.appspot.com",
  messagingSenderId: "42596678946",
  appId: "1:42596678946:web:b20fab397e8d62ffa7797b",
  measurementId: "G-0GE5WZXYKH"
});

export const db = firebase.firestore();

