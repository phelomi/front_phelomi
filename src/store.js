import Vue from 'vue';
import Vuex from 'vuex';
import { asyncLoop } from '@/utils/calculation';
import { fStorage } from '@/firebase';

Vue.use(Vuex);

const imgRef = fStorage.ref();

const other = ['init'];
const tmp = [
  'banner', 'follow', 'news', 'newsSM', 'roomCategory', 'roomIntro',
];

const getters = [...other, ...tmp]
  .reduce((acc, cur) => ({ ...acc, [cur]: state => state[cur] }), {});

const downloadImgUrl = async (img) => {
  if (img) {
    const res = await imgRef.child(img).getDownloadURL();
    return res;
  }
  return img;
};

export default new Vuex.Store({
  state: {
    init: true,
    banner: [],
    follow: {},
    news: {},
    newsSM: [],
    roomCategory: {},
    roomIntro: {},
    // roomSpecify: {},
    // roomsSM: [],
  },
  mutations: {
    setInfo(state, data) {
      const { key, value } = data;
      state[key] = value;
    },
  },
  actions: {
    async setInfo({ commit }, info) {
      const {
        banner, follow, news, newsSM, roomCategory, roomIntro,
      } = info;
      const bannerRes = await asyncLoop(banner, async (v) => {
        v.img = await downloadImgUrl(v.img);
      });
      commit('setInfo', { key: 'banner', value: bannerRes });
      const followRes = await asyncLoop(follow, async (v) => {
        v.info = await asyncLoop(v.info, async (subV) => {
          subV.img = await downloadImgUrl(subV.img);
        });
      });
      commit('setInfo', { key: 'follow', value: followRes });
      const newsRes = await asyncLoop(news, async (v) => {
        v.img = await downloadImgUrl(v.img);
        if (v.extra) {
          v.extra = await asyncLoop(v.extra, async (subV) => {
            subV.img = await downloadImgUrl(subV.img);
          });
        }
      });
      commit('setInfo', { key: 'news', value: newsRes });
      const newsSMRes = await asyncLoop(newsSM, async (v) => {
        v.img = await downloadImgUrl(v.img);
      });
      commit('setInfo', { key: 'newsSM', value: newsSMRes });
      commit('setInfo', { key: 'roomIntro', value: roomIntro });
      commit('setInfo', { key: 'roomCategory', value: roomCategory });
      commit('setInfo', { key: 'init', value: false });
    },
  },
  getters,
});
