/* eslint-disable prettier/prettier */
import * as api from  "../services/news";

import { getExistingIndex, showToast } from "../utils/helper";

export const news = {
  state: [],
  reducers: {
    getAllNews(state, payload) {
      return payload;
    },

    addNews(state, payload) {
      return [payload, ...state];
    },
    edit(state, payload) {
      const index = getExistingIndex(payload.id, state);
      const newNews = [...state];
      newNews[index] = payload;

      return newNews;
    },

    deleteNews(state, payload) {
      console.log(payload , 'aha')
      return state.filter((el) => el.id !== payload);
    },
  },
  effects: (dispatch) => ({
    async getAllNewsAsync(page) {
      try {
        const allNews = await api.getAllNews(page);

        dispatch.news.getAllNews(allNews);
      } catch (error) {
        showToast("error", error);
      }
    },
    async deleteNewsAsync(data) {
      try {
      
        const news = await api.deleteNews(data);
        dispatch.news.deleteNews(data);
      } catch (error) {
        showToast("error", error);
      }
    },
    async addNewsAsync(data) {
      try {
        const news = await api.createNews(data.body);
        dispatch.news.addNews(news);
      } catch (error) {
        showToast("error", error);
      }
    },
    async editNewsAsync(data) {
      try {
        const news = await api.editNews(data.newsId, data.body);
        dispatch.news.edit(news);
      } catch (error) {
        showToast("error", error);
      }
    },
  }),
};
