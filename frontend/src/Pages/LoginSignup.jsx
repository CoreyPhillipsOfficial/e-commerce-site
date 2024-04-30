import React, { useState } from 'react'
import './CSS/LoginSignup.css'

export const LoginSignup = () => {

    const [state, setState] = useState('Login');

    const login = async () => {
        console.log('Login function executed');
    };

    const signup = async () => {
        console.log('Signup function executed');
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === 'Sign Up' ? <input type="text" placeholder='Your Name' /> : <></>}
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
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
