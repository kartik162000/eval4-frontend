export const BACKEND_URL = 'http://localhost:4000/api';
export const AUTH_SERVER_API = 'http://localhost:8000/user/';

export const LOGIN_USER_DETAILS = {
  url: 'login',
  method: 'post',
};

export const GET_COLLECTIONS = (id) => ({
  url: `content-type/${id}`,
  method: 'get',
});

export const GET_COLLECTION_VALUES = (id, contentType) => ({
  url: `collection/allFields/${id}/${contentType}`,
  method: 'get',
});

export const POST_COLLECTION_VALUES = {
  url: 'collection/save',
  method: 'post',
};

export const REGISTER_USER_DETAILS = {
  url: 'new',
  method: 'post',
};
