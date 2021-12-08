<template>
    <section class="user-login main-layout">
          <div class="logo"> <font-awesome-icon class="" :icon="[ 'fab', 'trello' ]" /> <strong>Trelix</strong></div>
        <!-- <img
        class="logo"
            src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
        /> -->
        <section class="login-section">
            <div class="login-container">
                <div class="login">
                    <p>
                        <strong class="title"> Log out of your Atlassian accounts</strong>
                    </p>
                    <div class="login-password-container">
                        <p class="profile">
                            <section class="avatar-container">
                                <div class="avatar-icon">
                                     <avatar
              v-if="userToLogout.imgUrl"
              :src="userToLogout.imgUrl"
              :size="72"
              :username="userToLogout.fullname"
              
            ></avatar>
            <avatar
              v-else
              :size="72"
              :username="userToLogout.fullname"
             
            ></avatar>
                                </div>
                            </section>
                            <section class="name-user">
                                <p class="name">{{userToLogout.fullname}}</p>
                           <p class="mail">{{userToLogout.email}}</p>
                            </section>
                        </p>
                        
                        
                        <button  class="blue" @click="signUp">
                            <strong>Log out</strong>
                        </button>
                    </div>
                    

                    <hr class="section-hr" />
                    <div class="signup">
                        <a @click="moveToLogin">Log in to another account</a>
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
import avatar from "vue-avatar";
export default {
  name: "logout",
  data() {
    return {
      isLogin: false,
      userToLogout: "",
    };
  },
  components:{
avatar
  },
  created() {
    this.userToLogout = this.$store.getters.getUserConnect;
    this.userToSignUp = this.getEmptyUser();
    this.$store.commit({ type: "updateStyleHeader", style: false });
  },

  methods: {
    moveToLogin() {
      this.$router.push("/login");
    },
    async signUp() {
      console.log(this.userToSignUp);
      this.userToSignUp.username = this.userToSignUp.fullname;
      try {
        var res = await this.$store.dispatch({
          type: "signUp",
          user: this.userToSignUp,
        });
        console.log(res);
        if (res) return this.$router.push(`/${res.username}/boards`);
      } catch (err) {
        console.log(err);
      }
    },
    toggle() {
      if (!this.userToSignUp.email) return;
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

