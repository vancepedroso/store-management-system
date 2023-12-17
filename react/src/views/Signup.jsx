import { Link } from "react-router-dom"
import { useRef } from "react";
import axiosClient from "../axios-client.js";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";

export default function Signup(){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmedRef = useRef();
    const [errors, setErrors] = useState(null)

    const {setUser, setToken} = useStateContext()

    const onSubmit = (ev) => {
        ev.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmed: passwordConfirmedRef.current.value,
        }
        console.log(payload);

        axiosClient.post('/signup', payload)
        .then(({data}) => {
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err =>
            {
                const response = err.response;
                if(response && response.status == 422)
                {
                    console.log(response.data.errors);
                    setErrors(response.data.errors)
                }
            })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
           <div className="form">
            <form onSubmit={onSubmit}>
                <h1 className="title">
                    Signup for free
                </h1>
                {errors && <div className="alert">
                    {Object.keys(errors).map(key =>(
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
                }
                <input ref={nameRef} placeholder="Full Name"/>
                <input ref={emailRef} type="email" placeholder="Email"/>
                <input ref={passwordRef} type="password" placeholder="Password" />
                <input ref={passwordConfirmedRef} type="password" placeholder="Password Confirmation"/>
                <button className="btn btn-block">Signup</button>
                <p className="message">
                    Already Registered? <Link to="/login">Sign in</Link>
                </p>
            </form>
           </div>
        </div>
    )
}