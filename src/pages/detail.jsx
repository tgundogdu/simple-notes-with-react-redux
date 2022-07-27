import React from "react";
import { BiArrowToLeft, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components";
import { removeNote } from "../redux/actions";
import { hexToRGB } from "../utils/helpers";
import Error from "./error";

const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const note = useSelector(
    (store) =>
      store.note.data.filter((item) => item.id === parseInt(params.id))[0]
  );
  if (!note) {
    return <Error />;
  }

  const formattedDate = new Date(note.date).toLocaleString("en-EN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const deleteHandler = () => {
    dispatch(removeNote(note.id));
    navigate("/");
    toast.info("Note succesfully deleted.");
  };

  return (
    <div className="detail-page">
      <div className="detail-actions">
        <div className="return-list">
          <Button onClick={() => navigate("/")}>
            <BiArrowToLeft /> <span>Return to Notes</span>
          </Button>
        </div>
        <div className="other-actions">
          <Button onClick={deleteHandler} severity="danger">
            <BiTrash /> <span>Delete this note</span>
          </Button>
        </div>
      </div>
      <div
        className="note-detail"
        style={{
          backgroundColor: hexToRGB(note.theme.color, 0.1),
        }}
      >
        <h1 className="title">{note.title}</h1>
        <div className="date">{formattedDate}</div>
        <div className="content">{note.content}</div>
        <div className="tags">
          Tags :{" "}
          {note.tags.map((tag, indis) => {
            return <span key={indis}>{tag}</span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;
