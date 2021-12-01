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
        addCard(state, {savedBoard}){
            state.currBoard = savedBoard
        },
        addGroup(state, {savedBoard}){
            state.currBoard = savedBoard
        },
        deleteGroup(state, {savedBoard}){
            state.currBoard = savedBoard
        },
    },
    actions: {
        async loadBoard({commit},{boardId}) {
            try {
                const board = await boardService.getById(boardId);
                // console.log(board);
                commit({ type: 'setBoard', board });
                return board
            } catch (err) {
                console.log(err);
            }
        },

          async addCard({commit, getters}, {newCard, groupId}){
              console.log(newCard);
              try{
                const board = getters.getBoard 
                var savedBoard = await boardService.addCard(board,groupId,newCard)
                console.log(savedBoard);
                commit({type : "addCard" , savedBoard})
                return savedBoard
              }catch(err){
                  console.log(err)
              }
            },
        
        async updateBoard({commit},{board}){
               try{
                const updateBoard = await boardService.updatedBoard(board)
                commit({type:'setBoard',board:updateBoard})
               }
               catch(err){
               throw err 
               }

           },
          async addGroup({commit, getters}, {newGroup}){
              console.log(newGroup);
              try{
                const board = getters.getBoard 
                var savedBoard = await boardService.addGroup(board,newGroup)
                console.log(savedBoard);
                commit({type : "addGroup" , savedBoard})
                return savedBoard
              }catch(err){
                  console.log(err)
              }
            },
           async deleteGroup({commit, getters}, {groupId}){
            try{
                const board = getters.getBoard 
                var savedBoard = await boardService.deleteGroup(board,groupId)
                console.log(savedBoard);
                commit({type : "deleteGroup" , savedBoard})
                return savedBoard
              }catch(err){
                  console.log(err)
              }
           }
    },
};
