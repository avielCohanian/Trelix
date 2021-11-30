import axios from 'axios';
import { httpService } from './http.service';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';
var gWatchedUser = null;

// const AUTH_URL =
// 	process.env.NODE_ENV !== 'development'
// 		? '/api/auth'
// 		: 'http://localhost:3030/api/auth';

// const USER_URL =
// 	process.env.NODE_ENV !== 'development'
// 		? '/api/user'
// 		: 'http://localhost:3030/api/user';

// const STORAGE_KEY = 'loggedinUser';

export const userService = {
	login,
	logout,
	signup,
	getLoggedinUser,
	// query,
	getById,
	remove,
	update,
	getUsers,
};

// async function query() {
// 	try {
// 		const users = await axios.get(AUTH_URL);
// 		return users.data;
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

function getUsers() {
	// return storageService.query('user')
	return httpService.get(`user`);
}

async function remove(userId) {
	try {
		// const removeUser = await axios.delete(USER_URL + '/' + userId);
		// return removeUser;

		return httpService.delete(`user/${userId}`);
	} catch (err) {
		console.log(err);
	}
}

async function getById(userId) {
	try {
		// const user = await axios.get(USER_URL + '/' + id);
		// return user.data;

		const user = await httpService.get(`user/${userId}`);
		gWatchedUser = user;
		return user;
	} catch (err) {
		console.log(err);
	}
}

async function login(userCred) {
	try {
		const user = await httpService.post('auth/login', userCred);
		// socketService.emit('set-user-socket', user._id);
		if (user) return _saveLocalUser(user);
		// console.log(user);
		// const loginUser = await axios.post(AUTH_URL + '/login', user);
		// if (loginUser.data) {
		// 	let sessionUser = {
		// 		username: loginUser.data.username,
		// 		fullname: loginUser.data.fullname,
		// 	};
		// 	console.log(sessionUser);
		// }
		return loginUser.data;
	} catch (err) {
		console.log(err);
	}
}

async function signup(user) {
	try {
		// const newUser = await axios.post(AUTH_URL + '/signup', user);
		// sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
		// return newUser.data;

		const currUser = await httpService.post('auth/signup', user);
		// socketService.emit('set-user-socket', user._id);
		return _saveLocalUser(currUser);
	} catch (err) {
		console.log(err);
	}
}

async function update(user) {
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

async function logout() {
	try {
		// await axios.post(AUTH_URL + '/logout', user);
		// sessionStorage.setItem(STORAGE_KEY, null);
		// return null;

		sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
		// socketService.emit('unset-user-socket');
		return await httpService.post('auth/logout');
	} catch (err) {
		console.log(err);
	}
}

function getLoggedinUser() {
	// return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
	return JSON.parse(
		sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null'
	);
}

function _saveLocalUser(user) {
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
	return user;
}
