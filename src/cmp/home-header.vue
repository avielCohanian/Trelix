<template>
    <section class="home">
        <section class="home-header" >
            <nav>
                <div class="nav-list">
                    <!-- <i class="el-icon-s-grid"></i> -->

                    <div
                        class=" pointer flex-center">
                       <strong>  <font-awesome-icon class="logo" :icon="[ 'fab', 'trello' ]" /> </strong>
                        <strong class="logo-name"> Trelix</strong>
                    </div>
                    <div>
                        <button class="btn-homePage log-in"> Log in  </button>
                        <button class="btn-homePage sign-up"> Sign up </button>
                    </div>
                </div>
            </nav>
        </section>
        <section class="sign-up-home">

        <div class="container-header-home">
        <div class="home-main">
        <h1 class="h1-home"> Trello helps teams move work forward. </h1>
        <p> Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office,
             the way your team works is unique accomplish it all with Trello. </p>
             <label for="sign-up" class="sign-up-form">
                 <input type="email" name="sign-up" id="" placeholder="email" v-model="emailConnect" @keyup.enter="signUp">
                 <button type="submit" @click="signUp"> Sign up-it's free!</button>
             </label>
        </div>
        <div class="img-home"></div>
        </div>

        
        </section>
    </section>

</template>

<script>
export default {
    name: 'appHeader',
    data() {
        return {
           emailConnect:''
        };
    },
    computed: {
      
    },
   
    methods: {
       
        signUp(ev){
            console.log(this.emailConnect);
            console.log(ev);
            this.emailConnect = ''
        }
    },
};
</script>

<style>
.home-header .nav-list {
    width: 100vw;
    padding: 16px 40px;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
}
.sign-up{
    background-color: #0051cc;
    color: #ffffff;
    font-weight: 500;
        padding: 0.25rem 0.5rem;
    font-size: 1.09375rem;
    line-height: 1.5;
    border-radius: 0.2rem;
}
.log-in{
    color: #0e68fc;
    background-color: rgba(255, 248, 220, 0);
}
.btn-homePage{
    border: none;
    width: 80px;
    height: 36.8px;
    border-radius: 2px;
      padding: 0.25rem 0.5rem;
    font-size: 1.09375rem;
    line-height: 1.5;
    border-radius: 0.2rem;
}
.logo-name {
    font-weight: 700;
    margin-left: 10px;
    padding: 0;
    font-size: 30px;
}

.main-header {
    background-color: brown;
    display: flex;
    height: 70px;
}
.logo  {
    font-size: 25px;
    /* color: #0c61dc; */
}

.sign-up-home{
    }
.container-header-home{
    /* padding-top: 250px 10px; */
    padding-top: 90px;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 120vh;
    background-color:#eeebff ;
    overflow-x: hidden;
    overflow-y: hidden;

    
}
.home-main{
    max-width: 665px;
    font-family: 'Charlie Text',sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #091e42;
    padding: 0 15px;

}
.home-main p {
        display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin-top: 0;
    margin-bottom: 1.5rem;
}
.h1-home{
    font-size: 3rem;
    line-height: 1.25;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-family: 'Charlie Display',sans-serif;
    font-weight: 500;
    margin-left: 0;
    /* text-align: center; */
        color: inherit;
    /* margin-block-start: 0.83em;
    margin-block-end: 0.83em;
        margin-inline-start: 0px;
    margin-inline-end: 0px;
    text-align: center;
        margin-top: 0;
    margin-bottom: 0.5rem;
    font-family: 'Charlie Display',sans-serif;
    font-weight: 500; */
}
.sign-up-form{
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.sign-up-form input{
    width: 60%;
    height: auto;
    padding: 0.375rem 0.75rem;
    font-size: 1.25rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 6px;
    /* margin: 0 8px 0 15px; */
    margin-right: 15px;
}
.sign-up-form button{
    width: 40%;
       font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: 6px;
    background-color: #0056d9;
        border-color: #0051cc;
            color: #fff;
    /* margin: 0 15px 0 8px; */

}
.img-home{
    background-image: url(https://res.cloudinary.com/trelix-casep21/image/upload/v1638874188/hero_kdhf4a.png);
    background-size: cover;
    background-repeat: no-repeat;
    width: 450px;
    height: 575px;

}
</style>
