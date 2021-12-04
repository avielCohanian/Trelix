<template>
    <div id="app">
        <app-header  :createdBy="createdBy"/>
        <router-view class="main-layout"></router-view>

        <!-- <router-view /> -->
    </div>
</template>

<script>
import appHeader from '../src/cmp/app-header';

export default {
    data(){
        return{
createdBy:{
            _id: 'u104',
            username: 'Yael Oushky',
            mail: 'YaelOushky@gmail.com',
            fullname: 'Yael oushky',
            imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/yael_ypkjt9.jpg',
        },
        }
    },
   async created(){
        // try{
        //    await this.loadBoard()
        // }catch(err){
        //     console.log(err);
        // }
    },
    components: {
        appHeader,
    },
    computed:{
//         createdBy(){
//   var board =this.$store.getters.getBoard
//   if(board) return board.createdBy
        // }
    },
    methods:{
//    async loadBoard(boardId='b101'){
//         try {
//            var res = await this.$store.dispatch({ type: 'loadBoard', boardId })
//         } catch (err) {
//             console.log(err);
//         }
// }
    },
};
</script>
