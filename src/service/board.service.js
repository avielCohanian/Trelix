import { utilService } from './util.service.js';
// import { upDownService } from '../../../main-services/upDown-service.js';
import { storageService } from './async-storage.service.js';
export const boardService = {
    getById,
    getGroupById,
    saveCard,
    getEmptyCard,
    updatedBoard,
    getEmptyGroup,
    addGroup,
    getColors,
    getImgs,
    deleteGroup,
};

const BOARD_KEY = 'boards';

function getById(id) {
    return query().then((boards) => {
        let currBoards = boards.find((board) => board._id === id);
        return Promise.resolve(currBoards);
    });
}

function getGroupById(board, groupId) {
    console.log(board);
    var res = board.groups.find((group) => {
        return group.id === groupId;
    });
    return Promise.resolve(res);
}

function addCard(board, groupIdx, newCard) {
    newCard.id = makeId();
    board.groups[groupIdx].cards.push(newCard);

    return storageService.put(BOARD_KEY, board);
}

function updateCard(board, groupIdx, cardToSave) {
    let cardIx = board.groups[groupIdx].cards.findIndex((card) => {
        return card.id === cardToSave.id;
    });
    board.groups[groupIdx].cards.splice(cardIx, 1, cardToSave);
    return storageService.put(BOARD_KEY, board);
}

function saveCard(board, groupId, card) {
    let groupIdx = board.groups.findIndex((group) => {
        return group.id === groupId;
    });
    board = JSON.parse(JSON.stringify(board));
    card = card.id
        ? updateCard(board, groupIdx, card)
        : addCard(board, groupIdx, card);
    return card;
}

function deleteGroup(board, groupId) {
    //    var group = getGroupById(board,groupId)
    let idx = board.groups.findIndex((group) => group.id === groupId);
    board.groups.splice(idx, 1);
    return storageService.put(BOARD_KEY, board);
}
function addGroup(board, newGroup) {
    board = JSON.parse(JSON.stringify(board));
    newGroup.id = makeId();
    board.groups.push(newGroup);

    return storageService.put(BOARD_KEY, board);
}

function getEmptyCard() {
    return {
        title: '',
    };
}

function getEmptyGroup() {
    return {
        style: {},
        cards: [],
        title: '',
    };
}

function query() {
    return storageService.query(BOARD_KEY);
}
function updatedBoard(board) {
    return storageService.put(BOARD_KEY, board);
}
function save(note) {
    if (note.id) return storageService.put(BOARD_KEY, note);
    else return storageService.post(BOARD_KEY, note);
}

function remove(noteId) {
    return query().then((notes) => {
        const idx = notes.findIndex((note) => note.id === noteId);
        notes.splice(idx, 1);
        utilService.saveToStorage(BOARD_KEY, notes);
    });
}

function createNote(note) {
    console.log(note);
    return storageService.post(BOARD_KEY, note);
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
function getImgs() {
    return imgs;
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
const imgs = {
    pic1: {
        backgroundImage:
            'url(https://res.cloudinary.com/dshrwhc75/image/upload/v1638367875/greg-rakozy-oMpAz-DN-9I-unsplash_wccuwf.jpg)',
    },
    pic2: {
        backgroundImage:
            'url(https://res.cloudinary.com/dshrwhc75/image/upload/v1638367876/nasa-1lfI7wkGWZ4-unsplash_jzvyg1.jpg)',
    },
    pic3: {
        backgroundImage:
            'url(https://res.cloudinary.com/dshrwhc75/image/upload/v1638367877/kunal-shinde--f0YLss50Bs-unsplash_agacft.jpg)',
    },
    pic4: {
        backgroundImage:
            'url(https://res.cloudinary.com/dshrwhc75/image/upload/v1638367912/casey-horner-4rDCa5hBlCs-unsplash_x0crec.jpg)',
    },
    pic5: {
        backgroundImage:
            'url(https://res.cloudinary.com/dshrwhc75/image/upload/v1638367918/denys-nevozhai-UzagqG756OU-unsplash_hpcahv.jpg)',
    },
    pic6: {
        backgroundImage:
            'url(https://res.cloudinary.com/dshrwhc75/image/upload/v1638367919/luca-micheli-r9RW20TrQ0Y-unsplash_jnpfxx.jpg)',
    },
    pic7: {
        backgroundImage:
            'url(https://res.cloudinary.com/dshrwhc75/image/upload/v1638367176/chris-karidis-nnzkZNYWHaU-unsplash_1_ralbng.jpg)',
    },
};