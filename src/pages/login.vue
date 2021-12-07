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
            <el-input placeholder="Enter email" > </el-input>
            <el-input placeholder="Enter password" > </el-input>
            <button><strong>Log in</strong></button>
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
            <a href="">Sign up for an account</a>
        </div>
        </div>
      </div>
      <div class="background">
          
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
};
</script>

<style>

</style>
