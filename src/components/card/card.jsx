import { useState } from "react";
import { BiTrash, BiEdit } from "react-icons/bi";
import { longDateOptions } from "../../utils/constants";
import { hexToRGB } from "../../utils/helpers";
import { Button } from "../";
import "./card.scss";

const Card = ({ data, onDetail, onPreview, onDelete }) => {
  const {
    id,
    title,
    content,
    tags,
    date,
    theme: { color },
  } = data;

  const formattedDate = new Date(date).toLocaleString("en-EN", longDateOptions);
  const [deleteAnimate, setDeleteAnimate] = useState("");

  const deleteHandler = (e) => {
    e.stopPropagation();
    setDeleteAnimate("animated");
    setTimeout(() => {
      onDelete();
    }, 200);
  };

  const previewHandler = (e) => {
    e.stopPropagation();
    onPreview();
  };

  return (
    <div
      className={`card ${deleteAnimate}`}
      style={{ backgroundColor: hexToRGB(color, 0.2) }}
      onClick={previewHandler}
    >
      <h3>
        {title} [id: {id}]
      </h3>
      <div className="date">{formattedDate}</div>
      <p className="content">{content}</p>
      <div className="tags">Tags: {tags.join(", ")}</div>
      <div className="actions">
        <div className="buttons">
          <Button onClick={deleteHandler} severity="danger">
            <BiTrash />
          </Button>
          <Button onClick={onDetail} severity="light">
            <BiTrash /> Detail
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
