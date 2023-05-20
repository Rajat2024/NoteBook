import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

function SignUp(props) {

    const [credentials, setCredentials] = useState({ email: "", name: "", password: "", cpassword: "" })
    let history = useNavigate();

    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState('');

    const onchange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });

        if (name === "name") {
            const hasNumber = /\d/.test(value);
            if (hasNumber) {
                // If the value contains a number, set the error message
                setErrorMessage("Name should not contain numbers");
            } else {
                // If the value is valid, clear the error message
                setErrorMessage("");
            }
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const { email, name, password } = credentials;

        const response = await fetch("api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, password })

        });
        const json = await response.json();
        console.log(json);

        let pass = document.querySelector('#password').value;
        let cpass = document.querySelector('#cpassword').value;

        if (json.success) {

            if (pass == cpass) {
                localStorage.setItem('token', json.authtoken);
                history("/");
                props.showAlert("Account created successfully", "success");
            } else {
                props.showAlert("Passwords didn't match! Try again.", "danger");
            }
        } else {
            props.showAlert("Invalid Details! " + json.error, "danger")

        }

    }


    return (
        <>
            <div className='text-center'>
                <h1>NOTEBOOK</h1>
                <p><b>Your notes on cloud ☁️</b></p>
            </div>

            <form onSubmit={handleClick}>
                <div className="container my-5">
                    <p className="text-center my-3"><i>New to Notebook? 👉🏻Create a new account here! </i></p>
                    <div className="mb-3 ">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={onchange} id="email" name="email" placeholder="name@example.com" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" onChange={onchange} id="name" name="name" />
                        {errorMessage && <span className='formError'>{errorMessage}</span>}
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={onchange} id="password" name="password" minLength={5} required />
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" onChange={onchange} id="cpassword" name="cpassword" minLength={5} required />
                    </div>
                </div>
                <div className='text-center'>
                    <button type="submit" className='btn btn-primary' >SignUp</button>
                </div>
                <br />
                <p className='text-center last-para'>Already have an account?  <Link to="/login" className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} >Login</Link>
                </p>
            </form>
        </>
    )
}

export default SignUp
