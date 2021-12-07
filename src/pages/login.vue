<template>
  <section class="user-login main-layout">
    <img
      src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
    />
    <section class="login-section">
      <div class="login-container">
        <div class="login">
          <p><strong class="title"> Log in to Trelix</strong></p>
          <div class="login-password-container">
            <el-input
              placeholder="Enter email"
              type="email"
              v-model="userToLogIn.email"
            >
            </el-input>
            <el-input
              placeholder="Enter password"
              type="password"
              v-model="userToLogIn.password"
            >
            </el-input>
            <button @click="logIn"><strong>Log in</strong></button>
          </div>
          <div class="or">OR</div>
          <div class="google-btn">
            <span class="icon"></span>
            <strong class="google-txt">Continue with Google</strong>
          </div>
          <div class="google-btn">
            <span class="icon"></span>
            <strong class="google-txt">Continue with Facebook</strong>
          </div>

          <hr class="section-hr" />
          <div class="signup">
            <a href="">Sign up for an account</a>
          </div>
        </div>
      </div>
      <div class="background"></div>
    </section>
  </section>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      userToLogIn: "",
    };
  },
  created() {
    this.userToLogIn = this.getEmptyUserToCheck();
    this.$store.commit({ type: "updateStyleHeader", style: false });
  },
  methods: {
    
    getEmptyUserToCheck() {
      return {
        email: "",
        password: "",
      };
    },
    async logIn() {
      console.log(this.userToLogIn);
      try {
        var res = await this.$store.dispatch({
          type: "logIn",
          user: this.userToLogIn,
        });
        console.log(res);
        // console.log(res.username);
        // var username = this.$store.getters.getBoardsForDisplay.username
        if (res) return this.$router.push(`/${res.username}/boards`)
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
