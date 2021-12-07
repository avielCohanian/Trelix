<template>
    <div id="app">
        <app-header  />
        <router-view class="main-layout" ></router-view>
    </div>
</template>

<script>
import appHeader from '../src/cmp/app-header';

export default {
    data(){
        return{
            loadUser:false,
<<<<<<< HEAD
            createdBy:{
                _id: 'u104',
                username: 'Yael Oushky',
                mail: 'YaelOushky@gmail.com',
                fullname: 'Yael oushky',
                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/yael_ypkjt9.jpg',
            },
=======
>>>>>>> 8a176ad6788cf0711bf2f2102a9a39c5c951c5ac
        }
    },
   async created(){
        try{
           await this.$store.dispatch({type:'logIn',user:{email:'p',password:'p'}})
           this.loadUser= true
        }catch(err){
            console.log(err);
        }
    },
    components: {
        appHeader,
    },
    computed:{
    },
    methods:{
    },
};
</script>
