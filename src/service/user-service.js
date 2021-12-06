
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';
import { storageService } from './async-storage.service.js';



const USER_KEY = 'users';

export const userService = {
	logIn,
	changeFevorit,
	updateUser
};
async function logIn(userLog){
	try{
		const users =  await storageService.query(USER_KEY);
		return users.find( user =>user.username === userLog )
	}catch(err){
		throw err 
	}
}
async function updateUser(user){
	try{
		const users =  await storageService.put(USER_KEY ,user);
		return users
	}catch(err){
		throw err 
	}


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
