export const storageService = {
    query,
    get,
    post,
    put,
    remove,
};
const groups = [
    {
        _id: 'b101',
        title: 'Robot dev proj',
        description: '',
        createdAt: 1589983468418,
        createdBy: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
            mail: 'abi@mail.com',
        },
        style: {
            backgroundImage:
                'url(https://res.cloudinary.com/dshrwhc75/image/upload/v1638367176/chris-karidis-nnzkZNYWHaU-unsplash_1_ralbng.jpg)',
        },
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
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl: 'https://www.google.com',
            },
            {
                _id: 'u102',
                fullname: 'Yael Oushky',
                imgUrl: 'https://www.google.com',
            },
        ],
        groups: [
            {
                style: {},
                id: 'g101',
                title: 'Group 1',
                cards: [
                    {
                        id: 'c101',
                        title: 'Replace logo',
                    },
                    {
                        id: 'c102',
                        title: 'Add Samples',
                    },
                ],
            },
            {
                id: 'g102',
                title: 'Group 2',
                cards: [
                    {
                        id: 'c103',
                        title: 'Do that',
                    },
                    {
                        id: 'c104',
                        title: 'Help me',
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
                        ],
                        members: [
                            {
                                _id: 'u101',
                                username: 'Tal',
                                fullname: 'Tal Tarablus',
                                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
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
                ],
                style: {},
            },
        ],
        activities: [{
                id: 'a101',
                txt: 'Changed Color',
                createdAt: Date.now() -100000000,
                byMember: {
                    _id: 'u101',
                    fullname: 'Yael oushky',
                    imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/yael_ypkjt9.jpg',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },

            {
                id: 'a102',
                txt: 'Changed Background Color',
                createdAt: Date.now() -1000000,
                byMember: {
                    _id: 'u102',
                    fullname: 'Aviel Cohanian',
                    imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466703/user/Aviel_xnwzxj.jpg',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            },
            {
                id: 'a103',
                txt: 'Add Card',
                createdAt: Date.now() -100000,
                byMember: {
                    _id: 'u103',
                    fullname: 'Eli Granat',
                    imgUrl: 'https://res.cloudinary.com/dshrwhc75/image/upload/v1638466706/user/eli_rsut8n.png',
                },
                card: {
                    id: 'c101',
                    title: 'Replace Logo',
                },
            }
        ],
    },
];

// {time:Date.now() -10000000, fullname:'MOSHE ZOHAR',
//             event:{do:'added',in:{board:'fsg',id:'c102'}},
            
//             img:'https://res.cloudinary.com/dshrwhc75/image/upload/v1638367919/luca-micheli-r9RW20TrQ0Y-unsplash_jnpfxx.jpg'}
            
            
//             ,{time:Date.now() -10000000, fullname:'MOSHE ZOHAR',event:{do:'added',in:{board:'fsg',id:'c102'}},
//             img:'https://res.cloudinary.com/dshrwhc75/image/upload/v1638367919/luca-micheli-r9RW20TrQ0Y-unsplash_jnpfxx.jpg'}
            

// _save('boards', groups);

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType));
    if (!entities || !entities.length) {
        _save('boards', groups);
        return Promise.resolve(groups);
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
