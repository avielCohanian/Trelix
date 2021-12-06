import { utilService } from './util.service.js';
// import { upDownService } from '../../../main-services/upDown-service.js';
import { storageService } from './async-storage.service.js';
import { httpService } from './http.service.js';
import loader from 'sass-loader';
export const boardService = {
    getById,
    updatedBoard,
    getBoardsForDisplay,
    getEmptyBoard,
    getEmptyGroup,
    getGroupById,
    addGroup,
    saveGroup,
    getGroupByCardId,
    deleteGroup,
    updateCard,
    getEmptyCard,
    getColors,
    getLabelByCard,
    deleteCard,
    deleteMember,
    addCard,
    getEmptyChecklist,
    // saveGroups,
};

const BOARD_KEY = 'boards';

async function _updateService(board) {
    try {
        let currBoard = await httpService.put(`board/${board._id}`, board);
        return currBoard;
    } catch (err) {
        console.log(err);
    }
}

async function query() {
    try {
        // return await storageService.query(BOARD_KEY);
        return httpService.get(`board`);
    } catch (err) {
        console.log(err);
    }
}

// Board
function updatedBoard(board) {
    return _updateService(board);
    // return storageService.put(BOARD_KEY, board);
}
async function getBoardsForDisplay(userLog) {
    try {
        const boards = await query();
        var boardsStar = userLog.boards.starBoard.reduce((acc, boardId) => {
            const board = boards.find((board) => board._id === boardId);
            if (board) {
                acc.push({
                    _id: board._id,
                    title: board.title,
                    style: board.style,
                    members: board.members,
                });
            }
            return acc;
        }, []);
        var boardsUser = userLog.boards.boards.reduce((acc, boardId) => {
            console.log(boardId);
            const board = boards.find((board) => board._id === boardId);
            if (board) {
                acc.push({
                    _id: board._id,
                    title: board.title,
                    style: board.style,
                    members: board.members,
                });
            }
            return acc;
        }, []);
        return Promise.resolve({ boards: boardsUser, boardsStar });
    } catch (err) {
        throw err;
    }
}
async function getById(id) {
    console.log(id);
    try {
        const currBoard = await httpService.get(`board/${id}`);
        return Promise.resolve(currBoard);
    } catch (err) {
        console.log(err);
    }
    // return query().then((boards) => {
    //     let currBoards = boards.find((board) => board._id === id);
    //     return Promise.resolve(currBoards);
    // });
}

// Group

function addGroup(board, newGroup) {
    board = JSON.parse(JSON.stringify(board));
    newGroup.id = makeId();
    board.groups.push(newGroup);

    // return storageService.put(BOARD_KEY, board);
    return _updateService(board);
}

function deleteGroup(board, groupId) {
    //    var group = getGroupById(board,groupId)
    let idx = board.groups.findIndex((group) => group.id === groupId);
    board.groups.splice(idx, 1);
    // return storageService.put(BOARD_KEY, board);
    return _updateService(board);
}

function saveGroup(board, group) {
    let groupIdx = board.groups.findIndex((group1) => {
        return group1.id === group.id;
    });
    board.groups.splice(groupIdx, 1, group);
    // return storageService.put(BOARD_KEY, board);
    return _updateService(board);
}

// function saveGroups(board, groups) {
//     board.groups = groups;
//     // return storageService.put(BOARD_KEY, board);
//     return _updateService(board);
// }
function getEmptyGroup() {
    return {
        style: {},
        cards: [],
        title: '',
    };
}
function getGroupById(board, groupId) {
    console.log(board);
    var res = board.groups.find((group) => {
        return group.id === groupId;
    });
    return Promise.resolve(res);
}

// Card

function getEmptyCard() {
    return {
        title: '',
        attachment: {},
        checklists: [],
        description: '',
        comments: [],
        attachment: {
            trelixAttachments: null,
            computerAttachment: null,
        },
        members: [],
        labelIds: [],
        createdAt: Date.now,
        dueDate: null,
        byMember: {},
        style: {},
    };
}
async function addCard(board, groupId, newCard) {
    newCard.id = makeId();
    let groupIdx = board.groups.findIndex((group) => {
        return group.id === groupId;
    });
    board.groups[groupIdx].cards.push(newCard);

    try {
        // let currBoard = await httpService.put(`board/${board._id}`, board);
        return _updateService(board);
    } catch (err) {
        console.log(err);
    }
}
async function updateCard(board, cardToSave) {
    let groupIdx = board.groups.findIndex((group) => {
        return group.cards.some((c) => c.id === cardToSave.id);
    });
    let cardIx = board.groups[groupIdx].cards.findIndex((card) => {
        return card.id === cardToSave.id;
    });
    board = JSON.parse(JSON.stringify(board));
    board.groups[groupIdx].cards.splice(cardIx, 1, cardToSave);
    try {
        // let currBoard = await httpService.put(`board/${board._id}`, board);
        return _updateService(board);
    } catch (err) {
        console.log(err);
    }
}
async function getGroupByCardId(boardId, cardId) {
    try {
        let board = await query();

        board = board.find((board) => board._id === boardId);
        let group = board.groups.find((group) => {
            return group.cards.some((c) => c.id === cardId);
        });
        return group;
    } catch (err) {
        console.log(err);
    }
}
async function getLabelByCard(boardId, card) {
    try {
        let board = await query();

        board = board.find((board) => board._id === boardId);
        let carrLabels = [];
        board.labels.forEach((label) => {
            if (
                card.labelIds.some((labelId) => {
                    if (labelId.lId === label.id) {
                        label.idDone = labelId.isDone;
                        return true;
                    }
                })
            ) {
                carrLabels.push(label);
            }
        });
        return carrLabels;
    } catch (err) {
        console.log(err);
    }
}

function deleteMember(board, memberId) {
    //    var group = getGroupById(board,groupId)
    let idx = board.members.findIndex((member) => member.id === memberId);
    board.members.splice(idx, 1);
    // return storageService.put(BOARD_KEY, board);
    return _updateService(board);
}
function deleteCard(board, cardId) {
    let groupIdx = board.groups.findIndex((group) => {
        return group.cards.some((c) => c.id === cardId);
    });
    // let groupIdx = board.groups.findIndex((group) => group.id === groupId);
    let cardIdx = board.groups[groupIdx].cards.findIndex(
        (card) => card.id === cardId
    );
    board.groups[groupIdx].cards.splice(cardIdx, 1);
    // return storageService.put(BOARD_KEY, board);
    return _updateService(board);
}

function getEmptyChecklist() {
    return {
        id: makeId(),
        title: '',
        todos: [
            {
                id: makeId(),
                txt: '',
                isDone: false,
            },
        ],
    };
}

function getEmptyBoard() {
    return {
        title: '',
        description: '',
        createdAt: '',
        style: {},
        styleCustom: [],
        labels: [
            {
                id: 'l101',
                title: 'Done',
                color: '#eb5a46',
            },
            {
                id: 'l102',
                title: '',
                color: '#0079bf',
            },
            {
                id: 'l103',
                title: '',
                color: '#61bd4f',
            },
            {
                id: 'l104',
                title: '',
                color: '#f2d600',
            },
            {
                id: 'l105',
                title: '',
                color: '#ff9f1a',
            },
            {
                id: 'l106',
                title: '',
                color: '#c377e0',
            },
            {
                id: 'l1017',
                title: '',
                color: '#0098b7',
            },
        ],
        members: [],
        activities: [],
    };
}

function makeId(length = 5) {
    var text = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function getColors() {
    return colors;
}

const colors = {
    orange: { background: 'rgb(210, 144, 52)' },
    blue: { background: 'rgb(0, 121, 191)' },
    red: { background: 'rgb(176, 70, 50)' },
    green: { background: 'rgb(81, 152, 57)' },
    pink: { background: 'rgb(205, 90, 145)' },
    purple: { background: 'rgb(137, 96, 158)' },
    blueLight: { background: 'rgb(0, 174, 204)' },
    greenLight: { background: 'rgb(75, 191, 107)' },
    gray: { background: 'rgb(131, 140, 145)' },
};
