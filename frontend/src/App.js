import "./App.css";
import { useState, useContext } from "react";
import About from "./components/About";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import Navbar from "./components/Navbar";
// BrowserRouter as Router means that we are using the BrowserRouter component as Router.
// For example:  Switch as Rajat means that we use Switch as Rajat.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import useOnline from "./Hooks/useOnline";
import Appp from "./Game/App.js";



function App() {
  // console.log(window.navigator);

  const [alert, setAlert] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (e) => {
    e.preventDefault();
    setDarkMode(!darkMode);
    // document.body.classList.toggle("dark-mode", darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };
 


  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };

  const isOnline = useOnline();

  return (
    <>
     
      <NoteState>
        <BrowserRouter>
          <Navbar showAlert={showAlert} darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>

          <Alert alert={alert} />
          {!isOnline ? (
            <Appp />
          ) : (
            <div className="container my-5">
              <Routes>
                <Route
                  path="/notes"
                  element={<Notes showAlert={showAlert} />}
                />
                <Route path="/" element={<AddNote showAlert={showAlert} />} />
                <Route
                  path="/about"
                  element={<About showAlert={showAlert} />}
                />
                <Route
                  path="/login"
                  element={<Login showAlert={showAlert} darkMode={darkMode}/>}
                />
                <Route
                  path="/signup"
                  element={<SignUp showAlert={showAlert} darkMode={darkMode}/>}
                />
              </Routes>
            </div>
          )}
        </BrowserRouter>
      </NoteState>
     
    </>
  );
}

export default App;
