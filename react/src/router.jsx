import {createBrowserRouter} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import Employee from "./views/Employee.jsx";
import Store from "./views/Store.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./views/components/DefaultLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import GuestLayout from "./views/components/GuestLayout.jsx";
import { Navigate } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/users"/>
            },
            {
                path: '/users',
                element: <Users />

            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/employee',
                element: <Employee/>
            },
            {
                path: '/store',
                element: <Store/>
            }

        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
])

export default router;