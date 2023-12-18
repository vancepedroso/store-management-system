import { Link, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider";

export default function UpdateStore() {
    const nameRef = useRef();
    const locationRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const managerRef = useRef();
    const descriptionRef = useRef();
    const websiteRef = useRef();
    const [errors, setErrors] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [stores, setStores] = useState([]);
    const { id } = useParams();

    console.log("ID:", id);

    useEffect(() => {
        // Fetch stores when the component mounts
        axiosClient.get('/store')
            .then(response => {
                setStores(response.data.stores);
            })
            .catch(error => {
                console.error('Error fetching stores:', error);
            });
    }, []);

    useEffect(() => {
        // Check if successMessage is set and clear the fields
        if (successMessage) {
            clearInputFields();
        }
    }, [successMessage]); // Run this effect only when successMessage changes

    const clearInputFields = () => {
        nameRef.current.value = '';
        locationRef.current.value = '';
        emailRef.current.value = '';
        managerRef.current.value = '';
        descriptionRef.current.value = '';
        websiteRef.current.value = '';
    };

    const { setUser, setToken } = useStateContext();

    const handleStoreChange = (event) => {
        // Update storeRef value when the selection changes
        storeRef.current.value = event.target.value;
    };

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            location: locationRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
            manager_name: managerRef.current.value,
            description: descriptionRef.current.value,
            website: websiteRef.current.value,
        };
       console.log(payload);
       
        axiosClient.put(`/store/${id}`, payload)
            .then(({ data }) => {
                setSuccessMessage(data.message);
                if (data.status === 1) {
                    clearInputFields();
                }
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Update Employee Information
                    </h1>
                    {successMessage && (
                        <div className="success-message">{successMessage}</div>
                    )}
                    {errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                    }
                    <input ref={nameRef} placeholder="Store Name" />
                    <input ref={phoneRef} placeholder="Phone" />
                    <input ref={locationRef} placeholder="location" />
                    <input ref={emailRef} placeholder="Email" />
                    <input ref={managerRef} placeholder="Manager" />
                    <input ref={descriptionRef} placeholder="Description" />
                    <input ref={websiteRef} placeholder="Website" />
                    <button className="btn btn-block">Update</button>
                </form>
            </div>
        </div>
    );
}
