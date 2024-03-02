/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
       
        //step 1: get id

        for(const id in storedCart){
            //step 2: get the product by using id

            const addedproduct = products.find(product=>product.id === id)
            
            //step 3: get quantity of the product

           
            if(addedproduct){
                //add quantity
                const quantity = storedCart[id];
                addedproduct.quantity =quantity;
                //add the added product to the saved cart
                savedCart.push(addedproduct)

            }
            // console.log(addedproduct)
        }
        //step 4: set the cart
        setCart(savedCart);

    }, [products])
    const handleAddToCart = (product) => {
        // const newCart = [...cart, product];
        let newCart = [];
        //if product doesnot exist in the cart then set quantity =1
        //if exists,update the quantity by 1
        const exists = cart.find(pd=>pd.id===product.id);
        if(!exists){
            product.quantity =1;
            newCart = [...cart,product]
        }
        else{
            exists.quantity = exists.quantity +1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining,exists]
        }
        



        setCart(newCart);
        

        addToDb(product.id)
    }
    const handleClearCart = () =>{
        setCart([]);
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}


                    ></Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart} handleClearCart={handleClearCart} >
                    <Link to="/orders"><button style={{width:'95%'}}>Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
}

export default Shop;