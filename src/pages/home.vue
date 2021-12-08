<template>
    <section class="home" >
        <home-header />
         <section class="sign-up-home" >

        <div class="container-header-home">
        <div class="home-main">
        <h1 class="h1-home"> Trelix helps teams move work forward. </h1>
        <p> Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office,
             the way your team works is unique accomplish it all with Trello. </p>
             <label for="sign-up" class="sign-up-form">
                 <input type="email" name="sign-up" id="" placeholder="email" v-model="emailConnect" @keyup.enter="signUp">
                 <button type="submit" @click="signUp"> Sign up-it's free!</button>
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
           emailConnect:''
        };
    },
    created(){
        this.$store.dispatch({ type:'updateStyleHeader',color: null })
    },
    methods: {
        signUp(){
            // const email = this.emailConnect ? `/${this.emailConnect}` : '/signup'
           this.$router.push(`/signup/${this.emailConnect}`)
            this.emailConnect = ''
        },
        handleScroll(ev){
            console.log('ev',ev);
        }
    },
    components: {
        homeHeader
    },
}
</script>
<style scoped>
.conteiner-details{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 15px;
}
.conteiner-details h2 , .conteiner-details p{
    font-family: 'Charlie Display',sans-serif;
    margin-top: 0;
    text-align: center;
    font-size: 36px;
    max-width: 770px;

} 
.conteiner-details h2{
        font-size: 2.25rem;
    line-height: 1.33333333;
    margin-bottom: 0.5rem;
    font-weight: 600;
}
.conteiner-details p{
    margin-bottom: 1.5rem;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.5;
    color: #091e42;
    

}
.conteiner-details button{
        user-select: none;
    border: 1px solid #0065ff;
    color: #0065ff;
    background-color: rgba(255, 255, 255, 0.315);
    padding: 0.375rem 1.8rem;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: 6px;
    margin-bottom: 35px;
    

}
.img-details{
    background-image: url(https://res.cloudinary.com/trelix-casep21/image/upload/v1638958544/board_wgynmf.png);
    height: 780px;
    width: 1100px;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
