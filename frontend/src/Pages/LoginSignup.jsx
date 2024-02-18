import React from 'react'

export const LoginSignup = () => {
    return (
        <div className='LoginSignup'>
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                    <input type="text" placeholder='Your Name' />
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                </div>
                <button>Continue</button>
                <p className="loginsignup-login">Already have an account? <span>Login Here</span> </p>
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                </div>
            </div>
        </div>
    )
}
