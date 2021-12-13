import { userService } from '../service/user-service.js';

export const userStore = {
  state: {
    users: null,
    currUser: userService.getLoggedinUser(),
    cmpDyn: null,
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
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
    },
    signUp(state, { currUser }) {
      state.currUser = currUser;
    },
    logout(state) {
      state.currUser = null;
    },
    getUsers(state, { currUsers }) {
      state.users = currUsers;
    },
    changeFavorit(state, { updateUser }) {
      state.currUser = updateUser;
    },
    steCmpDyn(state, { cmpDyn }) {
      state.cmpDyn = cmpDyn;
    },
  },
  actions: {
    async logIn({ commit, dispatch }, { user }) {
      try {
        const currUser = await userService.logIn(user);
        socketService.on(`updateUser${currUser._id}`, user =>{ dispatch({ type: 'logIn', user })});
        commit({ type: 'logIn', currUser });
        dispatch({ type: 'loadBoards' });
        return currUser;
      } catch (err) {
        throw err;
      }
    },
    async signUp({ commit }, { user }) {
      try {
        const currUser = await userService.signup(user);
        commit({
          type: 'signUp',
          currUser,
        });
        return currUser;
      } catch (err) {
        console.log(err);
      }
    },
    async getUsers({ state, commit }) {
      try {
        const currUsers = await userService.getUsers();
        commit({
          type: 'getUsers',
          currUsers,
        });
        return currUsers;
      } catch (err) {
        console.log(err);
      }
    },
    async logout({ state, commit }) {
      try {
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
      try {
        const updateUser = await userService.updateUser(currUser);
        commit({ type: 'logIn', user: updateUser });
      } catch (err) {
        throw err;
      }
    },

    async updateUserBoard({ commit }, { update }) {
      try {
        let user = await userService.updateUserBoard(update);
        console.log(user);
        // dispatch({ type: 'logIn', user });
        socketService.emit('updateUser', user);
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
      } catch (err) {
        throw err;
      }
    },
  },
};
