import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../utils/authProvider';
import axios from "../utils/axios";
import 'bootstrap/dist/css/bootstrap.css';
import "../components/auth/login.css";
import logo from "../ressources/img/logo.png";

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
      navigate('/', { state: { username } });

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
        <>
          
          <div className='wrapper d-flex align-items-center has-validation justify-content w-100'>
            <form onSubmit={handleSubmit} className='loginForm was-validated'>
              <h1>Login</h1>
              <div class="form-floating mb-3 is-invalid">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  ref={userRef}
                  autoComplete="off"
                  focus
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Username'
                  value={username}
                  required />
                <label for="floatingInput">Username</label>
                <div className='invalid-feedback'>Please enter your username.</div>
                <div className='valid-feedback'></div>
              </div>

              <div class="form-floating mb-3 is-invalid">
                <input
                  type="password"
                  class="form-control"
                  id="floatingInput"
                  ref={userRef}
                  autoComplete="off"
                  focus
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='password'
                  value={password}
                  required />
                <label for="floatingInput">Password</label>
                <div className='invalid-feedback'>Please enter your password.</div>
                <div className='valid-feedback'></div>
              </div>


              <button type="submit" classname="btn btn-primary mt-2 w-100">Sign In</button><br />
              <span>Don't have an account ? <Link to="/register">Register here</Link></span><br />
              <span>Continue without an account</span>
            </form><br />
          </div></>


      )}
    </>
  )
}

export default Login