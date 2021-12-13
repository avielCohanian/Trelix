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
  updateUserBoard,
};

async function remove(userId) {
  try {
    return httpService.delete(`user/${userId}`);
  } catch (err) {
    console.log(err);
  }
}
function getUsers() {
  return httpService.get(`user/`, getUsers);
}
async function logIn(user) {
  try {
    const loginUser = await httpService.post('auth/login', user);
    if (loginUser) return _saveLocalUser(loginUser);
    return loginUser;
  } catch (err) {
    console.log(err);
  }
}
async function logout() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
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
    console.log(user._id);
    const CurrUser = await httpService.put(`user/${user._id}`, user);
    if (getLoggedinUser()._id === CurrUser._id) _saveLocalUser(CurrUser);
    console.log(CurrUser);
    return CurrUser;
  } catch (err) {
    console.log(err);
  }
}
function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
}

async function getById(userId) {
  try {
    // const user = await axios.get(USER_URL + '/' + id);
    // return user.data;

    const user = await httpService.get(`user/${userId}`);
    // gWatchedUser = user;
    return user;
  } catch (err) {
    console.log(err);
  }
}
async function updateUserBoard(update) {
  try {
    const user = await getById(update.userId);
    if (update.type) {
      user.boards.boards.push(update.boardId);
    } else {
      const idx = user.boards.boards.findIndex((board) => board === update.boardId);
      if (idx || idx === 0) {
        user.boards.boards.splice(idx, 1);
      } else {
        const idx = user.boards.starBoard.findIndex((board) => board === update.boardId);
        user.boards.starBoard.splice(idx, 1);
      }
    }
    console.log(user);
    return await updateUser(user);
  } catch (err) {
    throw err;
  }
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
