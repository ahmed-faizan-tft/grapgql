import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

const MutationQuery = gql`
  mutation updateOneUser($id: String,$name: String, $email: String, $age: Int, $bio: String) {
    updateUser(id:$id, name: $name,email: $email,age: $age,bio: $bio){
      name
      email
      age
      bio
    }
  }
`

function UserInfoForm({user,isEdit,setIsEdit}) {
  const [updateUser] = useMutation(MutationQuery);
  const [formData, setFormData] = useState({
    id: user._id,
    name: user?.name,
    email: user.email,
    age: user.age,
    bio: user.bio,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name=== "age" ? Number(value): value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ variables: formData });
    setFormData({
      name: '',
      email: '',
      age: '',
      bio: ''
    });
    setIsEdit(false)
  };

  return (
    <div>
      <h2>Update User Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Bio:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserInfoForm;
