import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import EditNote from "./EditNote";
import NoteItems from "./NoteItems";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";
import ReactLoading from "react-loading";

function Notes(props) {
  const context = useContext(NoteContext);
  const { notes, getNote, editNote } = context;
  const [enote, setenote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "default",
  });
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(()=>{
        setloading(!loading)
    },4000)
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refclose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setenote(currentNote);
  };

  const onchange = (e) => {
    setenote({ ...enote, [e.target.name]: e.target.value });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editNote(enote._id, enote.title, enote.description, enote.tag);
    refclose.current.click();

    props.showAlert("Note is updated successfully", "success");
  };

  return (
    <>
      <div className="my-5">
        <div>
          <h3>🧾 Your Notes:</h3>
        </div>
        <div className="d-flex py-3     justify-content-center">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
            }}
          />
        </div>
      </div>

      <EditNote
        reference={ref}
        closeref={refclose}
        enote={enote}
        onchange={onchange}
        handleChange={handleEdit}
      />

      <div className="row mb-5">
        <div className="mx-3">
          {(notes.length === 0)? (loading)?<ReactLoading
        type={"spinningBubbles"}
        color={"#FFC300"}
        height={100}
        width={100}
      />:"No notes to display..":<>{ notes
        .filter((item) => {
          return item.title.toLowerCase().includes(search) && item;
        })
        .map((note) => {
          return (
            <NoteItems
              key={note._id}
              note={note}
              updateNote={updateNote}
              showAlert={props.showAlert}
            />
          );
        })}</>}
        </div>
        
      </div>
    </>
  );
}

export default Notes;
