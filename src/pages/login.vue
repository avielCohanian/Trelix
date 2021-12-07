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
.app-header{
    /* display: none; */
}
img {
  display: block;
  height: 43px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  margin-bottom: 40px;
}
.login-section {
  width: 100%;
  padding: 0px;
  overflow: visible;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container {
  max-width: 400px;
}
.login {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 585px;
  margin: 0 auto;
  position: relative;
  background-color: #ffffff;
  border-radius: 3px;
  padding: 25px 40px;
  box-shadow: rgb(0 0 0 / 10%) 0 0 10px;
}
strong.title {
  text-align: center;
  color: #5e6c84;
  font-size: 16px;
  letter-spacing: -0.01em;
  line-height: 28px;
  margin-top: 10px;
  margin-bottom: 25px;
}
input {
  background: #edeff0;
  box-sizing: border-box;
  border-radius: 3px;
  height: 44px;
  font-size: 14px;
  background-color: #fafbfc;
  border: 2px solid #dfe1e6;
  padding: 7px;
  max-width: 400px;
  margin: 0px 0px 16.5px;
}
button {
  border-radius: 4px;
  background: #61bd4f;
  color: #fff;
  border: none;
  padding: 8.4px 18.2px;
  height: 34px;
  width: 320px;
}
.or {
  text-align: center;
  font-size: 12px;
  margin-top: 16px;
  margin-bottom: 16px;
  margin: 16px 0px;
}
.google-btn{
    background: #fff;
    color: rgba(0,0,0,0.54);
    box-shadow: rgb(0 0 0 / 20%) 1px 1px 5px 0;
    border-color: transparent;
    text-align: center;
    border-radius: 3px;
    width: 99%;
    height: 39px;
    padding-top: 0;
    margin-bottom: 12px;
    font-size: 14px;
    margin: 0px 0px 12px;
}
.icon{
        /* background: url(https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/8215f66…/sign-in-with-google.svg) 0 50% no-repeat; */
}
.google-txt{
        display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    font-family: inherit;
    font-weight: bold;
    color: #505f79;
    padding: 3px;
    height: 32px;
    line-height: 32px;
}
hr.section-hr{  
    width: 320px;
    height: 2px;

    color: grey;
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid hsl(0,0%,80%);
    padding: 0;
    margin: 25px 0px 14px;
}
.signup{
        text-align: center;
    font-size: 14px;
    display: block;
    padding: 0;
    margin: 14px 0px;
    width: 320px;
    height: 18.36px;
}
a{
        text-decoration: none;
    color: #0052CC;
}
a:hover{
     text-decoration:underline;
}
.background{
      z-index: -900;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
}
</style>
