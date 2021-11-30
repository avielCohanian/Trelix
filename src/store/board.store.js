import { boardService } from '../service/board.service.js';
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'

export const boardStore = {
    state: {
        currBoard: '',
        // watchedUser: null,
        // currUser: userService.getLoggedinUser(),
    },
    getters: {
        getBoard(state) {
            return state.currBoard;
        },
    },
    mutations: {
        setBoard(state, {board}) {
            state.currBoard = board;
        },
    },
    actions: {
        async loadBoard({commit},{boardId}) {
            try {
                const board = await boardService.getById(boardId);
                console.log(board);
                commit({ type: 'setBoard', board });
                return board
            } catch (err) {
                console.log(err);
            }
        },

        //   async loadBoard({commit}){
        //       try{
        //         const board = await boardService.query()
        //         commit({type : "setBoard" , board})
        //       }catch(err){
        //           console.log(err)
        //       }
        //     }
    },
};
