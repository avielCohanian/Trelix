<template>
        <section class="home-header" >
            <nav>
                <div class="nav-list">
                    <div
                        class=" pointer flex-center">
                       <strong>  <font-awesome-icon class="logo" :icon="[ 'fab', 'trello' ]" /> </strong>
                        <strong class="logo-name"> Trelix</strong>
                    </div>
                    <div>
                        <button class="btn-homePage log-in" @click="logIn"> Log in  </button>
                        <button class="btn-homePage sign-up" @click="signUp"> Sign up </button>
                    </div>
                </div>
            </nav>
        </section>
</template>

<script>
export default {
    name: 'appHeader',
   methods:{
       signUp(){
           this.$router.push('/signup')
       },
       logIn(){
           this.$router.push('/login')
       }
   }
};
</script>