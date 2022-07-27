import { ADD_NOTE, FILL_NOTES, REMOVE_NOTE } from "../../utils/constants";

const fillNotes = (notes) => {
  return {
    type: FILL_NOTES,
    payload: notes,
  };
};

const removeNote = (id) => {
  return {
    type: REMOVE_NOTE,
    payload: id,
  };
};

const addNote = (note) => {
  return {
    type: ADD_NOTE,
    payload: note,
  };
};

export { fillNotes, addNote, removeNote };
