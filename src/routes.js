import Login from "./pages/Login";
import Register from "./pages/Register";
import HelloWorld from "./components/HelloWorld";
import PageNotFound from "./pages/PageNotFound"
import store from "./store/store";
import { AUTH_GETTERS } from "./store/getters/getters";

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters[AUTH_GETTERS.isAuthenticated]) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters[AUTH_GETTERS.isAuthenticated]) {
    next();
    return;
  }
  next("/login");
};

export default {
  mode: "history",

  routes: [
    {
      path: "/",
      component: HelloWorld,
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/login",
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/register",
      component: Register,
      beforeEnter: ifNotAuthenticated,
    },
    { path: "*", component: PageNotFound },
  ],
};
