export const storageService = {
    query,
    get,
    post,
    put,
    remove,
};

const users = [
    {
        _id: 'u101',
        fullname: 'Abi Abambi',
        username: 'abi@ababmi.com',
        password: 'aBambi123',
        imgUrl: 'http://some-img.jpg',
        boards: {
            boards: [ '61ad4481ec9e776b609a7fd6'],
            starBoard: ['61ad4049ec9e776b609a7fd5'],
        },
    },
];
// _save('boards', groups);

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType));
    if (!entities || !entities.length) {
        _save('users', users);
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
