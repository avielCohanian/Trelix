import { boardService } from '../service/board.service.js';
import { userService } from '../service/user-service.js';
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'

export const userStore = {
    state: {
        userLog : null
    },
    getters: {
        getUserConnect(state){
            console.log(state.userLog);
            return state.userLog
        },
        
    },
    mutations: {
        logIn(state,{userLog}){
            state.userLog = userLog
            console.log(state.userLog);
        },
        changeFavorit(state,{updateUser}){
            state.userLog = updateUser
        }
        
    },
    actions: {
        async logIn({commit},{userName}){
            try{
                const userLog =await userService.logIn(userName)
                commit({type:'logIn',userLog})
            }catch(err){
                throw err
            }
        },
       async changeFavorit({commit,state,dispatch},{change}){
           console.log(change);
           try{
              const copyDetails= JSON.parse(JSON.stringify({idBoard:change.idBoard,isFavorit:change.isFavorit,userLog: state.userLog}))
               const updateUser = await userService.changeFevorit(copyDetails)
               commit({type:'changeFavorit',updateUser})
            //    this.userLog =userUp
               console.log(updateUser);

            }catch(err){
                throw err
            }
       }

    },
};
