import React from 'react'
import './AddProduct.css'

const AddProduct = () => {
    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Add Title</p>
                <input type="text" name='name' placeholder='Type product title here' />
            </div>
        </div>
    )
}

export default AddProduct