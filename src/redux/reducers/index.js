import { combineReducers } from "redux";
import filter from "./filter";
import note from "./note";

export default combineReducers({
  filter,
  note,
});
