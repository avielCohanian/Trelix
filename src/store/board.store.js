import { boardService } from '../service/board.service.js';

export const boardStore = {
  state: {
    colors: {},
    currBoard: null,
    currCard: null,
    currGroup: null,
    boardsForDisplay: null,
    styleHeader: null,
    modal: true,
    isLabelOpen: false,
    // mouseEvents:[]
    // watchedUser: null,
    // currUser: userService.getLoggedinUser(),
  },
  getters: {
    // getMouseEvents(state){
    //   return state.mouseEvents
    // },
    getModalForDisplay(state) {
      return state.modal;
    },
    getStyleHeader(state) {
      return state.styleHeader;
    },
    getBoardsForDisplay(state) {
      return state.boardsForDisplay;
    },
    getBoard(state) {
      return state.currBoard;
    },
    getColors(state) {
      return state.colors;
    },
    getImgs(state) {
      return state.imgs;
    },
    currGroup(state) {
      return state.currGroup;
    },
    currCard(state) {
      return state.currCard;
    },
    boardLabels(state) {
      return state.currBoard.labels;
    },
    boardMembers(state) {
      return state.currBoard.members;
    },
    isLabelOpen(state) {
      return state.isLabelOpen;
    },
  },
  mutations: {
    // updateMouse(state,{mouseEvents}) {
    //   // console.log(isModal);
    //   state.mouseEvents = mouseEvents;
    // },
    updateModal(state, { isModal }) {
      state.modal = isModal;
    },
    updateIsLabelOpen(state, { isLabelOpen }) {
      state.isLabelOpen = isLabelOpen;
    },
    updateStyleHeader(state, { color }) {
      state.styleHeader = color;
    },
    removeStyleHeader(state) {
      state.styleHeader = null;
    },
    setBoard(state, { board }) {
      state.currBoard = board;
    },
    setdBoards(state, { boards }) {
      state.boardsForDisplay = boards;
    },
    setCard(state, { card }) {
      state.currCard = card;
    },

    setCardGroup(state, { card, group }) {
      state.currCard = card;
      state.currGroup = group;
    },
    deleteGroup(state, { savedBoard }) {
      state.currBoard = savedBoard;
    },
    addColors(state, { colors }) {
      state.colors = colors;
    },
  },
  actions: {
    addColors({ commit }) {
      commit({
        type: 'addColors',
        colors: boardService.getColors(),
      });
    },
    async loadBoard({ commit }, { boardId }) {
      commit({ type: 'updateStyleHeader', color: { background: 'rgba(0, 0, 0, 0.32)' } });

      try {
        const board = await boardService.getById(boardId);
        commit({ type: 'setBoard', board });
        return board;
      } catch (err) {
        console.log(err);
      }
    },

    async addCard({ commit, getters }, { newCard, groupId }) {
      try {
        const board = JSON.parse(JSON.stringify(getters.getBoard));
        let updateBoard = await boardService.addCard(board, groupId, newCard);
        socketService.emit('update', updateBoard);
        return updateBoard;
      } catch (err) {
        console.log(err);
      }
    },

    async updateCard({ commit, getters }, { card }) {
      const board = getters.getBoard;
      try {
        const updateBoard = await boardService.updateCard(board, card);
        // commit({ type: 'setCard', card });

        socketService.emit('updateCard', card);
        socketService.emit('update', updateBoard);

        return updateBoard;
      } catch (err) {
        console.log(err);
      }
    },

    async updateDuedate({ commit, getters }, { newDone, card }) {
      const board = JSON.parse(JSON.stringify(getters.getBoard));
      try {
        const updateBoard = await boardService.updateDuedate(board, newDone, card);
        commit({ type: 'setBoard', board: updateBoard });
        return updateBoard;
      } catch (err) {
        console.log(err);
      }
    },

    async updateGroup({ commit, getters }, { group }) {
      const board = JSON.parse(JSON.stringify(getters.getBoard));
      try {
        const updateBoard = await boardService.saveGroup(board, group);
        // socketService.emit('update', updateBoard);
        commit({ type: 'setBoard', board: updateBoard });
        return updateBoard;
      } catch (err) {
        console.log(err);
      }
    },
    async updateGroups({ commit, getters }, { groups }) {
      const board = JSON.parse(JSON.stringify(getters.getBoard));
      board.groups = groups;
      try {
        const updateBoard = await boardService.updatedBoard(board);
        commit({ type: 'setBoard', board: updateBoard });
        return updateBoard;
      } catch (err) {
        console.log(err);
      }
    },

    async updateBoard({ getters, commit }, { board }) {
      try {
        const updatedBoard = await boardService.updatedBoard(board, JSON.parse(JSON.stringify(getters.getUserConnect)));
        commit({ type: 'setBoard', board: updatedBoard });
        socketService.emit('update', updatedBoard);
      } catch (err) {
        throw err;
      }
    },

    async addGroup({ commit, getters }, { newGroup }) {
      try {
        const board = getters.getBoard;
        var savedBoard = await boardService.addGroup(board, newGroup);
        socketService.emit('update', savedBoard);
        // commit({ type: 'setBoard', board: savedBoard });
        return savedBoard;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteGroup({ commit, getters }, { groupId }) {
      try {
        const board = JSON.parse(JSON.stringify(getters.getBoard));
        var savedBoard = await boardService.deleteGroup(board, groupId);
        commit({ type: 'deleteGroup', savedBoard });
        return savedBoard;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteCard({ commit, getters }, { card }) {
      try {
        const board = JSON.parse(JSON.stringify(getters.getBoard));
        var savedBoard = await boardService.deleteCard(board, card.id);
        socketService.emit('update', savedBoard);
        // commit({ type: 'setBoard', board: savedBoard });
        return savedBoard;
      } catch (err) {
        console.log(err);
      }
    },
    async removeMember({ commit, getters }, { member }) {
      try {
        var savedBoard = await boardService.deleteMember(getters.getBoard, member._id);
        socketService.emit('update', savedBoard);

        // commit({ type: 'setBoard', board: savedBoard });
        // return savedBoard;
      } catch (err) {
        console.log(err);
      }
    },
    async addMember({ commit, getters }, { member }) {
      try {
        const board = JSON.parse(JSON.stringify(getters.getBoard));
        var savedBoard = await boardService.addMember(board, member);
        socketService.emit('update', savedBoard);

        // commit({ type: 'setBoard', board: savedBoard });
        return savedBoard;
      } catch (err) {
        console.log(err);
      }
    },
    async cardById({ state, commit }, { cardId }) {
      let currCard = null;
      const group = state.currBoard.groups.find((group) => {
        if (
          group.cards.some((card) => {
            if (card.id === cardId) {
              currCard = card;
              return card;
            }
          })
        )
          return group;
      });

      commit({ type: 'setCardGroup', card: currCard, group });
      return currCard;
    },
    async loadBoards({ commit, getters, dispatch }) {
      try {
        if (getters.getUserConnect.boards.boards.length || getters.getUserConnect.boards.starBoard.length) {
          const boards = await boardService.getBoardsForDisplay(getters.getUserConnect);
          commit({ type: 'setdBoards', boards });
        }
      } catch (err) {
        throw err;
      }
    },
    setActivity({ dispatch, getters }, { activity }) {
      const board = getters.getBoard;
      board.activities.push(activity);
      dispatch({ type: 'updateBoard', board });
    },
    async addLabel({ commit, getters }, { newLabel }) {
      const board = JSON.parse(JSON.stringify(getters.getBoard));
      if (!newLabel.id) {
        // newLabel.lId = utilService.makeId();
        board.labels.push(newLabel);
      } else {
        board.labels.forEach((l, idx) => {
          if (l.id === newLabel.id) board.labels.splice(idx, 1, newLabel);
        });
      }
      try {
        const updateBoard = await boardService.updatedBoard(board);

        commit({ type: 'setBoard', board: updateBoard });
      } catch (err) {
        console.log(err);
      }
    },
    addActivity({ getters, dispatch, commit }, { activity }) {
      let board = JSON.parse(JSON.stringify(getters.getBoard));
      // let board = getters.getBoard
      board.activities.unshift(activity);
      dispatch({ type: 'updateBoard', board });
    },
    // updateMouse({getters},{mouseEvent}){
    //   const userConnect = JSON.parse(JSON.stringify(getters.getUserConnect))
    //   mouseEvent.userConnect =userConnect
    //   console.log(mouseEvent);
    //   mouseEvent.boardId = getters.getBoard._id
    //   socketService.emit('updateMouse', mouseEvent);
    // }
  },
};
