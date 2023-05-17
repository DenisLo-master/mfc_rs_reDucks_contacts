import axios from 'axios';
import faker from 'faker'
import fs from 'fs';
import path from 'path';

const API_IMAGES_BASE = 'https://picsum.photos';
const getImgUrlById = (imgId: number, w = 200, h = 300): string => `${API_IMAGES_BASE}/id/${imgId}/${w}/${h}.jpg`;
const getImgNameById = (imgId: number, w = 200, h = 300): string => `id-${imgId}-${w}-${h}.jpg`;

const uriImg = '/images';
const pathToData: string = `../../../public${uriImg}`;

export const genPhotoImage = async (): Promise<string> => {
  const imgId = faker.random.number({min: 1, max: 1000})
  const imgName = getImgNameById(imgId);
  const imgUrl = getImgUrlById(imgId);

  console.log('imgUrl:', imgUrl)
  const response = await axios({
    url: imgUrl,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(fs.createWriteStream(path.join(__dirname, pathToData, imgName)))

  return `${uriImg}/${imgName}`;
}
