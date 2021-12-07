
// const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';
import { storageService } from './async-storage.service.js';
import axios from 'axios';
import { httpService } from './http.service.js';
const AUTH_URL =
    process.env.NODE_ENV !== 'development'
        ? '/api/auth'
        : 'http://localhost:3030/api/auth';
const USER_URL =
    process.env.NODE_ENV !== 'development'
        ? '/api/user'
        : 'http://localhost:3030/api/user';
const STORAGE_KEY = 'loggedinUser';


const USER_KEY = 'users';

export const userService = {
	logIn,
	logout,
    signup,
	changeFevorit,
	updateUser,
	query,
	remove,
	getById,
	getLoggedinUser
};
// async function logIn(userLog){
// 	try{
// 		const users =  await storageService.query(USER_KEY);
// 		return users.find( user =>user.username === userLog )
// 	}catch(err){
// 		throw err 
// 	}
// }
async function logIn(user) {
	console.log(user);
    try {
        const loginUser = await httpService.post('auth/login', user);
		console.log(loginUser);
        if (loginUser) {
            let sessionUser = {
                email: loginUser.email,
                fullname: loginUser.fullname,
            };
            console.log(sessionUser)
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
        }
        return loginUser;
    } catch (err) {
        console.log(err);
    }
}

async function signup(user) {
    console.log(user);
    try {
        const newUser = await httpService.post( 'auth/signup', user);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
       console.log(newUser);
		return newUser;
    } catch (err) {
        console.log(err);
    }
}

async function logout(user) {
    try {
        await httpService.post('auth/logout', user);
        sessionStorage.setItem(STORAGE_KEY, null);
        console.log('aa');
        return null;
    } catch (err) {
        console.log(err);
    }
}

async function query() {
    try {
        const users = await axios.get(AUTH_URL);
        return users.data;
    } catch (err) {
        console.log(err);
    }
}

async function remove(userId) {
    try {
        const removeUser = await axios.delete(USER_URL + '/' + userId);
        return removeUser;
    } catch (err) {
        console.log(err);
    }
}

async function getById(id) {
    try {
        const user = await axios.get(USER_URL + '/' + id);
        return user.data;
    } catch (err) {
        console.log(err);
    }
}
async function updateUser(user) {
    try {
        const user = await axios.put(AUTH_URL + '/' + user._id, user);
        return user.data;
    } catch (err) {
        console.log(err);
    }
}
// async function updateUser(user){
// 	try{
// 		const users =  await storageService.put(USER_KEY ,user);
// 		return users
// 	}catch(err){
// 		throw err 
// 	}
// }

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
}

async function changeFevorit(copyDetails){
	const { idBoard,isFavorit,userLog} =copyDetails
	try{
		if (isFavorit) {
			const idx = userLog.boards.starBoard.findIndex(boardId=>{
				return boardId === idBoard
			})
			const currIdboard = userLog.boards.starBoard.splice(idx,1)
			userLog.boards.boards.push(currIdboard[0])
		}
		else {
			const idx = userLog.boards.boards.findIndex(boardId=>{
				return boardId === idBoard
			})
			const currIdboard = userLog.boards.boards.splice(idx,1)
			userLog.boards.starBoard.push(currIdboard[0])
		}
		return await storageService.put(USER_KEY, userLog)
	}catch(err){
		throw err
	}
}
