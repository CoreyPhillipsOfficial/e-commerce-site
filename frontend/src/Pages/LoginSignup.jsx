import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import { baseUrl } from '../config.js'

export const LoginSignup = () => {

    // State to manage login/signup form and input fields
    const [state, setState] = useState('Login');
    const [formData, setForData] = useState({
        username: '',
        password: '',
        email: ''
    });

    // Function to handle input field changes
    const changeHandler = (e) => {
        setForData({ ...formData, [e.target.name]: e.target.value })
    };

    // Function to handle user login
    const login = async () => {
        console.log('Login function executed', formData);
        let responseData;
        // API call to login user
        await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData = data)

        // Redirect user to home page on successful login or show error alert
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace('/');
        } else {
            alert(responseData.errors)
        }
    };

    // Function to handle user signup
    const signup = async () => {
        console.log('Signup function executed', formData);
        let responseData;
        // API call to register user
        await fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData = data)

        // Redirect user to home page on successful signup or show error alert
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace('/');
        } else {
            alert(responseData.errors)
        }
    };

    return (
        <div className='loginsignup'>
            {/* Login/Signup form */}
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === 'Sign Up' ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email' />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                </div>
                <button onClick={() => { state === 'Login' ? login() : signup() }}>Continue</button>
                {state === 'Sign Up'
                    ? <p className="loginsignup-login">Already have an account? <span onClick={() => { setState('Login') }} >Login</span> </p>
                    : <p className="loginsignup-login">Create an account <span onClick={() => { setState('Sign Up') }} >here</span> </p>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, I  agree to the terms of use and privacy policy.</p>
                </div>
            </div>
        </div>
    )
}
