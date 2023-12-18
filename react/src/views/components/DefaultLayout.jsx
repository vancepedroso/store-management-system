import { Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../../axios-client";

export default function DefaultLayout(){
    const {user, token, setUser, setToken} = useStateContext()

    if(!token)
    {
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('logout')
        .then(()=>
        {
            setUser({})
            setToken(null)
        })
    }

    useEffect(()=> {
        axiosClient.get('/user')
        .then(({data})=>
        {
            setUser(data)
        })
    })

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/store">Store Management</Link>
                <Link to="/users">Employee Management</Link>
            </aside>
           <div className="content">
            <header>
                <div>
                    Header
                </div>
                <div>
                    {user.name}
                    <a href="#" onClick={onLogout}  className="btn-logout">Logout</a>
                </div>
            </header>
            <main>
              <Outlet />
            </main>
            <footer>
                {/* Customize the footer content as needed */}
                <p>&copy; 2023 Created by Vance Pedroso </p>
            </footer>
           </div>
        </div>
    )
}