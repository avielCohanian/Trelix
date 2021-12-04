export const storageService = {
    query,
    get,
    post,
    put,
    remove,
};
const boards = [
    {
        _id: 'b101',
        title: 'Sprint 4',
        description: '',
        createdAt: 1589983468418,
        createdBy: {
            _id: 'u104',
            username: 'Yael Oushky',
            mail: 'YaelOushky@gmail.com',
            fullname: 'Yael oushky',
            imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/yael_ypkjt9.jpg',
        },
        style: {
            backgroundImage:
                'url(https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNzk3MjJ8MHwxfHNlYXJjaHwzfHxXYWxscGFwZXJzfGVufDB8MHx8fDE2Mzg2NDIyNDI&ixlib=rb-1.2.1&q=85)',
        },
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

        members: [
            {
                _id: 'u102',
                mail: 'AvielCohanian@gmail.com',
                fullname: 'Aviel Cohanian',
                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466703/user/Aviel_xnwzxj.jpg',
            },
            {
                _id: 'u103',
                username: 'hunter',
                mail: 'EliGranat@gmail.com',
                fullname: 'Eli Granat',
                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/eli_rsut8n.png',
            },
            {
                _id: 'u104',
                username: 'oushky',
                mail: 'YaelOushky@gmail.com',
                fullname: 'Yael oushky',
                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/yael_ypkjt9.jpg',
            },
        ],
        groups: [
            {
                style: {},
                id: 'g101',
                title: 'Backlog',
                cards: [
                    {
                        id: 'c107',
                        title: 'Creat git repository',
                        description: 'backend',
                    },
                    {
                        id: 'c108',
                        title: 'Upload to heroku',
                        description: 'backend',
                    },
                ],
            },

            {
                id: 'g102',
                title: 'In progress',
                cards: [
                    {
                        id: 'c103',
                        title: 'PWA push notification',
                        description: 'backend',
                    },
                    {
                        id: 'c104',
                        title: 'Dashboard',
                        description: 'description',
                        comments: [
                            {
                                id: 'ZdPnm',
                                txt: 'also @yaronb please CR this',
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Tal Tarablus',
                                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                                },
                            },
                        ],
                        attachment: {
                            trelixAttachments: null,
                            computerAttachment: null,
                        },
                        checklists: [
                            {
                                id: 'YEhmF',
                                title: 'Checklist',
                                todos: [
                                    {
                                        id: '212jX',
                                        txt: 'To Do 1',
                                        isDone: false,
                                    },
                                ],
                            },
                            {
                                id: 'Xsldsd',
                                title: 'DoToDo',
                                todos: [
                                    {
                                        id: 'cds9a',
                                        txt: 'To Do 2',
                                        isDone: false,
                                    },
                                    {
                                        id: 'wdwds9a',
                                        txt: 'To Do 3',
                                        isDone: true,
                                    },
                                ],
                            },
                        ],
                        members: [
                            {
                                _id: 'u101',
                                username: 'Tal',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                            {
                                _id: 'u102',
                                fullname: 'Aviel Cohanian',
                                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466703/user/Aviel_xnwzxj.jpg',
                            },
                            {
                                _id: 'u103',
                                username: 'hunter',
                                fullname: 'Eli Granat',
                                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/eli_rsut8n.png',
                            },
                            {
                                _id: 'u104',
                                username: 'oushky',
                                fullname: 'Yael oushky',
                                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/yael_ypkjt9.jpg',
                            },
                        ],
                        labelIds: [
                            { lId: 'l101', isDone: 'false' },
                            { lId: 'l102', isDone: 'true' },
                        ],
                        createdAt: 1590999730348,
                        dueDate: 16156215211,
                        byMember: {
                            _id: 'u101',
                            username: 'Tal',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                        style: {
                            bgColor: '#26de81',
                        },
                    },
                    {
                        id: 'c105',
                        title: 'Connect mongoDB',
                        description: 'backend',
                        comments: [
                            {
                                id: 'ZdPnm',
                                txt: 'also @yaronb please CR this',
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Tal Tarablus',
                                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                                },
                            },
                        ],
                        attachment: {
                            trelixAttachments: null,
                            computerAttachment: null,
                        },
                        checklists: [
                            {
                                id: 'Xsldsd',
                                title: 'DoToDo',
                                todos: [
                                    {
                                        id: 'cds9a',
                                        txt: 'To Do 2',
                                        isDone: false,
                                    },
                                    {
                                        id: 'wdwds9a',
                                        txt: 'To Do 3',
                                        isDone: true,
                                    },
                                ],
                            },
                        ],
                        members: [
                            {
                                _id: 'u102',
                                fullname: 'Aviel Cohanian',
                                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466703/user/Aviel_xnwzxj.jpg',
                            },
                            {
                                _id: 'u103',
                                username: 'hunter',
                                fullname: 'Eli Granat',
                                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/eli_rsut8n.png',
                            },
                            {
                                _id: 'u104',
                                username: 'oushky',
                                fullname: 'Yael oushky',
                                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/yael_ypkjt9.jpg',
                            },
                        ],
                        labelIds: [
                            { lId: 'l101', isDone: 'false' },
                            { lId: 'l102', isDone: 'true' },
                        ],
                        createdAt: 1590999730348,
                        dueDate: 16156215211 - 20000,
                        byMember: {
                            _id: 'u101',
                            username: 'Tal',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                        style: {
                            bgColor: '#26de81',
                        },
                    },
                    {
                        id: 'c109',
                        title: 'Sockets',
                        description: 'backend',
                    },
                ],
            },
            {
                style: {},
                id: 'g103',
                title: 'Done',
                cards: [
                    {
                        id: 'c110',
                        title: 'Dynamic side maun',
                        description: 'backend',
                    },
                    {
                        id: 'c111',
                        title: 'Fix hover on card preview',
                        description: 'backend',
                    },
                ],
            },
            {
                style: {},
                id: 'g104',
                title: 'Bugs',
                cards: [
                    {
                        id: 'c112',
                        title: 'Dynamic cmp',
                        description: 'backend',
                    },
                    {
                        id: 'c113',
                        title: 'User service to small',
                        description: 'backend',
                    },
                ],
            },
        ],
        activities: [
            {
                id: 'a103',
                txt: 'Add Card',
                createdAt: Date.now() - 100000,
                byMember: {
                    _id: 'u103',
                    username: 'hunter',
                    fullname: 'Eli Granat',
                    imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/eli_rsut8n.png',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
            {
                id: 'a104',
                txt: 'Ui ui ui',
                createdAt: Date.now() - 100000,
                byMember: {
                    _id: 'u104',
                    username: 'Rashbatz',
                    fullname: 'Adina Zwebiner',
                    imgUrl: 'https://res.cloudinary.com/trelix-casep21/image/upload/v1638644428/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2021-12-04_210011_d245t5.png',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
            {
                id: 'a102',
                txt: 'Changed Background Color',
                createdAt: Date.now() - 1000000,
                byMember: {
                    _id: 'u102',
                    username: 'abolele',
                    fullname: 'Aviel Cohanian',
                    imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466703/user/Aviel_xnwzxj.jpg',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
            {
                id: 'a101',
                txt: 'Changed Color',
                createdAt: Date.now() - 100000000,
                byMember: {
                    _id: 'u101',
                    username: 'oushky',
                    fullname: 'Yael oushky',
                    imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/yael_ypkjt9.jpg',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
        ],
    },
    {
        _id: 'b102',
        title: 'Sprint 4 B',
        description: '',
        createdAt: 1589983468418,
        createdBy: {
            _id: 'u104',
            username: 'Yael Oushky',
            mail: 'YaelOushky@gmail.com',
            fullname: 'Yael oushky',
            imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/yael_ypkjt9.jpg',
        },
        style: {
            backgroundImage:
                'url(https://images.unsplash.com/photo-1502759683299-cdcd6974244f?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNzk3MjJ8MHwxfHNlYXJjaHw0fHxXYWxscGFwZXJzfGVufDB8MHx8fDE2Mzg2NDIyNDI&ixlib=rb-1.2.1&q=85)',
        },
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

        members: [
            {
                _id: 'u102',
                mail: 'AvielCohanian@gmail.com',
                fullname: 'Aviel Cohanian',
                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466703/user/Aviel_xnwzxj.jpg',
            },
            {
                _id: 'u103',
                username: 'hunter',
                mail: 'EliGranat@gmail.com',
                fullname: 'Eli Granat',
                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/eli_rsut8n.png',
            },
            {
                _id: 'u104',
                username: 'oushky',
                mail: 'YaelOushky@gmail.com',
                fullname: 'Yael oushky',
                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/yael_ypkjt9.jpg',
            },
        ],
        groups: [
            {
                style: {},
                id: 'g101',
                title: 'Backlog',
                cards: [
                    {
                        id: 'c107',
                        title: 'Creat git repository',
                        description: 'backend',
                    },
                    {
                        id: 'c108',
                        title: 'Upload to heroku',
                        description: 'backend',
                    },
                ],
            },

            {
                id: 'g102',
                title: 'In progress',
                cards: [
                    {
                        id: 'c103',
                        title: 'PWA push notification',
                        description: 'backend',
                    },
                    {
                        id: 'c104',
                        title: 'Dashboard',
                        description: 'description',
                        comments: [
                            {
                                id: 'ZdPnm',
                                txt: 'also @yaronb please CR this',
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Tal Tarablus',
                                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                                },
                            },
                        ],
                        attachment: {
                            trelixAttachments: null,
                            computerAttachment: null,
                        },
                        checklists: [
                            {
                                id: 'YEhmF',
                                title: 'Checklist',
                                todos: [
                                    {
                                        id: '212jX',
                                        txt: 'To Do 1',
                                        isDone: false,
                                    },
                                ],
                            },
                            {
                                id: 'Xsldsd',
                                title: 'DoToDo',
                                todos: [
                                    {
                                        id: 'cds9a',
                                        txt: 'To Do 2',
                                        isDone: false,
                                    },
                                    {
                                        id: 'wdwds9a',
                                        txt: 'To Do 3',
                                        isDone: true,
                                    },
                                ],
                            },
                        ],
                        members: [
                            {
                                _id: 'u101',
                                username: 'Tal',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                            {
                                _id: 'u102',
                                fullname: 'Aviel Cohanian',
                                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466703/user/Aviel_xnwzxj.jpg',
                            },
                            {
                                _id: 'u103',
                                username: 'hunter',
                                fullname: 'Eli Granat',
                                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/eli_rsut8n.png',
                            },
                            {
                                _id: 'u104',
                                username: 'oushky',
                                fullname: 'Yael oushky',
                                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/yael_ypkjt9.jpg',
                            },
                        ],
                        labelIds: [
                            { lId: 'l101', isDone: 'false' },
                            { lId: 'l102', isDone: 'true' },
                        ],
                        createdAt: 1590999730348,
                        dueDate: 16156215211,
                        byMember: {
                            _id: 'u101',
                            username: 'Tal',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                        style: {
                            bgColor: '#26de81',
                        },
                    },
                    {
                        id: 'c105',
                        title: 'Connect mongoDB',
                        description: 'backend',
                        comments: [
                            {
                                id: 'ZdPnm',
                                txt: 'also @yaronb please CR this',
                                createdAt: 1590999817436.0,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Tal Tarablus',
                                    imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                                },
                            },
                        ],
                        attachment: {
                            trelixAttachments: null,
                            computerAttachment: null,
                        },
                        checklists: [
                            {
                                id: 'Xsldsd',
                                title: 'DoToDo',
                                todos: [
                                    {
                                        id: 'cds9a',
                                        txt: 'To Do 2',
                                        isDone: false,
                                    },
                                    {
                                        id: 'wdwds9a',
                                        txt: 'To Do 3',
                                        isDone: true,
                                    },
                                ],
                            },
                        ],
                        members: [
                            {
                                _id: 'u102',
                                fullname: 'Aviel Cohanian',
                                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466703/user/Aviel_xnwzxj.jpg',
                            },
                            {
                                _id: 'u103',
                                username: 'hunter',
                                fullname: 'Eli Granat',
                                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/eli_rsut8n.png',
                            },
                            {
                                _id: 'u104',
                                username: 'oushky',
                                fullname: 'Yael oushky',
                                imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/yael_ypkjt9.jpg',
                            },
                        ],
                        labelIds: [
                            { lId: 'l101', isDone: 'false' },
                            { lId: 'l102', isDone: 'true' },
                        ],
                        createdAt: 1590999730348,
                        dueDate: 16156215211 - 20000,
                        byMember: {
                            _id: 'u101',
                            username: 'Tal',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                        style: {
                            bgColor: '#26de81',
                        },
                    },
                    {
                        id: 'c109',
                        title: 'Sockets',
                        description: 'backend',
                    },
                ],
            },
            {
                style: {},
                id: 'g103',
                title: 'Done',
                cards: [
                    {
                        id: 'c110',
                        title: 'Dynamic side maun',
                        description: 'backend',
                    },
                    {
                        id: 'c111',
                        title: 'Fix hover on card preview',
                        description: 'backend',
                    },
                ],
            },
            {
                style: {},
                id: 'g104',
                title: 'Bugs',
                cards: [
                    {
                        id: 'c112',
                        title: 'Dynamic cmp',
                        description: 'backend',
                    },
                    {
                        id: 'c113',
                        title: 'User service to small',
                        description: 'backend',
                    },
                ],
            },
        ],
        activities: [
            {
                id: 'a103',
                txt: 'Add Card',
                createdAt: Date.now() - 100000,
                byMember: {
                    _id: 'u103',
                    username: 'hunter',
                    fullname: 'Eli Granat',
                    imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/eli_rsut8n.png',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
            {
                id: 'a104',
                txt: 'Ui ui ui',
                createdAt: Date.now() - 100000,
                byMember: {
                    _id: 'u104',
                    username: 'Rashbatz',
                    fullname: 'Adina Zwebiner',
                    imgUrl: 'https://res.cloudinary.com/trelix-casep21/image/upload/v1638644428/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2021-12-04_210011_d245t5.png',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
            {
                id: 'a102',
                txt: 'Changed Background Color',
                createdAt: Date.now() - 1000000,
                byMember: {
                    _id: 'u102',
                    username: 'abolele',
                    fullname: 'Aviel Cohanian',
                    imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466703/user/Aviel_xnwzxj.jpg',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
            {
                id: 'a101',
                txt: 'Changed Color',
                createdAt: Date.now() - 100000000,
                byMember: {
                    _id: 'u101',
                    username: 'oushky',
                    fullname: 'Yael oushky',
                    imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/yael_ypkjt9.jpg',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
        ],
    },
];
// _save('boards', groups);

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType));
    if (!entities || !entities.length) {
        _save('boards', boards);
        return Promise.resolve(boards);
    }
    return Promise.resolve(entities);
}

function get(entityType, entityId) {
    return query(entityType).then((entities) =>
        entities.find((entity) => entity._id === entityId)
    );
}
function post(entityType, newEntity) {
    newEntity._id = _makeId();
    return query(entityType).then((entities) => {
        entities.push(newEntity);
        _save(entityType, entities);
        return newEntity;
    });
}
function postMany(entityType, newEntities) {
    return query(entityType).then((entities) => {
        newEntities = newEntities.map((entity) => ({
            ...entity,
            _id: _makeId(),
        }));
        entities.push(...newEntities);
        _save(entityType, entities);
        return entities;
    });
}

function put(entityType, updatedEntity) {
    return query(entityType).then((entities) => {
        const idx = entities.findIndex(
            (entity) => entity._id === updatedEntity._id
        );
        entities.splice(idx, 1, updatedEntity);
        _save(entityType, entities);
        return updatedEntity;
    });
}

function remove(entityType, entityId) {
    return query(entityType).then((entities) => {
        const idx = entities.findIndex((entity) => entity._id === entityId);
        entities.splice(idx, 1);
        _save(entityType, entities);
    });
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 5) {
    var text = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
