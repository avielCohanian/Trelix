<template>
  <section class="edit-member" @click.stop>
    <header>
      <h2 ></h2>
      <a @click="closeModel" class="el-icon-close"> </a>
    </header>

    <!-- <input class="search" type="text" placeholder="Search members" v-model="filterMember" /> -->
    <h3 class="member-title">Board members</h3>
    <ul>
      <li v-for="member in members" :key="member._id" @click="updateMember(member)">
        <div class="curr-user">
          <avatar v-if="member.imgUrl" :src="member.imgUrl" :size="32" class="avatar"></avatar>
          <avatar v-else :username="member.fullname" class="avatar" :size="32"></avatar>

          <span class="user">
            <span>{{ member.fullname }}</span>
            <span>({{ member.username }})</span>
          </span>
        </div>

        <span class="check el-icon-check" v-if="boardMembers(member._id)"></span>
      </li>
    </ul>
  </section>
</template>

<script>
import avatar from 'vue-avatar';
export default {
  name: 'boardMember',
  data() {
    return {
      board:null,
      filterMember: '',
      members:null
    };
  },
  created(){
    this.getMembers()
  },
  
  methods: {
  async getMembers(){
        try {
        var users = await this.$store.dispatch({
          type: "getUsers"
        });
        console.log('back to board', users);
        return this.members = users
      } catch (err) {
        console.log(err);
      }
    },
    boardMembers(memberId) {
      const board = this.$store.getters.getBoard
      let currMembers = board.members;
      return currMembers.some((member) => member._id === memberId);
    },
   async updateMember(member) {
     try {
       const board = this.$store.getters.getBoard
          let id = board.members.find((memb) => {
           return memb._id === member._id});
            if(id) return 
        await this.$store.dispatch({
          type: "addMember",
          member
        });
      } catch (err) {
        console.log(err);
      }

    },
    closeModel() {
      this.$emit('closeModel');
    },
    
  },
  computed:{
    
  },
  watch:{
"$store.getters.getBoard"(){
  console.log('heloo');
}
  },
  components: {
    avatar,
  },
};
</script>

<style  scoped>
.edit-member{
  z-index :999;
}
</style>

