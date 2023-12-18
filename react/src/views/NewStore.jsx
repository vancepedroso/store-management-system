import { Link } from "react-router-dom"
import { useRef } from "react";
import axiosClient from "../axios-client.js";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";
import { useEffect } from "react";

export default function NewStore(){

    const nameRef = useRef();
    const locationRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const managerRef = useRef();
    const descRef = useRef();
    const webRef = useRef();
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
        locationRef.current.value = '';
        phoneRef.current.value = '';
        emailRef.current.value = '';
        managerRef.current.value = '';
        descRef.current.value = '';
        webRef.current.value = '';
      };

    const {setUser, setToken} = useStateContext()

    const onSubmit = (ev) => {
        ev.preventDefault()

        const payload = {
            name: nameRef.current.value,
            location: locationRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
            manager_name: managerRef.current.value,
            description: descRef.current.value,
            website: webRef.current.value,
        }
        console.log(payload);

        axiosClient.post('/store', payload)
        .then(({data}) => {
            setSuccessMessage(data.message);
            if(data.status == 1)
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
                    Add new Store
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
                <input ref={nameRef} placeholder="Store Name"/>
                <input ref={locationRef}  placeholder="Location"/>
                <input ref={phoneRef} placeholder="Phone" />
                <input ref={emailRef}  placeholder="Email"/>
                <input ref={managerRef}  placeholder="Manager"/>
                <input ref={descRef}  placeholder="Description"/>
                <input ref={webRef}  placeholder="Website"/>
                <button className="btn btn-block">Add</button>
            </form>
           </div>
        </div>
    )
}