import { Link, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider";

export default function UpdateEmployee() {
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const positionRef = useRef();
    const storeRef = useRef();
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
        emailRef.current.value = '';
        phoneRef.current.value = '';
        positionRef.current.value = '';
        storeRef.current.value = '';
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
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            position: positionRef.current.value,
            store: storeRef.current.value,
        };
       console.log({id});
       
        axiosClient.put(`/employees/${id}`, payload)
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
                    <input ref={nameRef} placeholder="Full Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={phoneRef} placeholder="Phone" />
                    <input ref={positionRef} placeholder="Position" />
                    <select ref={storeRef} onChange={handleStoreChange} className="custom-select mb-2" placeholder="Store">
                        {/* Populate the dropdown with store names */}
                        {stores.map((store) => (
                            <option key={store.id} value={store.name}>
                                {store.name}
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-block">Update</button>
                </form>
            </div>
        </div>
    );
}
