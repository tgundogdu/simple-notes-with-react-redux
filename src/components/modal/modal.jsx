import { useState } from "react";
import { useEffect } from "react";
import { longDateOptions } from "../../utils/constants";
import { hexToRGB } from "../../utils/helpers";
import "./modal.scss";

const Modal = ({ onClose, data }) => {
  const {
    id,
    title,
    content,
    tags,
    date,
    theme: { color },
  } = data;
  const [animateClass, setAnimateClass] = useState("");
  const style = { backgroundColor: hexToRGB(color, 0.2) };
  const publishDate = new Date(date).toLocaleString("en-EN", longDateOptions);

  const closeHandler = () => {
    setAnimateClass("");
    setTimeout(() => {
      onClose();
    }, 100);
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimateClass("animated");
    }, 50);
  }, []);

  return (
    <div className="modal">
      <div className="overlay" onClick={closeHandler}></div>
      <div className={`content ${animateClass}`}>
        <div className="inner" style={style}>
          <h1>{title}</h1>
          <div className="date">{publishDate}</div>
          <p>{content}</p>
          <div className="tags">
            Tags: {tags.join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
