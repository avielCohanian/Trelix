import { httpService } from './http.service.js';
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
  addBoard,
  updateDuedate,
  getTemplates,
  createBoardTemp,
  addMember,
};
function _getEmptyActivity(txt = '', title = '', id, byMember = {}) {
  return {
    id: makeId(),
    cmmTxt: '',
    txt,
    createdAt: Date.now(),
    byMember,
    card: {
      id,
      title,
    },
  };
}
const BOARD_KEY = 'boards';
async function createBoardTemp(temp, copyUser) {
  temp.activities = [];
  temp.members = [];
  temp.createdBy = null;
  temp.activities = [];
  temp.activities = [];
  delete temp._id;
  return await addBoard(temp, copyUser);
}
async function addBoard(newBoard, userConnect) {
  let copyUser = JSON.parse(JSON.stringify(userConnect));
  copyUser.boards = [];
  try {
    newBoard.createdBy = copyUser;
    console.log(newBoard, 'newboard');
    newBoard.createdAt = Date.now();
    newBoard.members.push(copyUser);

    let currBoard = await httpService.post(`board`, newBoard);
    currBoard = currBoard.ops[0];
    let currNewBoard = await addActivity('add Board', currBoard, copyUser, {
      id: currBoard._id,
      title: currBoard.title,
    });
    return currNewBoard;
  } catch (err) {
    throw err;
  }
}
async function addActivity(txt, board, byUser, card) {
  let activity = _getEmptyActivity();
  let currBoard = board;
  activity.byMember = byUser;
  activity.txt = txt;
  activity.card = card;
  currBoard.activities.push(activity);
  try {
    let currNewBoard = await _updateService(currBoard);
    return currNewBoard;
  } catch (err) {
    console.log(err);
  }
}

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
    return httpService.get(`board`);
  } catch (err) {
    console.log(err);
  }
}

async function queryTemplate() {
  try {
    return httpService.get(`template`);
  } catch (err) {
    console.log(err);
  }
}
// Board
function updatedBoard(board, userConnect, type = 'makeChange', loc = { title: board.title, id: board._id }) {
  const copyBoard = JSON.parse(JSON.stringify(board));
  const copyUser = JSON.parse(JSON.stringify(userConnect));
  delete copyUser.boards;
  const newActivity = _getEmptyActivity(type, loc.title, loc.id, copyUser);
  copyBoard.activities.unshift(newActivity);

  return _updateService(copyBoard);
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
  try {
    const currBoard = await httpService.get(`board/${id}`);
    return Promise.resolve(currBoard);
  } catch (err) {
    console.log(err);
  }
}

// Group

function addGroup(board, newGroup) {
  board = JSON.parse(JSON.stringify(board));
  newGroup.id = makeId();
  board.groups.push(newGroup);
  return _updateService(board);
}

function deleteGroup(board, groupId) {
  let idx = board.groups.findIndex((group) => group.id === groupId);
  board.groups.splice(idx, 1);
  return _updateService(board);
}

function saveGroup(board, group) {
  let groupIdx = board.groups.findIndex((group1) => {
    return group1.id === group.id;
  });
  board.groups.splice(groupIdx, 1, group);
  return _updateService(board);
}

function getEmptyGroup() {
  return {
    style: {},
    cards: [],
    title: '',
  };
}
function getGroupById(board, groupId) {
  var res = board.groups.find((group) => {
    return group.id === groupId;
  });
  return Promise.resolve(res);
}

// Card

function getEmptyCard() {
  return {
    title: '',
    attachment: {
      trelixAttachments: [],
      computerAttachment: [],
    },
    checklists: [],
    description: '',
    comments: [],
    members: [],
    labelIds: [],
    dueDate: { date: { date: this.dueTime, time: this.dateTime }, remind: '', isComplete: false },
    createdAt: Date.now(),
    byMember: null,
    style: {
      bgColor: null,
      bgImg: null,
    },
  };
}
async function addCard(board, groupId, newCard) {
  newCard.id = makeId();
  let groupIdx = board.groups.findIndex((group) => {
    return group.id === groupId;
  });
  board.groups[groupIdx].cards.push(newCard);

  try {
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
  const copyBoard = JSON.parse(JSON.stringify(board));
  let idx = copyBoard.members.findIndex((member) => member._id === memberId);
  copyBoard.members.splice(idx, 1);
  return _updateService(copyBoard);
}
function addMember(board, member) {
  board.members.push(member);
  return _updateService(board);
}
function deleteCard(board, cardId) {
  let groupIdx = board.groups.findIndex((group) => {
    return group.cards.some((c) => c.id === cardId);
  });
  let cardIdx = board.groups[groupIdx].cards.findIndex((card) => card.id === cardId);
  board.groups[groupIdx].cards.splice(cardIdx, 1);
  return _updateService(board);
}

async function updateDuedate(board, newDone, card) {
  card.dueDate.isDone = newDone;
  let groupIdx = board.groups.findIndex((group) => {
    return group.cards.some((c) => c.id === card.id);
  });
  let cardIx = board.groups[groupIdx].cards.findIndex((card) => {
    return card.id === card.id;
  });
  board = JSON.parse(JSON.stringify(board));
  board.groups[groupIdx].cards.splice(cardIx, 1, card);
  try {
    return _updateService(board);
  } catch (err) {
    console.log(err);
  }
}

function getEmptyChecklist() {
  return {
    id: makeId(),
    title: '',
    todos: [],
  };
}

// activity

function getEmptyBoard() {
  return {
    title: '',
    description: '',
    createdAt: null,
    createdBy: null,
    style: {
      backgroundImage:
        'url(https://images.unsplash.com/photo-1477346611705-65d1883cee1e?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNzk3MjJ8MHwxfHNlYXJjaHwxfHxXYWxscGFwZXJzfGVufDB8MHx8fDE2Mzg3ODM4NTg&ixlib=rb-1.2.1&q=85)',
    },
    color: '#260c26',
    styleCustom: [],
    members: [],
    activities: [],
    groups: [],
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
  };
}

function makeId(length = 7) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
function getColors() {
  return colors;
}

const colors = [
  { background: 'rgb(210, 144, 52)' },
  { background: 'rgb(0, 121, 191)' },
  { background: 'rgb(176, 70, 50)' },
  { background: 'rgb(81, 152, 57)' },
  { background: 'rgb(205, 90, 145)' },
  { background: 'rgb(137, 96, 158)' },
  { background: 'rgb(0, 174, 204)' },
  { background: 'rgb(75, 191, 107)' },
  { background: 'rgb(131, 140, 145)' },
];

async function getTemplates() {
  const template = await queryTemplate();
  return template;
}
