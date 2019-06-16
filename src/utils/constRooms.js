import { forOwn } from 'lodash';
import roomSpecify from '../config/roomSpecify.json';
import basicIcon from '../config/basicIcon.json';
import roomCategory from '../config/roomCategory.json';

export const roomList = roomSpecify;
const localRoomCategory = {};
forOwn(roomCategory, (v, k) => {
  if (v.iconIntro) {
    const source = v.iconIntro;
    localRoomCategory[k] = {
      ...v,
      iconIntro: source.map(s => ({
        ...s,
        icon: (s.icon || []).map(i => basicIcon[i]),
      })),
    };
  } else localRoomCategory[k] = v;
});
export const roomType = localRoomCategory;
