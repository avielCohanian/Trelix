
import { utilService } from './util.service.js';
// import { upDownService } from '../../../main-services/upDown-service.js';
import { storageService } from './async-storage.service.js';
export const boardService = {
    getById,
    // query,
    // createNote,
    // changeIsDone,
    // getYoutubeResult,
    // remove,
    // save,
    // makeId,
    // connectGoogleApi,
    // saveCanvas,
    // copyNote,
    // pinnedNote

}


const BOARD_KEY = 'boards';

function getById(id){
    return query().then(boards => {
        let currBoards = boards.find(board => board._id === id)
        return Promise.resolve(currBoards) 
})
        
}
function saveCanvas(canvas, note) {
    return upDownService.uploadImg(canvas)
        .then(urlImg => {
            console.log('upload success', urlImg)
            note.info.canvas.url = urlImg
            return save(note)
                .then(res => {
                    console.log('upload and save success', res)
                })
        })
}




function query() {
    return storageService.query(BOARD_KEY)
    // .then(res => {
        // console.log(res);
            // return Promise.resolve(res)

    //     if (res.length) {
    //         return res
    //     } else {
    //         utilService.saveToStorage(BOARD_KEY, );
    //         return Promise.resolve(BOARD_KEY)
    //     }
    // })
}


function save(note) {
    if (note.id) return storageService.put(BOARD_KEY, note);
    else return storageService.post(BOARD_KEY, note);
}

function remove(noteId) {
    return query().then(notes => {
        const idx = notes.findIndex((note) => note.id === noteId);
        notes.splice(idx, 1);
        utilService.saveToStorage(BOARD_KEY, notes);
    })
}
// function changeNote(updateNote){
//     query().then(notes => {


//     }
// }
function createNote(note) {
    console.log(note);
    return storageService.post(BOARD_KEY, note)
}


// function getById(noteID) {
//     return storageService.get(BOARD_KEY, noteID);
// }

// function changeIsDone(is, id, idx) {
//     return getById(id)
//         .then(note => {
//             note.info.todos[idx].isDone = is
//             return save(note).then(note => {
//                 if (note.info.todos[idx].isDone) {
//                     console.log(note.info.todos[idx].isDone);
//                     return Promise.resolve('is done')
//                 } else {
//                     return Promise.resolve('is not done')
//                 }
//             })
//         })

// }


// function getYoutubeResult(value = 'binyamin netanyahu') {
//     const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyCQ6tXHw7h_o4k-qIIjjfQoIP2avTDx2No&q=${value}`
//     return axios.get(url)
//         .then(res => res.data)
// }

// function connectGoogleApi() {
//     if (window.google) return Promise.resolve()
//     const API_KEY = 'AIzaSyCQ6tXHw7h_o4k-qIIjjfQoIP2avTDx2No';
//     var elGoogleApi = document.createElement('script');
//     elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBs7t_yPGVD1cd2HsAoLMiOZjC_l9vbPlA`;
//     elGoogleApi.async = true;

//     document.body.append(elGoogleApi);
//     return new Promise((resolve, reject) => {
//         elGoogleApi.onload = resolve;
//         elGoogleApi.onerror = () => reject('Google script failed to load')
//     })
// }

function makeId(length = 5) {
    var text = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
