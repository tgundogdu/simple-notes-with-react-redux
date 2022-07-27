import "./filterbar.scss";
import { BiPlusCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  removeTag,
  setTag,
  setQuery,
  setOrderBy,
  addNote,
} from "../../redux/actions";
import { randNumber, randColor, generateId } from "../../utils/helpers";
import { Button, Tag } from "../";

const possibleTags = [
  "javascript",
  "react",
  "nodejs",
  "scss",
  "redux",
  "store",
  "reducer",
  "action",
];
const txt =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

let timerForSearchWaiting = null;

const Filterbar = () => {
  let orderFieldRef = null;
  let orderValueRef = null;
  const dispatch = useDispatch();
  const filters = useSelector((store) => store.filter);
  const allTags = useSelector((store) => store.note.tags);
  
  const tagHandler = (tag) => () => {
    if (filters.tags.indexOf(tag) >= 0) {
      dispatch(removeTag(tag));
    } else {
      dispatch(setTag(tag));
    }
  };

  const inputHandler = (e) => {
    clearTimeout(timerForSearchWaiting);
    timerForSearchWaiting = setTimeout(() => {
      const query = e.target.value.trim();
      dispatch(setQuery(query));
    }, 1000);
  };

  const orderHandler = () => {
    const field = orderFieldRef.value;
    const fieldValue = orderValueRef.value;

    let order;
    if (!field) {
      order = null;
      orderValueRef.disabled = true;
    } else {
      order = { [field]: fieldValue };
      orderValueRef.disabled = false;
    }
    dispatch(setOrderBy(order));
  };

  const addNoteHandler = () => {
    let sampleNote = {
      id: generateId(),
      title: txt.substring(0, randNumber(20, 50)),
      content: txt.substring(0, randNumber(100, 273)),
      tags: [possibleTags[randNumber(0, 7)]],
      date: new Date().toISOString(),
      theme: {
        color: randColor("hex"),
      },
    };
    dispatch(addNote(sampleNote));
    toast.success("Note added successfully");
  };

  return (
    <div className={`filter-bar`}>
      <div className="tags">
        <span>Tags:</span>
        {allTags.map((tag) => {
          const isSelected = filters.tags.indexOf(tag) >= 0 ? true : false;
          return (
            <Tag
              key={tag}
              selected={isSelected}
              label={tag}
              onClick={tagHandler(tag)}
            />
          );
        })}
      </div>
      <div className="other-filters">
        <div className="order">
          <span>Order by: </span>
          <select
            onChange={orderHandler}
            ref={(e) => (orderFieldRef = e)}
            className="f-control"
          >
            <option value="">Default</option>
            <option value="date">Date</option>
            <option value="title">Title</option>
          </select>{" "}
          <select
            className="f-control"
            onChange={orderHandler}
            ref={(e) => (orderValueRef = e)}
            disabled
          >
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
        </div>
        <div className="search">
          <span>Search: </span>
          <input
            type="text"
            onInput={inputHandler}
            className="f-control"
            placeholder="type here..."
          />
        </div>
        <div className="addnote">
          <Button onClick={addNoteHandler}>
            <BiPlusCircle /> <span>Add Random Note</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filterbar;
