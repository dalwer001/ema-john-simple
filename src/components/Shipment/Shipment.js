import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { UserContext } from '../../App';
import "./Shipment.css";


const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

const onSubmit = data => {

    console.log('form submitted', data);

};

console.log(watch("example"));

return (

    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
        {errors.name && <span className="error">Name field is required</span>}

        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
        {errors.email && <span className="error">Email field is required</span>}

        <input name="address" ref={register({ required: true })} placeholder="Your Address" />
        {errors.address && <span className="error">Address field is required</span>}
        <input name="phone" ref={register({ required: true })} placeholder="Your Phone no." />
        {errors.phone && <span className="error">Phone No. is required</span>}

        <input type="submit" />
    </form>
);
};

export default Shipment;