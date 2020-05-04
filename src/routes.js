import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieLayout from "./layout/MovieLayout";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import CreateMovie from "./pages/CreateMovie";
import PageNotFound from "./pages/PageNotFound";
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
      component: MovieLayout,
      children: [
        {
          path: "movie/:id",
          component: Movie,
        },
        {
          path: "/movies/create",
          component: CreateMovie,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/",
          component: Movies,
        },
      ],
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
