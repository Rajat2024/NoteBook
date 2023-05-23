import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import add from "../image/add.jpg";
import edit from "../image/edit.avif";
import search from "../image/search.avif"
import contribute from "../image/contribute.avif"
function Home(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="home-container">
      <section className="hero">
        <div className="left-container ">
          <div>
            <h2 className="fw-bold fs-1">SAVE YOUR TASKS WITH US!</h2>
          </div>

          <p>
            Make a business plan or Resolutions to achieve goals. Take notes, so
            that you never forget the forgetful
          </p>
          <button className="getstarted-btn" onClick={handleClick}>
            GET STARTED{" "}
          </button>
        </div>
        <div className="right-container">
          <img className="checklist-img" src="Checklist.jpg" alt=""></img>
        </div>
      </section>
      <h2 className="fw-bold fs-2 ">FEATURES WE OFFER YOU!</h2>
      <section className="feature-section">
        <div className="feature">
          <img className="feature-img" alt="" src={add} />
          <div className="feature-text">
            you can create new Notes anytime with different tags!
          </div>
        </div>
        <div className="feature">
          <img className="feature-img" alt="" src={edit} />
          <div className="feature-text">
            Edit your existing Notes for unlimited times.
          </div>
        </div>
        <div className="feature">
          <img className="feature-img" alt="" src={search} />
          <div className="feature-text ">
            Search among your notes using countless filters
          </div>
        </div>
        <div className="feature">
          <img className="feature-img" alt="" src={contribute} />
          <div className="feature-text">
            Collaborate with others to add more features
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
