<template>
  <section class="user-login main-layout">
    <img
      src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
    />
    <section class="login-section">
      <div class="login-container">
        <div class="login">
          <p><strong class="title"> Sign up for your account</strong></p>
          <div class="login-password-container">
            <el-input placeholder="Enter email" type="email" v-model="userToSignUp.email"> </el-input>
            <el-input placeholder="Enter full name" type="text" v-if="isLogin" v-model="userToSignUp.fullname"></el-input>
            <el-input placeholder="Enter password" type="password" v-if="isLogin" v-model="userToSignUp.password">
            </el-input>
            <p class="small">
              By signing up, you confirm that you've read and accepted our Terms
              of Service and Privacy Policy.
            </p>
            <button v-if="!isLogin" @click="toggle">
              <strong>Continue</strong>
            </button>
            <button v-if="isLogin" class="blue" @click="signUp">
              <strong>Sign Up</strong>
            </button>
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
            <a>Already have an account? Log in</a>
          </div>
        </div>
      </div>
      <div class="background">
        <div>
          <img src="../assets/img/login.svg" alt="" />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      isLogin: false,
      userToSignUp: "",
    };
  },
  created() {
    this.userToSignUp = this.getEmptyUser();
    this.$store.commit({ type: "updateStyleHeader", style: false });
  },
  methods: {
   async  signUp() {
      console.log(this.userToSignUp);
      this.userToSignUp.username = this.userToSignUp.fullname 
      try {
        var res = await this.$store.dispatch({
          type: "signUp",
          user: this.userToSignUp,
        });
        console.log(res);
        if (res) return this.$router.push(`/${res.username}/boards`)
      } catch (err) {
        console.log(err);
      }
    },
    toggle() {
      if (!this.userToSignUp.email) return
      this.isLogin = !this.isLogin;
    },
    getEmptyUser() {
      return {
        fullname: "",
        username: "",
        password: "",
        email: "",
        imgUrl: "",
        boards: {
          boards: [],
          starBoard: [],
        },
      };
    },
  },
};
</script>

<style  scoped>
</style>
