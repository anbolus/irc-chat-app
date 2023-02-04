import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../utils/authProvider';
import axios from "../utils/axios";

export const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrorMessage('');
  }, [username, password])

  
  const handleSubmit = async (e) => {
    const body = { username: username, password: password };
  
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      }
    }
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/login`, body, axiosConfig)
        .then(res => console.log(res))
        console.log(res);
      setSuccess(true);
      navigate('/', {state: {username}});
      
    } catch (error) {
      if (!error?.res) {
        setErrorMessage('No server response');

      } else if (error.res?.status === 400) {
        setErrorMessage('Username not found or password incorrect');
      } else if (error.res?.status === 401) {
        setErrorMessage('Unauthorized');
      } else {
        setErrorMessage('Registration failed');
      }
      //errorRef.current.focus();
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
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button>Sign In</button>
                    </form>
          <span>Don't have an account ? <Link to="/register">Register here</Link></span>
          <span>Continue without an account</span>

        </section>
      )}
    </>
  )
}

export default Login