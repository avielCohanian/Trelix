import { boardService } from '../service/board.service.js';
import { userService } from '../service/user-service.js';
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'

export const userStore = {
  state: {
    currUser: userService.getLoggedinUser(),
    cmpDyn: null,
  },
  getters: {
    getUserConnect(state) {
      return state.currUser;
    },
    cmpDyn(state) {
      return state.cmpDyn;
    },
  },
  mutations: {
    logIn(state, { currUser }) {
      state.currUser = currUser || userService.getLoggedinUser();
      console.log(state.currUser);
    },
    signUp(state, { currUser }) {
      state.currUser = currUser;
    },
    logout(state) {
      state.currUser = null;
    },
    changeFavorit(state, { updateUser }) {
      state.currUser = updateUser;
    },
    steCmpDyn(state, { cmpDyn }) {
      console.log(cmpDyn);
      state.cmpDyn = cmpDyn;
    },
  },
  actions: {
    async logIn({ commit }, { user }) {
      console.log('user', user);
      try {
        const currUser = await userService.logIn(user);
        commit({ type: 'logIn', currUser });
        return currUser;
      } catch (err) {
        throw err;
      }
    },
    async signUp({ commit }, { user }) {
      try {
        console.log(user);
        const currUser = await userService.signup(user);
        commit({
          type: 'signUp',
          currUser,
        });
        console.log(currUser);
        return currUser;
      } catch (err) {
        console.log(err);
      }
    },
    async logout({ state, commit }) {
      try {
        console.log('here');
        const currUser = await userService.logout(state.currUser);
        commit({
          type: 'logout',
          currUser,
        });
        return currUser;
      } catch (err) {
        console.log(err);
      }
    },
    async updateUser({ commit }, { currUser }) {
      console.log('updateUser ', currUser);
      try {
        const updateUser = await userService.updateUser(currUser);
        console.log('up', updateUser);
        commit({ type: 'logIn', user: updateUser });
      } catch (err) {
        throw err;
      }
    },
    async changeFavorit({ commit, state, dispatch }, { change }) {
      try {
        const copyDetails = JSON.parse(
          JSON.stringify({
            idBoard: change.idBoard,
            isFavorit: change.isFavorit,
            currUser: state.currUser,
          })
        );
        const updateUser = await userService.changeFevorit(copyDetails);
        commit({ type: 'changeFavorit', updateUser });
        //    this.currUser =userUp
      } catch (err) {
        throw err;
      }
    },
  },
};
