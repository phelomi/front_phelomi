import store from '@/store';
import { forOwn } from 'lodash';
import roomSpecify from '../config/roomSpecify.json';
import basicIcon from '../config/basicIcon.json';

export const roomList = roomSpecify;

export const roomType = () => {
  const localRoomCategory = {};
  forOwn(store.getters.roomCategory, (v, k) => {
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
  return localRoomCategory;
};
