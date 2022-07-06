/* eslint-disable prettier/prettier */

import { request , uploadRequest } from "../configs/axios.config";

export const getAllNews = async (page) => {
  try {
    const { data } = await request.get(`news?page=${page || 1}&limit=10`);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const createNews = async (body) => {
  try {
    const { data } = await request.post("news", body);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const deleteNews = async (newsId) => {
  try {
    const { data } = await request.delete(`news/${newsId}`);
    console.log(data)
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const editNews = async (newsId, body) => {
  try {
    const { data } = await request.put(`news/${newsId}`, body);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const getAllcomment = async (newsId) => {
  try {
    const { data } = await request.get(`news/${newsId}/comments`);

    return data;
  } catch (error) {
    throw error.message;
  }
};

export const createComment = async (newsId, body) => {
  try {
    const { data } = await request.post(`news/${newsId}/comments`, body);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const editComment = async (newsId, commentId, body) => {
  try {
    const { data } = await request.put(
      `news/${newsId}/comments/${commentId}`,
      body
    );
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const deleteComment = async (newsId, commentId) => {
  try {
    const { data } = await request.delete(
      `news/${newsId}/comments/${commentId}`
    );

    return data;
  } catch (error) {
    throw error.message;
  }
};

export const uploadNewsImage = async (body) => {
  try {
    const data = await request.post(`news/${body.newsId}/images`, body);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const uploadImage = async (data) => {
  try {
    
    const response = await uploadRequest.post('/upload', data);
    console.log(response.data)
    return response?.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

