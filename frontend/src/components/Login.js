import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"

import styled from 'styled-components'
const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top: 20px;
`
function Login(props) {
  const location = useLocation();
  const [user, setUser] = useState();
  const context = useContext(NoteContext);
  const { fetchData } = context;

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [load, setLoad] = useState(false); // for loading spinner
  let navigate = useNavigate();

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleClick2 = async () => {
    setLoad(false);
  };
  const handleClick = async () => {
    if (credentials.email === "" || credentials.password === "")
      setLoad(false);
    else
      setLoad(true);

    const response = await fetch("api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    // console.log(json);
    if (json.success) {
      // localStorage.setItem("token", json.authtoken);
      fetchData();
      navigate("/");
      // navigate("/Addnote");
      props.showAlert("Logged in successfully", "success");
    } else {
      setLoad(false);
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  async function handleCallbackResponse(userData) {
    const userObject = jwtDecode(userData.credential)
    const { name, email } = userObject


    const isGoogleUser = true;
    const response = await fetch("api/auth/google", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, isGoogleUser })
    })

    const json = await response.json()
    
    if (json.success) {
      setUser({ isGoogleUser })
      navigate("/")
      props.showAlert(
        "Login successfully , Now you can add Notes",
        "success"
      );
    }
    else {
      alert(json.message)
    }
  }

  useEffect(() => {

    const loadButton = () => {
      setTimeout(() => {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCallbackResponse
        })

        window.google.accounts.id.renderButton(
          document.getElementById('signinDiv'),
          {
            theme: "black",
            size: "large",
          }
        )
      }, 1000)
    }

    if (!user)
      loadButton()
    else
      navigate('/')
  }, [user])

  if (user === 'LOADING')
    return <> Loading ... </>

  return (
    <div>
      <div className="text-center my-4">
        <h1>NOTEBOOK</h1>
        <p>
          <b>Your notes on cloud ☁️</b>
        </p>
      </div>

      <div className="container my-5">
        <p className="text-center">
          <i>Login to continue using Notebook 😊 </i>
        </p>
        <div className="mb-3 ">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={onchange}
            id="email"
            name="email"
            placeholder="guest@gmail.com"
          />
        </div>

        <div className="mb-3 ">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onchange}
            id="password"
            name="password"
            placeholder="guest123"
          />
        </div>
      </div>
      <div className="text-center">
        {!load ? (
          <button className="btn btn-primary" onClick={handleClick}>
            Login
          </button>
        ) : (
          <button className="btn btn-primary" type="button" disabled >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Please Wait...
          </button>
        )}

      </div>
   
      {/* // for Google authetication */}
      <Container>

        <div id='signinDiv'><b >Loading...</b></div>
      </Container>


      <br />

      <p className="text-center last-para">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className={`nav-link ${location.pathname === "/signup" ? "active" : ""
            }`}
        >
          SignUp
        </Link>{" "}
      </p>
    </div>
  );
}

export default Login;
