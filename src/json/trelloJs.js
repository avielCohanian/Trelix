// Guidelines
// *. Support saving the entire board and also on the task level,
//    (no need for seperate APIs for mini-updates of task parts like members or status)
// *. No need for saving an activities array per task, those activities are easily filtered from the board activities
// *. activites - when board is updated, the frontend does not send the activities array within the board
//    instead it only sends a new activity object: {txt, boardId, groupId, taskId}
//    the backend adds this activity to the board with $push and can also emit socket notificatios
// *. D & D Guidelines - vuedraggable / react-beutiful-dnd
// *. Same model for Monday style app (do not implement a generic columns feature)
// *. boardStore no need for group/task stores
// *. We do not handle concurrent editing - needs versioning

// Rendering performance:
// Store Mutation - saveBoard
// state.board = board
// Later, support switching a specific task

// Cmp Mehotds:
function updateTask(cmpType, data) {
    Switch;
    task.members = data;
    task.status = data;
}

// Store - saveTask
function storeSaveTask(task, activity) {
    const activity = {
        id: makeId(),
        txt: 'Changed Color',
        createdAt: Date.now(),
        byMember: userService.getLoggedinUser(),
        task: task,
    };
    board = boardService.saveTask(boardId, groupId, task, activity);
    commit(board);
}

// boardService
function saveTask(boardId, groupId, task, activity) {
    const board = getById(boardId);
    // TODO: find the task, and update
    board.activities.unshift(activity);
    saveBoard(board);
    return board;
}

// boardStore-action
async function loadAndWatchBoard(boardId) {
    // load from service
    // subscribe to socket
}

// For Monday Mostly:
// Dynamic Components:
// TaskPreview <component :is="currCmp.type" :info="currCmp.info" @updated="updateTask(currCmp.type, $event)">
// const cmp1 = {
//     type: 'status-picker',
//     info: {
//         selectedStatus: 'pending',
//         statuses: [{}, {}]
//     }
// }

// const cmp2 = {
//     type: 'member-picker',
//     info: {
//         selectedMembers: ['m1', 'm2'],
//         members: ['m1', 'm2', 'm3']
//     }
// }
