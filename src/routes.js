import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieLayout from "./layout/MovieLayout";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import PageNotFound from "./pages/PageNotFound";
import store from "./store/store";
import HelloWorld from "./components/HelloWorld";
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
      component: MovieLayout,
      children: [
        {
          path: "movie/:id",
          component: Movie,
        },
        {
          path: "/",
          component: Movies,
        }
      ]
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
    {
      path: "/create",
      component: HelloWorld,
      beforeEnter: ifAuthenticated,
    },
    { path: "*", component: PageNotFound },
  ],
};
