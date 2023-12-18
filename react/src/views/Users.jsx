import { useEffect } from "react";
import axiosClient from "../axios-client";
import { useState } from "react";
import {Link} from "react-router-dom";


export default function Users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)
    const [notification, setNotification] = useState(null);

    useEffect(()=>{
        getUsers();
    },[])

    const onDeleteClick = user => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
          return
        }
        axiosClient.delete(`/employees/${user.id}`)
          .then(() => {
            setNotification('User was successfully deleted')
            getUsers()
            location.reload(true);
          })
          .catch(error => {
            // Handle error if needed
            //console.error('Error deleting user:', error);
            console.log(error);
          });
    }

    const getUsers = (() => {
        axiosClient.get('/employees')
        .then(({data})=>
        {
            setLoading(false)
            console.log(data);
            setUsers(data.employees);

        })
        .catch(()=>
        {
            setLoading(false)
        })
    })

    return (
        <div>
          <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
            <h1>Employee Management</h1>
            <Link className="btn-add" to="/employee">Add new</Link>
          </div>
          <div className="card animated fadeInDown">
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Store</th>
                <th>Actions</th>
              </tr>
              </thead>
              {loading &&
                <tbody>
                <tr>
                  <td colSpan="5" class="text-center">
                    Loading...
                  </td>
                </tr>
                </tbody>
              }
              {!loading &&
                <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.position}</td>
                    <td>{u.store}</td>
                    <td>
                      <Link className="btn-edit" to={'/updateemployee/' + u.id}>Edit</Link>
                      &nbsp;
                      <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                    </td>
                  </tr>
                ))}
                </tbody>
              }
            </table>
          </div>
        </div>
      )
}