<template>
  <div class="card text-white bg-dark col-sm-4 offset-md-4" style="marginTop:25px">
    <div class="card-header text-center">
      <h4>Sign In</h4>
    </div>
    <div class="card-body">
      <form @submit.stop.prevent="login">
        <div class="form-group">
          <label for="userName">Email</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">@</span>
            </div>
            <input
              class="form-control mr-sm-2"
              v-model="user.email"
              type="email"
              placeholder="Enter email"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label for="userEmail">Password</label>
          <input
            class="form-control mr-sm-2"
            v-model="user.password"
            type="password"
            placeholder="Enter password"
            required
          />
        </div>
        <div class="text-center">
          <span
            v-show="!!loginMessage"
            class="badge"
            :class="{'badge-danger': loginError, 'badge-success': !loginError}"
          >{{ loginMessage }}</span>
        </div>
        <div class="text-center">
          <router-link to="#" class="nav-link" style="color:red">Forgot password?</router-link>
        </div>
        <div class="text-center">
          <router-link to="/register" class="nav-link">Don't have account? Register here.</router-link>
        </div>
        <div class="text-center">
          <input class="btn btn-info btn-lg" type="submit" value="Login" />
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { AUTH_ACTIONS } from "../store/actions/actions";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: null,
        password: null
      },
      loginMessage: "",
      loginError: false
    };
  },
  methods: {
    checkForm() {
      if (String(this.user.email).length > 255) {
        this.loginError = true;
        this.loginMessage = "Email must be less than 255 characters";
        return false;
      }

      this.loginMessage = "";
      this.loginError = false;
      return true;
    },
    login() {
      if (this.checkForm()) {
        this.$store
          .dispatch(AUTH_ACTIONS.LOGIN_REQUEST, this.user)
          .then(() => {
            this.$router.push("/");
          })
          .catch(err => {
            let errorMessage =
              "Error: " + err.response.statusText + " " + err.response.status;
            this.loginMessage = errorMessage;
            this.loginError = true;
          });
      }
    }
  }
};
</script>
