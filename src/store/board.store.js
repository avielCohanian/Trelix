import { boardService } from '../service/board.service.js';
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'

export const boardStore = {
    state: {
        colors: {},
        imgs: {},
        currBoard: null,
        currCard: null,
        currGroup: null,
        // watchedUser: null,
        // currUser: userService.getLoggedinUser(),
    },
    getters: {
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
    },
    mutations: {
        setBoard(state, { board }) {
            state.currBoard = board;
        },
        cardById(state, { cardId }) {
            state.currBoard.groups.forEach((group) => {
                if (
                    group.cards.some((card) => {
                        if (card.id === cardId) {
                            state.currCard = card;
                            return card;
                        }
                    })
                )
                    state.currGroup = group;
            });
        },
        deleteGroup(state, { savedBoard }) {
            state.currBoard = savedBoard;
        },
        addImgsAndColor(state, { imgs, colors }) {
            state.imgs = imgs;
            state.colors = colors;
        },
    },
    actions: {
        loadImgsAndColor({ commit }) {
            commit({
                type: 'addImgsAndColor',
                imgs: boardService.getImgs(),
                colors: boardService.getColors(),
            });
        },
        async loadBoard({ commit }, { boardId }) {
            try {
                const board = await boardService.getById(boardId);
                // console.log(board);
                commit({ type: 'setBoard', board });
                return board;
            } catch (err) {
                console.log(err);
            }
        },

        async addCard({ commit, getters }, { newCard, groupId }) {
            try {
                const board = getters.getBoard;
                let updateBoard = await boardService.saveCard(
                    board,
                    groupId,
                    newCard
                );
                commit({ type: 'setBoard', board: updateBoard });
                return updateBoard;
            } catch (err) {
                console.log(err);
            }
        },
        async updateCard({ commit, getters }, { card }) {
            const board = getters.getBoard;
            const groupId = getters.currGroup.id;
            try {
                const updateBoard = await boardService.saveCard(
                    board,
                    groupId,
                    card
                );
                commit({ type: 'setBoard', board: updateBoard });
                return updateBoard;
            } catch (err) {
                console.log(err);
            }
        },

        async updateBoard({ commit }, { board }) {
            try {
                const updateBoard = await boardService.updatedBoard(board);
                commit({ type: 'setBoard', board: updateBoard });
            } catch (err) {
                throw err;
            }
        },
        async addGroup({ commit, getters }, { newGroup }) {
            console.log(newGroup);
            try {
                const board = getters.getBoard;
                var savedBoard = await boardService.addGroup(board, newGroup);
                console.log(savedBoard);
                commit({ type: 'board', board });
                return savedBoard;
            } catch (err) {
                console.log(err);
            }
        },
        async deleteGroup({ commit, getters }, { groupId }) {
            try {
                const board = getters.getBoard;
                var savedBoard = await boardService.deleteGroup(board, groupId);
                console.log(savedBoard);
                commit({ type: 'deleteGroup', savedBoard });
                return savedBoard;
            } catch (err) {
                console.log(err);
            }
        },
    },
};
