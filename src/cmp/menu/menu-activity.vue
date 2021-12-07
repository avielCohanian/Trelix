<template>
   <section class="container-activitys-cmp">
      <div class="activitys-cmp">
         <div class="header-activity">
            <span class="material-icons-outlined logo-activity"
               >format_list_bulleted
            </span>
            <h3>Activity</h3>
            <div class="counter-activitis flex-center">
               <h3>{{ board.activities.length }}</h3>
            </div>
         </div>
         <ul v-for="activity in board.activities" :key="activity.id">
            <li class="activity-card">
               <div class="headerMsg">
                  <div>
                     <avatar
                     v-if="activity.byMember &&activity.byMember.imgUrl"
                        :size="32"
                        :src="`${activity.byMember.imgUrl}`"
                     ></avatar>
                      <avatar
                     v-else
                        :size="32"
                        :username="`${activity.byMember.fullname}`"
                     ></avatar>
                  </div>
                  <h2 class="name">
                     {{ activity.byMember.fullname }}
                     <span class="desc-activity"
                        >{{ activity.txt }} in {{ activity.card.title }}</span>
                  </h2>
               </div>
               <span class="time-ago">
                  {{ activity.createdAt | moment("from") }}</span>
            </li>
         </ul>
      </div>
   </section>
</template>

<script>
import Avatar from "vue-avatar";

export default {
   data() {
      return {};
   },
   props: { board: { type: Object } },
   components: { Avatar },
};
</script>

<style>
</style>