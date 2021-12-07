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
            <el-input placeholder="Enter email" > </el-input>
            <p class="small">By signing up, you confirm that you've read and accepted our Terms of Service and Privacy Policy.</p>
            <button><strong>Continue</strong></button>
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
        
        <hr class="section-hr">
        <div class="signup">
            <a  >Already have an account? Log in</a>
        </div>
        </div>
      </div>
      <div class="background">
          <div>
          <img src="../assets/img/login.svg" alt="">
              
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
      user: {
        fullname: "",
        username: "",
        password: "",
      },
      isLogin: false,
    };
  },
  created(){
    this.$store.commit({type:'updateStyleHeader',style: false})
  }
};
</script>

<style  scoped>



</style>
