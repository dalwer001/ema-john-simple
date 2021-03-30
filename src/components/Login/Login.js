
import React from 'react';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { Redirect, useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFBSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManger';





function Login() {

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: ''
    });

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res,true);
            });
    }

    const fbSignIn = () => {
        handleFBSignIn()
            .then(res => {
               handleResponse(res,true);
            })
    }



    const signOut = () => {
        handleSignOut()
            .then(res => {
            handleResponse(res,false);
            })
    }

    const handleResponse =(res, Redirect) =>{
        setUser(res);
        setLoggedInUser(res);
        if(Redirect){
            history.replace(from);
        }
    }


    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res,true);
                })
        }
            if (!newUser && user.email && user.password) {
                signInWithEmailAndPassword(user.email, user.password)
                    .then(res => {
                        handleResponse(res,true);
                    })
                e.preventDefault();
            }
    }


            return (
                <div style={{ textAlign: "center" }}>
                    {
                        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In</button>
                    }
                    <button onClick={fbSignIn}>Log in using facebook</button>
                    {
                        user.isSignedIn && <div>
                            <p>welcome, {user.name}</p>
                            <p>Your email:{user.email}</p>
                            <img src={user.photo} alt="" />
                        </div>
                    }

                    <h1>Our Won Authentication</h1>
                    <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                    <label htmlFor="newUser">New User Sign Up</label>
                    <form onSubmit={handleSubmit}>
                        {

                            newUser &&
                            <input type="text" placeholder="Your Name" name='name' onBlur={handleBlur} required />


                        }

                        <br />
                        <input type="text" placeholder="Your Email" name='email' onBlur={handleBlur} required />
                        <br />
                        <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" />
                        <br />
                        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
                    </form>
                    <p style={{ color: 'red' }}>{user.error}</p>
                    {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'logged In'}Successfully.</p>}
                </div>
            );
        }

export default Login;
