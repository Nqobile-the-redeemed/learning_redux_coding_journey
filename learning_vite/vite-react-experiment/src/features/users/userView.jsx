import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from './userSlice';

export const UserView = () => {

// The variouse states
const [selectedUsers, setSelectedUsers] = useState([]);


// The variouse imports
const dispatch = useDispatch();



// The user data
const usersInfo = useSelector((state) => state.user);
const userIDs = usersInfo.userIDs;
const userNames = usersInfo.userNames;
const userQuantity = usersInfo.userQuantity;


// The functiont to fetch data and starte the state
useEffect(() => {
  dispatch(fetchUsers());
}, []);



  return (
    <div>
        <h1>User View</h1>
        {usersInfo.loading && <p>Loading...</p>}
        {usersInfo.error && !usersInfo.loading ? <div>Error: {usersInfo.error}</div> : null}
        {!usersInfo.loading && userQuantity > 0 ? (
          <div>
            <div>
                <p>Users Counter: {userQuantity} </p>
            </ div>
            <div>
                <ul>
                    {userNames.map((name, index) => (
                        <li key={userIDs[index]}>{name}</li>
                  ))}
                </ul>
            </div>
          </div>
         ) : null
        }
        
    </div>
  )
}
