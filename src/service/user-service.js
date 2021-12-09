// const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';
import { httpService } from './http.service.js';
const AUTH_URL = process.env.NODE_ENV !== 'development' ? '/api/auth' : 'http://localhost:3030/api/auth';
const USER_URL = process.env.NODE_ENV !== 'development' ? '/api/user' : 'http://localhost:3030/api/user';
const STORAGE_KEY = 'loggedinUser';

export const userService = {
  logIn,
  logout,
  signup,
  changeFevorit,
  updateUser,
  remove,
  getLoggedinUser,
  getUsers,
};

async function remove(userId) {
  try {
    // const removeUser = await axios.delete(USER_URL + '/' + userId);
    // return removeUser;

    return httpService.delete(`user/${userId}`);
  } catch (err) {
    console.log(err);
  }
}
function getUsers() {
  // return storageService.query('user')
  return httpService.get(`user`);
}
async function logIn(user) {
  // console.log(user);
  try {
    const loginUser = await httpService.post('auth/login', user);
    // console.log(loginUser);
    if (loginUser) return _saveLocalUser(loginUser);
    // if (loginUser) {
    //     // let sessionUser = {
    //     //     email: loginUser.email,
    //     //     fullname: loginUser.fullname,
    //     // };
    //     console.log(sessionUser)
    //     sessionStorage.setItem(STORAGE_KEY, JSON.stringify(loginUser));
    // }
    return loginUser;
  } catch (err) {
    console.log(err);
  }
}
async function logout() {
  try {
    // await axios.post(AUTH_URL + '/logout', user);
    // sessionStorage.setItem(STORAGE_KEY, null);
    // return null;
    sessionStorage.removeItem(STORAGE_KEY);
    // socketService.emit('unset-user-socket');
    return await httpService.post('auth/logout');
  } catch (err) {
    console.log(err);
  }
}
function _saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

async function signup(user) {
  console.log(user);
  try {
    const newUser = await httpService.post('auth/signup', user);
    return _saveLocalUser(newUser);
  } catch (err) {
    console.log(err);
  }
}

async function updateUser(user) {
  try {
    // const user = await axios.put(AUTH_URL + '/' + user._id, user);
    // return user.data;

    user = await httpService.put(`user/${user._id}`, user);
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user);
    return user;
  } catch (err) {
    console.log(err);
  }
}

function getLoggedinUser() {
  // return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
}

async function changeFevorit(copyDetails) {
  const { idBoard, isFavorit, currUser } = copyDetails;
  try {
    if (isFavorit) {
      const idx = currUser.boards.starBoard.findIndex((boardId) => {
        return boardId === idBoard;
      });
      const currIdboard = currUser.boards.starBoard.splice(idx, 1);
      currUser.boards.boards.push(currIdboard[0]);
    } else {
      const idx = currUser.boards.boards.findIndex((boardId) => {
        return boardId === idBoard;
      });
      const currIdboard = currUser.boards.boards.splice(idx, 1);
      currUser.boards.starBoard.push(currIdboard[0]);
    }
    return await updateUser(currUser);
  } catch (err) {
    throw err;
  }
}
