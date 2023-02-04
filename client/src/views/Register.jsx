import React, { useState, useEffect, useRef } from "react";

import "react-toastify/dist/ReactToastify.css";
/* import { registerRoute } from "../utils/apiCalls"; */
import axios from "../utils/axios";

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
        
        const body = {username: username, password: password};

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
            if(!error?.res) {
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

        <section>
            <p ref={errRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                </label>
                <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            aria-invalid={validUser ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && username && !validUser ? "instructions" : "offscreen"}>
                            4 to 24 characters.<br />
                            Username must begin with a letter.<br />
                        </p>
                

                <label htmlFor="password">
                    Password:
                </label>
                <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPass ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPassFocus(true)}
                            onBlur={() => setPassFocus(false)}
                        />
                        <p id="pwdnote" className={passFocus && !validPass ? "instructions" : "offscreen"}>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                        </p>

                <label htmlFor="confirm_pwd">
                        Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPass(e.target.value)}
                            value={matchPass}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={passMatchFocus && !validMatch ? "instructions" : "offscreen"}>
                            Must match the first password input field.
                        </p>
                        <button disabled={!validUser || !validPass || !validMatch ? true : false}>Sign Up</button>
            </form>
        </section>
        )}
        </>
    )
}

export default Register;