import axios from "axios";
import { baseUrl } from "../config";

const api = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
});

api.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // console.log("An unexpected error occurred.", error);
  }

  return Promise.reject(error);
});

export const getAuthor = async (username) => {
  try {
    const result = await api.get(`/users/${username}`);
    return result.data;
  } catch (ex) {
    if (
      ex.response &&
      (ex.response.status === 404 || ex.response.status === 500)
    ) {
      return null;
    }
  }
};

export const getItems = async (filterBy = "") => {
  try {
    const result = await api.get(`/items?type=${filterBy}`);
    return result.data;
  } catch (ex) {
    if (
      ex.response &&
      (ex.response.status === 404 || ex.response.status === 500)
    ) {
      return null;
    }
  }
};

export const getSingleItem = async (id) => {
  try {
    const result = await api.get(`/items/${id}`);
    return result.data;
  } catch (ex) {
    if (
      ex.response &&
      (ex.response.status === 404 || ex.response.status === 500)
    ) {
      return null;
    }
  }
};

export const search = async (text) => {
  try {
    const result = await api.get(`/items?search=${text}`);
    return result.data;
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      return null;
    }
  }
};

export const createItem = async (body) => {
  try {
    const result = await api.post("/items", body);
    return result.data;
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      return null;
    }
  }
};

export const updateItem = async (body) => {
  try {
    const result = await api.put("/items", body);
    return result.data;
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      return null;
    }
  }
};

export const deleteItem = async (id) => {
  try {
    const result = await api.delete(`/items/${id}`);
    if (result.statusCode === 204) {
      return true;
    }
  } catch (ex) {
    if (
      ex.response &&
      (ex.response.status === 404 || ex.response.status === 500)
    ) {
      return false;
    }
  }
};
