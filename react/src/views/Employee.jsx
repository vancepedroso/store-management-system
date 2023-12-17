import { Link } from "react-router-dom"
import { useRef } from "react";
import axiosClient from "../axios-client.js";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";
import { useEffect } from "react";

export default function Signup(){

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const positionRef = useRef();
    const storeRef = useRef();
    const [errors, setErrors] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        // Check if successMessage is set and clear the fields
        if (successMessage) {
          clearInputFields();
        }
      }, [successMessage]); // Run this effect only when successMessage changes
    
      const clearInputFields = () => {
        nameRef.current.value = '';
        emailRef.current.value = '';
        phoneRef.current.value = '';
        positionRef.current.value = '';
        storeRef.current.value = '';
      };

    const {setUser, setToken} = useStateContext()

    const onSubmit = (ev) => {
        ev.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            position: positionRef.current.value,
            store: storeRef.current.value,
        }
        console.log(payload);

        axiosClient.post('/employees', payload)
        .then(({data}) => {
            setSuccessMessage(data.message);
            if(data.status == 201)
            {
                clearInputFields();
            }
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
                    Add new Employee
                </h1>
                {successMessage && (
                    <div className="success-message">{successMessage}</div>
                )}
                {errors && <div className="alert">
                    {Object.keys(errors).map(key =>(
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
                }
                <input ref={nameRef} placeholder="Full Name"/>
                <input ref={emailRef} type="email" placeholder="Email"/>
                <input ref={phoneRef} placeholder="Phone" />
                <input ref={positionRef} placeholder="Position"/>
                <input ref={storeRef}  placeholder="Store"/>
                <button className="btn btn-block">Add</button>
            </form>
           </div>
        </div>
    )
}