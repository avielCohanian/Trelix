<template>
  <section class="user-login main-layout">
     <div class="logo"> <font-awesome-icon class="" :icon="[ 'fab', 'trello' ]" /> <strong>Trelix</strong></div>
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
          <!-- <div class="or">OR</div>
          <div class="google-btn" >
            <span class="icon"></span>
            <strong class="google-txt"> <span class="icon-g">Continue with Google</span></strong>
          </div>
          <div class="google-btn">
            <span class="icon"></span>
            <strong class="google-txt">Continue with Facebook</strong>
          </div> -->

          <hr class="section-hr" />
          <div class="signup pointer">
            <a  @click="moveToSignup">Sign up for an account</a>
          </div>
        </div>
      </div>
     <div class="background">
                <div class="left">
                    <img src="../assets/img/login.svg" alt="" />
                </div>
                <div class="right">
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
      userToLogIn: "",
    };
  },
  created() {
    this.userToLogIn = this.getEmptyUserToCheck();
    this.$store.commit({ type: "updateStyleHeader", style: false });
  },
  methods: {
    moveToSignup(){
    this.$router.push("/signup")
    },
    getEmptyUserToCheck() {
      return {
        email: "",
        password: "",
      };
    },
    async logIn() {
      console.log(this.userToLogIn);
      try {
        var user = await this.$store.dispatch({
          type: "logIn",
          user: this.userToLogIn,
        });
        if (user) return this.$router.push(`/${user.username}/boards`)
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
