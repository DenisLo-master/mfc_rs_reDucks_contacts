import {genArray} from './genArray';
import {genPhotoImage} from './genPhotoImage';

export const genFull = async <T>(fn: () => T, count: number = 50) => {
  const promises = genArray(fn, count)
    .map(async (contact) => {
      return {
        ...contact,
        photo: await genPhotoImage()
      }
    });
  return await Promise.allSettled(promises);
}


