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
            v-validate="'required|max:255'"
            class="form-control"
            id="userName"
            name="username"
            placeholder="Enter name"
            v-model="user.name"
          />
          <small v-show="errors.has('username')" class="text-danger">{{ errors.first('username') }}</small>
        </div>
        <div class="form-group">
          <label for="userEmail">Email</label>
          <input
            v-validate="'email|required|max:255'"
            data-vv-as="email"
            type="text"
            name="email"
            class="form-control"
            id="userEmail"
            placeholder="Enter email"
            v-model="user.email"
          />
          <small v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</small>
        </div>
        <div class="form-group">
          <label for="userPassword">Password</label>
          <input
            v-validate="'required|min:6'"
            name="password"
            type="password"
            class="form-control"
            id="userPassword"
            placeholder="Enter password"
            v-model="user.password"
            ref="password"
          />
          <small v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</small>
        </div>
        <div class="form-group">
          <label for="userRepeatPassword">Repeat password</label>
          <input
            v-validate="'required|confirmed:password'"
            data-vv-as="password"
            class="form-control"
            name="password_confirmation"
            type="password"
            id="userRepeatPassword"
            placeholder="Repeat password"
          />
          <small
            v-show="errors.has('password_confirmation')"
            class="text-danger"
          >{{ errors.first('password_confirmation') }}</small>
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
      if (String(this.user.name).length > 255) {
        this.registerError = true;
        this.registerMessage = "Name must be less than 255 characters";
        return false;
      }
    },
    registerUser() {
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$store
            .dispatch(AUTH_ACTIONS.REGISTER_REQUEST, this.user)
            .then(() => {
              this.registerError = false;
              this.registerMessage =
                "User with email:" +
                this.user.email +
                " registered successfully";
            })
            .catch(err => {
              let errorMessage =
                "Error: " + err.response.statusText + " " + err.response.status;
              this.registerMessage = errorMessage;
              this.registerError = true;
            });
        } else {
          this.registerMessage = "";
          this.registerError = false;
        }
      });
    }
  }
};
</script>
