import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fillNotes } from "../redux/actions";

//Pages
import Notes from "../pages/notes";
import Detail from "../pages/detail";
import Error from "../pages/error";

//APIs
import API from "../services";

const Router = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      const dirtyNotes = await API.fakeLoad();
      const fixedNotes = await API.applyNotes(dirtyNotes);
      dispatch(fillNotes(fixedNotes));
      setLoading(false);
    };

    loadData();
  }, [dispatch]);

  return (
    <div className="pages">
      {loading ? (
        <h1 style={{textAlign: "center"}}>sample notes loading...</h1>
      ) : (
        <Routes>
          <Route path="/" exact element={<Notes />} />
          <Route path="/note/:id" element={<Detail />} />
          <Route path="*" element={<Error />} />
        </Routes>
      )}
    </div>
  );
};

export default Router;
