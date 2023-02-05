import React, { useState, useEffect, useRef } from "react";
import "../components/auth/register.css"
import "react-toastify/dist/ReactToastify.css";
/* import { registerRoute } from "../utils/apiCalls"; */
import axios from "../utils/axios";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


function Register() {

    const userRef = useRef();
    const errRef = useRef();


    const [username, setUsername] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    const [matchPass, setMatchPass] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [passMatchFocus, setMatchFocus] = useState(false);

    const [errorMessage, setError] = useState('');
    const [successMessage, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(username);
        console.log(result);
        console.log(username);
        setValidUser(result);
    }, [username]);

    useEffect(() => {
        const result = PASS_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPass(result);
        const match = password === matchPass;
        setValidMatch(match);
    }, [password, matchPass]);

    useEffect(() => {
        setError('');
    }, [username, password, matchPass]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = { username: username, password: password };

        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*',
            }
        }
        try {
            const res = await axios.post(`http://localhost:5000/api/auth/register/`, body, axiosConfig)
                .then(res => console.log(res));
            console.log(res);

            setSuccess(true);

        } catch (error) {
            if (!error?.res) {
                setError('No server response');

            } else if (error.res?.status === 400) {
                setError('Username already in use')
            } else {
                setError('Registration failed');
            }
            errRef.current.focus();
            console.log(error.res);
        }

    }
    return (
        <>
            {successMessage ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="/login">Sign In</a>
                    </p>
                </section>
            ) : (

                <div className='wrapper d-flex align-items-center has-validation justify-content w-100'>
                    <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                    <form onSubmit={handleSubmit} className='loginForm was-validated'>
                        <h1>Register</h1>
                        <div class="form-floating mb-3 is-invalid">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                ref={userRef}
                                autoComplete="off"
                                placeholder='Username'
                                focus
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                                aria-invalid={validUser ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <label for="floatingInput">Username</label>
                            <div className='invalid-feedback'/* {userFocus && username && !validUser ? "instructions" : "offscreen"} */ id="uidnote">4 to 24 characters. Username must begin with a letter.</div>
                            <div className='valid-feedback'></div>
                        </div>

                        <div class="form-floating mb-3 is-invalid">
                            <input
                                type="password"
                                class="form-control"
                                focus
                                placeholder="password"
                                id="floatingInput"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                aria-invalid={validPass ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPassFocus(true)}
                                onBlur={() => setPassFocus(false)}
                            />
                            {/* <p id="pwdnote" className={passFocus && !validPass ? "instructions" : "offscreen"}>
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                            </p> */}
                            <label for="floatingInput">Password</label>
                            <div id="pwdnote" className='invalid-feedback'/* {passFocus && !validPass ? "instructions" : "offscreen"} */>Please enter your password.</div>
                            <div className='valid-feedback'></div>
                        </div>

                        <div class="form-floating mb-3 is-invalid">
                            <input
                                type="password"
                                class="form-control"
                                focus
                                id="floatingInput"
                                placeholder='Confirm password'
                                onChange={(e) => setMatchPass(e.target.value)}
                                value={matchPass}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <label for="floatingInput">Confirm Password</label>
                            <div id="confirmnote" className="invalid-feedback" /* className={passMatchFocus && !validMatch ? "instructions" : "offscreen"} */>Passwords must be the same.</div>
                            <div className='valid-feedback'></div>
                        </div>

                        <button disabled={!validUser || !validPass || !validMatch ? true : false}>Sign Up</button><br />
                        <span>Already have an account ? <Link to="/login">Log in here</Link></span><br />
                        <span>Continue without an account</span>
                    </form><br/>
                </div>
            )
            }
        </>
    )
}

export default Register;

