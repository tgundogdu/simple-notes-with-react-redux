import {
  SET_QUERY,
  SET_TAG,
  REMOVE_TAG,
  SET_PAGE,
  SET_PER_PAGE_COUNT,
  SET_ORDER_BY,
} from "../../utils/constants";

const initialFilterState = {
  query: "",
  tags: [],
  //page: 1,
  //perPageCount: 10,
  order: null,
};

const FilterReducer = (state = initialFilterState, action) => {
  let { type, payload } = action;

  switch (type) {
    case SET_QUERY:
      return {
        ...state,
        query: payload,
      };

    case SET_TAG:
      const newTags = [...state.tags, payload].sort();
      return {
        ...state,
        tags: newTags,
      };

    case REMOVE_TAG:
      return {
        ...state,
        tags: state.tags.filter((val) => val !== payload).sort(),
      };

    case SET_ORDER_BY:
      return {
        ...state,
        order: payload ? { ...payload } : null,
      };

    case SET_PAGE:
      return {
        ...state,
      };

    case SET_PER_PAGE_COUNT:
      return {
        ...state,
      };

    default: {
      return state;
    }
  }
};

export default FilterReducer;
