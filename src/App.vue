<template>
  <div id="app">
    <app-header />
    <router-view class="main-layout"></router-view>
  </div>
</template>

<script>
import appHeader from '../src/cmp/app-header';
import {socketService} from './service/socket.service.js'

export default {
  data() {
    return {
      loadUser: false,
    };
  },
  created(){
       
    //  socketService.on('update board',this.msg)
    //     socketService.on('update board', msg=>{console.log(msg)})

  },
  methods: {
    updateBoard(updateBoard){
        this.$store.commit({ type: 'setBoard', board: updateBoard }); 
    }
  },
//   async created() {
//     try {
//       await this.$store.dispatch({ type: 'logIn', user: { email: 'p', password: 'p' } });
//       this.loadUser = true;
//     } catch (err) {
//       console.log(err);
//     }
//   },
  components: {
    appHeader,
  },
  computed: {},
  watch:{
    '$store.getters.getBoard'(){
      if (this.$store.getters.getBoard) {
         socketService.on(`update${this.$store.getters.getBoard._id}`, this.updateBoard)
        
      }

    }
  }
};
</script>
