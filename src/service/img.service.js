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

async function getImgs(searchBy, size = 12) {
  const url = `https://api.unsplash.com/search/photos?page=1&per_page=${size}
    &query=${searchBy}&orientation=landscape&client_id=Zgu8W39Fmue2y2khdV4U2EIAqj__wKs8Fk6oL6xn_bU`;
  try {
    const res = await axios.get(url);
    console.log(res.data);
    return cleanImgs(res.data);
  } catch (err) {
    throw err;
  }
}
function cleanImgs(imgs) {
  const newImgs = imgs.results.map((item) => {
    return {
      full: { backgroundImage: `url(${item.urls.full})` },
      small: { backgroundImage: `url(${item.urls.small})` },
      color: { color: `${item.color}` },
      description: item.description,
    };
  });
  return newImgs;
}
