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

// Board
function updatedBoard(board, userConnect, type = 'makeChange', loc = { title: board.title, id: board._id }) {
  // console.log(board,userConnect,type,loc ,'upppp' )
  const copyBoard = JSON.parse(JSON.stringify(board));
  const copyUser = JSON.parse(JSON.stringify(userConnect));
  delete copyUser.boards;
  const newActivity = _getEmptyActivity(type, loc.title, loc.id, copyUser);
  copyBoard.activities.unshift(newActivity);

  return _updateService(copyBoard);
}

async function getBoardsForDisplay(userLog) {
  console.log(userLog);
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
    dueDate: { date: null, remind: '', isComplete: false },
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
  let idx = board.members.findIndex((member) => member.id === memberId);
  board.members.splice(idx, 1);
  return _updateService(board);
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

function getTemplates() {
  return templates;
}
const templates = [
  {
    _id: 'T1',
    title: 'Template 1',
    description: '',
    createdAt: Date.now(),
    createdBy: {
      _id: '61afea4a53b43917b4458706',
      fullname: 'p',
      username: 'p',
      email: 'p',
      imgUrl: '',
      boards: [],
    },
    style: {
      background: 'rgb(176, 70, 50)',
    },
    styleCustom: [],
    members: [
      {
        _id: '61afea4a53b43917b4458706',
        fullname: 'p',
        username: 'p',
        email: 'p',
        imgUrl: '',
        boards: [],
      },
      {
        _id: '61b0f7861ee5461954fdfb49',
        fullname: 'd',
        username: 'd',
        password: 'd',
        email: 'd',
        imgUrl: '',
        boards: {},
      },
    ],
    activities: [
      {
        id: 'sAZyLkZ',
        txt: 'add Board',
        createdAt: 1638986618042.0,
        byMember: {
          _id: '61afea4a53b43917b4458706',
          fullname: 'p',
          username: 'p',
          email: 'p',
          imgUrl: '',
          boards: [],
        },
        card: {
          id: '61b0f3791ee5461954fdfb45',
          title: 'Template 1',
        },
      },
    ],
    groups: [
      {
        style: {},
        cards: [
          {
            title: 'Mission\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [
              {
                _id: '61afea4a53b43917b4458706',
                fullname: 'p',
                username: 'p',
                email: 'p',
                imgUrl: '',
                boards: [],
              },
            ],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: Date.now(),
            byMember: null,
            style: {
              bgColor: '#EF7564',
              bgImg: null,
              bgUrl: null,
              isFull: true,
            },
            id: makeId(),
          },
        ],
        title: 'important',
        id: makeId(),
      },

      {
        style: {},
        cards: [
          {
            title: 'Mission\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: Date.now(),
            byMember: null,
            style: {
              bgColor: '#EF7564',
              bgImg: null,
              bgUrl: null,
              isFull: false,
            },
            id: makeId(),
          },
        ],
        title: 'in Development',
        id: makeId(),
      },
      {
        style: {},
        cards: [
          {
            title: 'Mission\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [
              {
                _id: '61afea4a53b43917b4458706',
                fullname: 'p',
                username: 'p',
                email: 'p',
                imgUrl: '',
                boards: [],
              },
            ],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: Date.now(),
            byMember: null,
            style: {
              bgColor: '#5BA4CF',
              bgImg: null,
              bgUrl: null,
              isFull: false,
            },
            id: makeId(),
          },
        ],
        title: 'Fronend',
        id: makeId(),
      },
      {
        style: {},
        cards: [
          {
            title: 'First mission',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: Date.now(),
            byMember: null,
            style: {
              bgColor: '#F5DD29',
              bgImg: null,
              bgUrl: null,
              isFull: false,
            },
            id: makeId(),
          },
        ],
        title: 'Backend',
        id: makeId(),
      },
      {
        style: {},
        cards: [
          {
            title: 'Mission\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [
                {
                  name: 'צילום מסך 2021-12-08 201842',
                  url: 'http://res.cloudinary.com/trelix-casep21/image/upload/v1638987529/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2021-12-08_201842_y3acvh.png',
                  upAt: 1638987530319.0,
                },
              ],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: Date.now(),
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
              bgUrl:
                'url(http://res.cloudinary.com/trelix-casep21/image/upload/v1638987529/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2021-12-08_201842_y3acvh.png)',
              isFull: false,
            },
            id: makeId(),
          },
        ],
        title: 'Ui',
        id: makeId(),
      },
      {
        style: {},
        cards: [
          {
            title: 'Mission\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: Date.now(),
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
            },
            id: makeId(),
          },
        ],
        title: 'in Testing',
        id: makeId(),
      },
      {
        style: {},
        cards: [
          {
            title: 'Mission\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: Date.now(),
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
            },
            id: makeId(),
          },
        ],
        title: 'Delivery',
        id: makeId(),
      },
    ],
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
  },

  {
    _id: '61b0f3791ee5461954fdfb45',
    title: 'Template 2',
    description: '',
    createdAt: Date.now(),
    createdBy: {
      _id: '61afea4a53b43917b4458706',
      fullname: 'p',
      username: 'p',
      email: 'p',
      imgUrl: '',
      boards: [],
    },
    style: {
      backgroundImage:
        'url(https://images.unsplash.com/photo-1549605659-32d82da3a059?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNzk3MjJ8MHwxfHNlYXJjaHw5fHxkZXZ8ZW58MHwwfHx8MTYzODk4ODAxOQ&ixlib=rb-1.2.1&q=85)',
    },
    styleCustom: [],
    members: [
      {
        _id: '61afea4a53b43917b4458706',
        fullname: 'p',
        username: 'p',
        email: 'p',
        imgUrl: '',
        boards: [],
      },
      {
        _id: '61b0f7861ee5461954fdfb49',
        fullname: 'd',
        username: 'd',
        password: 'd',
        email: 'd',
        imgUrl: '',
        boards: {},
      },
    ],
    activities: [
      {
        id: 'sAZyLkZ',
        txt: 'add Board',
        createdAt: 1638986618042.0,
        byMember: {
          _id: '61afea4a53b43917b4458706',
          fullname: 'p',
          username: 'p',
          email: 'p',
          imgUrl: '',
          boards: [],
        },
        card: {
          id: '61b0f3791ee5461954fdfb45',
          title: 'Template 1',
        },
      },
    ],
    groups: [
      {
        style: {},
        cards: [
          {
            title: 'Project Documents\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [
                {
                  name: '76023960',
                  url: 'http://res.cloudinary.com/trelix-casep21/image/upload/v1638996027/76023960_venc4s.jpg',
                  upAt: 1638996028346.0,
                },
              ],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: Date.now(),
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
              bgUrl: 'url(http://res.cloudinary.com/trelix-casep21/image/upload/v1638996027/76023960_venc4s.jpg)',
              isFull: false,
            },
            id: makeId(),
          },
          {
            title: 'Success Metrics\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: Date.now(),
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
            },
            id: makeId(),
          },
          {
            title: 'Please Agree\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: Date.now(),
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
            },
            id: makeId(),
          },
        ],
        title: 'Project Brief',
        id: makeId(),
      },
      {
        style: {},

        cards: [
          {
            title: 'Strategy Document\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [
                {
                  name: '1_ckYICeNC_eXNRhQT0EdCiw',
                  url: 'http://res.cloudinary.com/trelix-casep21/image/upload/v1638996430/1_ckYICeNC_eXNRhQT0EdCiw_dfokkh.jpg',
                  upAt: 1638996431692.0,
                },
              ],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: Date.now(),
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
              bgUrl:
                'url(http://res.cloudinary.com/trelix-casep21/image/upload/v1638996430/1_ckYICeNC_eXNRhQT0EdCiw_dfokkh.jpg)',
              isFull: false,
            },
            id: makeId(),
          },
          {
            title: 'Design Deliverables\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: Date.now(),
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
            },
            id: makeId(),
          },
          {
            title: 'Brand Guidelines\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: 1638996443911.0,
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
            },
            id: makeId(),
          },
        ],

        title: 'Brand Identity',
        id: makeId(),
      },
      {
        style: {},
        cards: [
          {
            title: 'Strategy Document\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [
                {
                  name: 'css-template-preview-82154',
                  url: 'http://res.cloudinary.com/trelix-casep21/image/upload/v1638996111/css-template-preview-82154_sy5ctt.jpg',
                  upAt: 1638996111940.0,
                },
              ],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: 1638996088585.0,
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
              bgUrl:
                'url(http://res.cloudinary.com/trelix-casep21/image/upload/v1638996111/css-template-preview-82154_sy5ctt.jpg)',
              isFull: true,
            },
            id: makeId(),
          },
          {
            title: 'User Research\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: 1638996100062.0,
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
            },
            id: makeId(),
          },
          {
            title: 'Information Architecture\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: 1638996132576.0,
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
            },
            id: makeId(),
          },
          {
            title: 'Design System\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: 1638996138058.0,
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
            },
            id: makeId(),
          },
          {
            title: 'Visual Design\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: 1638996143495.0,
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
            },
            id: makeId(),
          },
          {
            title: 'Interaction Design\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: 1638996150194.0,
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
            },
            id: makeId(),
          },
        ],
        title: 'Product Design',
        id: makeId(),
      },
      {
        style: {},
        cards: [
          {
            title: 'Sitemap\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [
                {
                  name: 'html-template-18610',
                  url: 'http://res.cloudinary.com/trelix-casep21/image/upload/v1638996184/html-template-18610_vpdgaw.jpg',
                  upAt: 1638996185046.0,
                },
              ],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: 1638996088586.0,
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
              bgUrl:
                'url(http://res.cloudinary.com/trelix-casep21/image/upload/v1638996184/html-template-18610_vpdgaw.jpg)',
              isFull: true,
            },
            id: makeId(),
          },
          {
            title: 'Visual Design\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: 1638996209035.0,
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
            },
            id: makeId(),
          },
          {
            title: 'Wireframes\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: 1638996170999.0,
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
            },
            id: makeId(),
          },
        ],
        title: 'Marketing Website',
        id: makeId(),
      },
      {
        style: {},
        cards: [
          {
            title: 'Mobile App Reviews\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [
                {
                  name: 'shutterstock_6408604_l',
                  url: 'http://res.cloudinary.com/trelix-casep21/image/upload/v1638996237/shutterstock_6408604_l_kkq9rd.jpg',
                  upAt: 1638996238362.0,
                },
              ],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: 1638996088588.0,
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
              bgUrl:
                'url(http://res.cloudinary.com/trelix-casep21/image/upload/v1638996237/shutterstock_6408604_l_kkq9rd.jpg)',
              isFull: false,
            },
            id: makeId(),
          },
          {
            title: 'Mobile App Reviews\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: 1638996226764.0,
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
            },
            id: makeId(),
          },
          {
            title: 'Marketing Website Reviews\n',
            attachment: {
              trelixAttachments: [],
              computerAttachment: [],
            },
            checklists: [],
            description: '',
            comments: [],
            members: [],
            labelIds: [],
            dueDate: { date: null, remind: '', isComplete: false },
            createdAt: 1638996253233.0,
            byMember: null,
            style: {
              bgColor: null,
              bgImg: null,
            },
            id: makeId(),
          },
        ],
        title: 'Client Reviews',
        id: makeId(),
      },
    ],
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
    color: {
      color: '#404059',
    },
  },
];
