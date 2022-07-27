import { SET_TAG, REMOVE_TAG, SET_QUERY, SET_ORDER_BY } from "../../utils/constants";

const setQuery = (query) => {
  return {
    type: SET_QUERY,
    payload: query
  };
};

const setTag = (tag) => {
  return {
    type: SET_TAG,
    payload: tag
  };
};

const removeTag = (tag) => {
  return {
    type: REMOVE_TAG,
    payload: tag
  };
};

const setOrderBy = (orderObj) => {
  return {
    type: SET_ORDER_BY,
    payload: orderObj
  };
};

export {
  setTag,
  removeTag,
  setQuery,
  setOrderBy
};
