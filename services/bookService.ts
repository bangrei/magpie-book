import { API_CONNECTOR } from "./apiConnector";

export const fetchBooks = async () => {
  try {
    const { get } = API_CONNECTOR({});
    const path = `/books`;
    const data = await get(path);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createBook = async (payload: any) => {
  try {
    const { post } = API_CONNECTOR({});
    const path = `/books`;
    const data = await post(path, payload);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editBook = async (payload: any) => {
  try {
    const { put } = API_CONNECTOR({});
    const path = `/books/${payload.id}`;
    const data = await put(path, payload);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteBook = async (id: any) => {
  try {
    const { remove } = API_CONNECTOR({});
    const path = `/books/${id}`;
    const data = await remove(path);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createCategory = async (payload: any) => {
  try {
    const { post } = API_CONNECTOR({});
    const path = `/categories`;
    const data = await post(path, payload);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchCategory = async () => {
  try {
    const { get } = API_CONNECTOR({});
    const path = `/categories`;
    const data = await get(path);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editCategory = async (payload: any) => {
  try {
    const { put } = API_CONNECTOR({});
    const path = `/categories/${payload.id}`;
    const data = await put(path, payload);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteCategory = async (id: any) => {
  try {
    const { remove } = API_CONNECTOR({});
    const path = `/categories/${id}`;
    const data = await remove(path);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
