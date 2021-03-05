import React from 'react';

const ReviewItem = (props) => {
    const {img,name,quantity,key, price} = props.product;
    const reviewItemStyle ={
        borderBottom:'1px solid lightgray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <img src={img} alt=""/>
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
                <p><small>$ {price}</small></p>
            <button className="main-btn" onClick={()=> props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;