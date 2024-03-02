/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart = (props) => {
    const { cart,handleClearCart,children } = props;
    let total = 0;
    let totalShipping=0;
    let quantity = 0;
    
    for (const product of cart) {
        // if(product.quantity === 0){
        //     product.quantity =1;
        // }
        // product.quantity = product.quantity || 1;(alternative of if)
        total = total + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity
    }
    const tax = total*7/100;
    const grandTotal = total + totalShipping + tax


    return (
        <div className='cart'>
            <h4>Order summary</h4>
            <p>Selected item : {quantity}</p>
            <p>Total price: ${total}</p>
            <p>shipping:${totalShipping}</p>
            <p>Tax:${tax.toFixed(2)}</p>
            <h6>Grand Total : ${grandTotal.toFixed(2)}</h6>

            <button onClick={handleClearCart} className='btn-clear'>
                Clear Cart <FontAwesomeIcon icon={faTrash} />
                </button>
                {children}

        </div>
    );
};

export default Cart;