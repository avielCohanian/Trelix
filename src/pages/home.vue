<template>
    <section class="home" >
        <home-header />
         <section class="sign-up-home" >

        <div class="container-header-home">
        <div class="home-main">
        <h1 class="h1-home"> Trelix helps teams move work forward. </h1>
        <p> Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office,
             the way your team works is unique accomplish it all with Trello. </p>
             <label for="sign-up" class="sign-up-form" >
                 <input type="email" name="sign-up" id="" placeholder="email" v-model="emailConnect" @keyup.enter="signUp" hidden>
                 <button type="submit" @click="signUp" hidden> Sign up-it's free!</button>
                 <button type="submit" @click="tryDemo" > Try Demo!</button>
             </label>
        </div>
        <div class="img-home"></div>
        </div>
        
        <div class="conteiner-details">
            <h2>It’s more than work. It’s a way of working together.</h2>
            <p>Start with a Trello board, lists, and cards. Customize and expand with more features as your teamwork grows. Manage projects, organize tasks, and build team spirit all in one place.</p>
            <button @click="signUp"> Start doing → </button>
            <div class="img-details">
            </div>
            </div>
        </section>
    </section>
</template>

<script>
// @ is an alias to /src
import homeHeader from '@/cmp/home-header.vue';

export default {
    name: 'home',
     data() {
        return {
           emailConnect:'',
           userDemo:{ password : "n" ,email : "nadirAkerman@gmail.com"}
    
        };
    },
    created(){
        this.$store.dispatch({ type:'updateStyleHeader',color: null })
    },
    methods: {
       async  tryDemo(){
      try {
        var res = await this.$store.dispatch({
          type: "logIn",
          user: this.userDemo,
        });
        console.log(res);
        if (res) return this.$router.push(`/${res.username}/boards`)
         this.$store.commit({
            type: 'updateStyleHeader',
            color: { background: ' #026AA7' },
        });
        //  this.$store.dispatch({ type:'updateStyleHeader',color: null })
      } catch (err) {
        console.log(err);
      }
        },
        signUp(){
            // const email = this.emailConnect ? `/${this.emailConnect}` : '/signup'
           this.$router.push(`/signup/${this.emailConnect}`)
            this.emailConnect = ''
        },
        handleScroll(ev){
            console.log('ev',ev);
        }
    },
    mounted(){

            this.$store.dispatch({ type:'updateStyleHeader',color: null })
    },
    components: {
        homeHeader
    },
}
</script>
