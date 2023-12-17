import { useEffect } from "react";
import axiosClient from "../axios-client";
import { useState } from "react";
import {Link} from "react-router-dom";

export default function Store(){
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState(null);
  
  useEffect(()=>{
      getUsers();
  },[])

  const getUsers = (() => {
    axiosClient.get('/store')
    .then(({data})=>
      {
          setLoading(false)
          console.log(data);
          setUsers(data.stores);

      })
      .catch(()=>
      {
          setLoading(false)
      })
  })

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Store Management</h1>
        <Link className="btn-add" to="/users/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Manager</th>
            <th>Description</th>
            <th>Website</th>
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
                <td>{u.location}</td>
                <td>{u.phone}</td>
                <td>{u.email}</td>
                <td>{u.manager}</td>
                <td>{u.description}</td>
                <td>{u.website}</td>
                <td>
                  <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
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