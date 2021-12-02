<template>
<section>
<div class="activity">
<span class="material-icons-outlined">format_list_bulleted </span>
<h3> Activity </h3>
  <avatar  :size=70 :src="`${activity.img}`" ></avatar>
 <h2>{{activity.fullname}} </h2> <span>{{this.activity.event.do}} in: {{this.activity.event.in.board}} </span>

 <br>
 <span> {{ activity.time | moment('from') }}</span>
</div>

</section>
</template>
// added 
// joined
// moved
// attached

<script>
import Avatar from 'vue-avatar'

export default {
        props:{
                activitys:{
                        type:Array
                }
        },
     data(){
       return{
               activity:{time:Date.now() -1000000, fullname:'MOSHE ZOHAR',event:{do:'added',in:{board:'fsg',id:'c102'}},
                       img:'https://res.cloudinary.com/dshrwhc75/image/upload/v1638367919/luca-micheli-r9RW20TrQ0Y-unsplash_jnpfxx.jpg'}
       }
     },
     components:{
             Avatar
     }

}
</script>

<style>

</style>