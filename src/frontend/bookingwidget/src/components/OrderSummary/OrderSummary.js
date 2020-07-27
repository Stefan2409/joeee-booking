import React from 'react';
import classes from './OrderSummary.module.css';

const OrderSummary = (props) => {

    return (
        <div className={classes.Ordercontainer}
                style={{display: props.show ? 'block' : 'none',
                opacity: props.show ? '1': '0'}}>
            <h2>Order Summary</h2>
        </div>       
    );
}

export default OrderSummary;