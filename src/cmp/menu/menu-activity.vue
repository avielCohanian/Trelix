<template>

        <section  class="container-activitys-cmp">
           <div class="activitys-cmp">
                 <div class="header-activity ">
                   <span class="material-icons-outlined logo-activity ">format_list_bulleted </span>
                   <h3> Activity </h3>
                   <div class="counter-activitis flex-center"> <h3> {{board.activities.length}} </h3> </div>
                </div>
               <ul v-for=" activity in board.activities " :key="activity.id">
                  <li class="activity-card">
                <div class=" headerMsg">
                   <div >
                   <avatar :size=32 :src="`${activity.byMember.imgUrl}`" ></avatar>
                   </div>
                   <h2 class="name"> {{activity.byMember.fullname}} <span class="desc-activity">{{activity.txt}}  in {{activity.card.title}}</span> </h2>  
                </div>
                <span class="time-ago"> {{ activity.createdAt | moment('from') }}</span>
                  </li>
               </ul> 
         </div>
        </section>
</template>
// added 
// joined
// moved
// attached
// pointer

<script>
import Avatar from 'vue-avatar'

export default {
   data(){
      return {
      }
   },
    props:{board:{type:Object}},
     components:{Avatar},
     
}
</script>

<style>


</style>