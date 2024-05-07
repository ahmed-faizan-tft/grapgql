import React, { useState } from 'react';

function UserDetails({ users, onEdit, onDelete, onView }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Bio</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user?.name}</td>
            <td>{user?.email}</td>
            <td>{user?.age}</td>
            <td>{user?.bio}</td>
            <td>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => onDelete(user)}>Delete</button>
              <button onClick={() => onView(user)}>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserDetails;
