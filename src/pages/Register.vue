<template>
  <div class="text-white bg-dark col-sm-4 offset-md-4" style="marginTop:25px">
    <div class="card-header text-center">
      <h4>Sign Up</h4>
    </div>
    <div class="card-body">
      <form @submit.stop.prevent="registerUser">
        <div class="form-group">
          <label for="userName">Name</label>
          <input
            type="text"
            class="form-control"
            id="userName"
            placeholder="Enter name"
            v-model="user.name"
            required
          />
        </div>
        <div class="form-group">
          <label for="userEmail">Email</label>
          <input
            required
            type="email"
            class="form-control"
            id="userEmail"
            placeholder="Enter email"
            v-model="user.email"
          />
        </div>
        <div class="form-group">
          <label for="userPassword">Password</label>
          <input
            required
            name="password"
            type="password"
            class="form-control"
            id="userPassword"
            placeholder="Enter password"
            v-model="user.password"
          />
        </div>
        <div class="form-group">
          <label for="userRepeatPassword">Repeat password</label>
          <input
            required
            class="form-control"
            name="password_confirmation"
            type="password"
            id="userRepeatPassword"
            placeholder="Repeat password"
            v-model="repeatPassword"
          />
        </div>
        <div class="text-center">
          <span
            v-show="!!registerMessage"
            class="badge"
            :class="{'badge-danger': registerError, 'badge-success': !registerError}"
          >{{ registerMessage }}</span>
        </div>
        <div class="text-center">
          <router-link to="/login" class="nav-link">Go back to login?</router-link>
        </div>
        <div class="text-center">
          <input class="btn btn-info btn-lg" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { AUTH_ACTIONS } from "../store/actions/actions";

export default {
  name: "Register",
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null
      },
      repeatPassword: null,
      registerMessage: "",
      registerError: false
    };
  },
  methods: {
    checkForm() {
      if (this.user.password != this.repeatPassword) {
        this.registerError = true;
        this.registerMessage = "Password must match repeated password";
        return false;
      }
      if (String(this.user.password).length < 6) {
        this.registerError = true;
        this.registerMessage = "Password must contain at least 6 characters";
        return false;
      }
      if (String(this.user.name).length > 255) {
        this.registerError = true;
        this.registerMessage = "Name must be less than 255 characters";
        return false;
      }
      if (String(this.user.email).length > 255) {
        this.registerError = true;
        this.registerMessage = "Email must be less than 255 characters";
        return false;
      }

      this.registerMessage = "";
      this.registerError = false;
      return true;
    },
    registerUser() {
      if (this.checkForm()) {
        this.$store
          .dispatch(AUTH_ACTIONS.REGISTER_REQUEST, this.user)
          .then(() => {
            this.registerMessage =
              "User with email:" + this.user.email + " registered successfully";
          })
          .catch(err => {
            let errorMessage =
              "Error: " + err.response.statusText + " " + err.response.status;
            this.registerMessage = errorMessage;
            this.registerError = true;
          });
      }
    }
  }
};
</script>
