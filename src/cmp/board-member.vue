<template>
<section class="board-member">
  <section class="edit-member" @click.stop>
    <header>
      <h3 >Invite to board</h3>
      <a @click="closeModel" class="el-icon-close pointer"> </a>
    </header>

    <!-- <input class="search" type="text" placeholder="Search members" v-model="filterMember" /> -->
    <!-- <h3 class="member-title">Board members</h3> -->
    <ul>
      <li v-for="member in members" :key="member._id" @click="updateMember(member)">
        <div class="curr-user pointer">
          <avatar v-if="member.imgUrl" :src="member.imgUrl" :size="32" class="avatar"></avatar>
          <avatar v-else :username="member.fullname" class="avatar" :size="32"></avatar>

          <span class="user">
            <span>{{ member.fullname }}</span>
            <!-- <span>({{ member.username }})</span> -->
          </span>
        </div>

        <span class="check el-icon-check" v-if="boardMembers(member._id)"></span>
      </li>
    </ul>
  </section>
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
        
        await this.$store.dispatch({
          type: "updateUserBoard",
          update:{ userId: member._id , type: true ,boardId:board._id }
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


<style lang="scss" scoped>
.board-member {
      position: absolute;
    top: 50px;
    left: 533px;
  z-index: 99;
    // position: fixed;
    z-index: 50;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 8px 16px -4px #091e4240, 0 0 0 1px #091e4214;
    // top: 0px;
    // right: 0;
    width: 305px;
    header {
      height: 40px;
      margin-bottom: 8px;
      position: relative;
      text-align: center;
      h3 {
        border-bottom: 1px solid #091e4221;
        box-sizing: border-box;
        // color: $clr6;
        display: block;
        line-height: 40px;
        margin: 0 12px;
        overflow: hidden;
        padding: 0 32px;
        position: relative;
        text-overflow: ellipsis;
        font-size: rem(14px);
        font-weight: 400;
        text-transform: capitalize;
      }
      a {
        cursor: pointer;
        color: #6b778c;
        padding: 10px 12px 10px 8px;
        position: absolute;
        right: 0;
        top: 10%;
      }
      ul{
        display: flex;
        flex-direction: column;
        li:not(.avatar-logo){
         
        }
        li{
          display: flex;
          align-items: center;
          
        
          }
      }
    }

}
.nav-board li:not(.avatar-logo){
 justify-content: space-between;
          margin: 4px;
}
</style>

