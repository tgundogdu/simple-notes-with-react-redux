import { useNavigate } from "react-router-dom";
import NotFoundImg from "../assets/images/not-found.svg";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <img className="not-found-img" src={NotFoundImg} alt="page or content not found" />
      <h6 className="error-msg">
        Oops! Page not Found.
      </h6>
      <div className="error-action">
        <button onClick={()=>{navigate("/")}}>Go to Home page</button>
      </div>

    </div>
  );
};

export default Error;
