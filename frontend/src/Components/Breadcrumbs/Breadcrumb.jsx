import React from 'react'
import './Breadcrumb.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

export const Breadcrumb = (props) => {
    const { product } = props;
    const category = product ? product.category : '';
    return (
        <div className='breadcrumb'>
            Home <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {category} <img src={arrow_icon} alt="" /> {product && product.name}
        </div>
    )
}