import { API_CONNECTOR } from "./apiConnector";

export const adminLogin = async (payload: LoginRequest) => {
  try {
    const { post } = API_CONNECTOR({});
    const path = `/admin/login`;
    const data = await post(path, payload);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createMember = async (payload: any) => {
  try {
    const { post } = API_CONNECTOR({});
    const path = `/members`;
    const data = await post(path, payload);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editMember = async (payload: any) => {
  try {
    const { put } = API_CONNECTOR({});
    const path = `/members/${payload.id}`;
    const data = await put(path, payload);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteMember = async (id: any) => {
  try {
    const { remove } = API_CONNECTOR({});
    const path = `/members/${id}`;
    const data = await remove(path);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchMembers = async (payload: any) => {
  try {
    const { get } = API_CONNECTOR({});
    const path = `/members`;
    const data = await get(path, payload);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
