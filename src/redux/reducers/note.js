import { FILL_NOTES, ADD_NOTE, REMOVE_NOTE } from "../../utils/constants";
import { getUniqueSet, getTagsFromNotes } from "../../utils/helpers";

const initialNotesState = {
  data: [],
  tags: [],
  total: 0,
};

const NoteReducer = (state = initialNotesState, action) => {
  let { type, payload } = action;

  
  switch (type) {
    case FILL_NOTES:
      return {
        ...state,
        data: payload,
        tags: getTagsFromNotes(payload),
        total: payload.length,
      };

    case ADD_NOTE:
      const tags = getUniqueSet(state.tags, payload.tags);
      const count = state.data.length + 1;
      return {
        ...state,
        data: [ ...state.data, payload ],
        tags: tags,
        total: count,
      };

    case REMOVE_NOTE:
      const newData = state.data.filter(o => o.id !== payload);
      console.log(payload);
      return {
        ...state,
        data: state.data.filter(o => o.id !== payload),
        tags: getTagsFromNotes(newData),
        total: (state.total-1)
      };

    default:
      return state;
  }
};

export default NoteReducer;
