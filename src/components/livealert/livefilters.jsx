import { useSelector } from "react-redux";
import "./livefilters.scss";

const LiveFilters = () => {
  const filters = JSON.stringify(useSelector(store => store.filter));
  return (
    <div className="live-store">store.filter: <b>{filters}</b></div>
  );
};

export default LiveFilters;
