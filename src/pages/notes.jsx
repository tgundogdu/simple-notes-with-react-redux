import { useEffect } from "react";
import { useState } from "react";
import Masonry from "react-masonry-css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, LiveFilters, Modal } from "../components";
import { removeNote } from "../redux/actions";
import { applyFilters } from "../utils/helpers";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Notes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentNote, setCurrentNote] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const filters = useSelector((store) => store.filter);
  const notes = useSelector((store) => store.note);

  const previewHandler = (note) => () => {
    setCurrentNote(note);
  };

  const deleteHandler = (noteId) => (e) => {
    dispatch(removeNote(noteId));
    toast.info(`Successfully deleted. [id: ${noteId}]`);
  };

  useEffect(() => {
    setFilteredNotes(applyFilters([...notes.data], filters));
  }, [filters, notes.data]);

  return (
    <div className="news-page">
      <LiveFilters />
      {filteredNotes.length ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="news-masonry"
          columnClassName="news-masonry-column"
        >
          {filteredNotes.map((item) => {
            return (
              <Card
                key={item.id}
                data={item}
                onPreview={previewHandler(item)}
                onDetail={() => navigate("/note/"+item.id)}
                onDelete={deleteHandler(item.id)}
              />
            );
          })}
        </Masonry>
      ) : (
        <h3 className="no-data-found">No data found matching the given filter criteria.</h3>
      )}

      {currentNote ? (
        <Modal onClose={() => setCurrentNote(null)} data={currentNote} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Notes;
