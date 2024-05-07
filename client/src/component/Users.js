import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

const MutationQuery = gql`
  mutation addNewUser($name: String!, $email: String!, $age: Int!, $bio: String!) {
    addUser(name: $name,email: $email,age: $age,bio: $bio){
      name
      email
      age
      bio
    }
  }
`

function UserInfoForm({refetch}) {
  const [addUser, { data, loading, error }] = useMutation(MutationQuery,{
    onCompleted: ()=>{refetch()}
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name=== "age" ? Number(value): value 
    }));
  };

  const handleSubmit = (e) => {
    try {
      
      e.preventDefault();
      addUser({ variables: formData });
      setFormData({
        name: '',
        email: '',
        age: '',
        bio: ''
      });
    } catch (error) {
      console.log(error);
    }
  };

    
    return (
      <div>
      <h2>User Information</h2>
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
