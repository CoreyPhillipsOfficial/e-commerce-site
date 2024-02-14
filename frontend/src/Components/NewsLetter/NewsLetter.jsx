import React from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
    return (
        <div className="newsletter">
            <h1>Get Exclusive Offers Sent to Your Inbox</h1>
            <p>Subscribe and get the latest deals</p>
            <div>
                <input type="email" placeholder='Your Email' />
                <button>Get Exclusive Offers</button>
            </div>
        </div>
    )
}
