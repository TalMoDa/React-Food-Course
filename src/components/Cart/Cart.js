import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import {Fragment, useContext, useState} from "react";
import CartItem from "./CartItem";
import Checkout from "./CheckOut";

const Cart = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [isCheckout,setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const cartItemsRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemsAddHandler = item => {
        cartCtx.addItem(item);
    };
    const orderHandler = event => {
        setIsCheckout(true);
    };
    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://movies-ee0e6-default-rtdb.firebaseio.com/order.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.cleanCart();
    };



    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) =>(
               <CartItem
                   key={item.id} name={item.name}
                   price={item.price} amount={item.amount}
                   onRemove={cartItemsRemoveHandler.bind(null, item.id)}
                   onAdd={cartItemsAddHandler.bind(null, item)}
               />
            ))}
            </ul>
            );

    const modalActions =  <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>;


    const cartModalContent =
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout ? <Checkout onConfirm={submitOrderHandler} onCancle={props.onClose}/> : modalActions}
        </Fragment>

    const isSubmittingModalContent = <p>Sending Order Data....</p>;
    const didSubmitModalContent = <p>Order sent Successfully!</p>;



    return (
            <Modal onClose={props.onClose}>
                {!isSubmitting && !didSubmit && cartModalContent}
                {isSubmitting && isSubmittingModalContent}
                {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
    );
};
export default Cart;
