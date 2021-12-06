import axios from 'axios';

export const uploadImg = (ev) => {
    const UPLOAD_PRESET = 'trelix-casep2021'; //insert yours
    const CLOUD_NAME = 'trelix-casep21'; //insert yours
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const FORM_DATA = new FormData();
    FORM_DATA.append('file', ev.target.files[0]);
    FORM_DATA.append('upload_preset', UPLOAD_PRESET);
    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: FORM_DATA,
    })
        .then((res) => res.json())
        .then((res) => res)
        .catch((err) => console.error(err));
};
export const imgService = {
    getImgs,
};
async function getImgs(searchBy) {
    const url = `https://api.unsplash.com/search/photos?page=1&per_page=12&query=${searchBy}&orientation=landscape&client_id=Zgu8W39Fmue2y2khdV4U2EIAqj__wKs8Fk6oL6xn_bU`;
    try {
        const imgs = await axios.get(url);
        return Promise.resolve(filterImgs(imgs.data));
    } catch (err) {
        throw err;
    }
}
function filterImgs(imgs) {
    const newImgs = imgs.results.map((item) => {
        return {
            full: { backgroundImage: `url(${item.urls.full})` },
            small: { backgroundImage: `url(${item.urls.small})` },
            description: item.description,
        };
    });
    return newImgs;
}
