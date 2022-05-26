import {useRef, useState} from 'react';
import classes from './CheckOut.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5 ;
const Checkout = (props) => {

    const [isValid, setIsValid] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enterdName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enterdName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setIsValid({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid,
            city: enteredCityIsValid
        });

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid;

        if(!formIsValid){
            return;
        }
        props.onConfirm({
            name: enterdName,
            city: enteredCity,
            postalCode: enteredPostalCode,
            street: enteredStreet
        });
    };

    const nameControlClasses = `${classes.control} ${isValid.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${isValid.street ? '' : classes.invalid}`
    const cityControlClasses = `${classes.control} ${isValid.city ? '' : classes.invalid}`
    const postalCodeControlClasses = `${classes.control} ${isValid.postalCode ? '' : classes.invalid}`

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!isValid.name && <p>Please enter a valid name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!isValid.street && <p>Please enter a valid street</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef}/>
                {!isValid.postalCode && <p>please enter a valid postalCode</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef}/>
                {!isValid.city && <p>Please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button disabled={!isValid} className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
