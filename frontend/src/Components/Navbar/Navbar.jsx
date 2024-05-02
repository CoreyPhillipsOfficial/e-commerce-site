import { React, useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'

export const Navbar = () => {
    // State to track active menu item
    const [menu, setMenu] = useState('Shop');
    // Accessing context to get total cart items
    const { getTotalCartItems } = useContext(ShopContext);
    // Ref for the dropdown menu
    const menuRef = useRef();

    // Function to handle logo click
    const handleLogoClick = () => {
        setMenu('shop'); // Set active menu to 'shop' when logo is clicked
    };

    // Function to toggle dropdown menu visibility
    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible'); // Toggle visibility of menu
        e.target.classList.toggle('open'); // Toggle 'open' class for dropdown icon
    }

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <Link to='/' onClick={handleLogoClick}>
                    <img src={logo} alt="" />
                    {/* <p>SHOPPER</p> */}
                </Link>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className='nav-menu'>
                {/* Menu items with conditional underline based on active menu state */}
                <li onClick={() => { setMenu('shop') }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === 'shop' ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu('womens') }}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link>{menu === 'womens' ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu('mens') }}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === 'mens' ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu('kids') }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === 'kids' ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {/* Conditional rendering of login/logout button */}
                {localStorage.getItem('auth-token')
                    ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button> : <Link to='/login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-login-cart-count">{getTotalCartItems()}</div>
            </div>
        </div >
    )
}
