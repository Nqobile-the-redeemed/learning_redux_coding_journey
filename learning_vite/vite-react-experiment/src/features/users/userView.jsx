import React, { useState } from 'react';

export const UserView = () => {

// DUMMY CODE TO MAKE IT RUN
const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Mike" },
  ];

const userIDs = users.map((user) => user.id);
const userNames = users.map((user) => user.name);
const userQuantity = users.length;


  return (
    <div>
        <h1>User View</h1>
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
  )
}
