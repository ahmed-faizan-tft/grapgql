import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Modal from 'react-modal';

const query = gql`
fragment usersQuery on User {
  name,
  bio,
  shopping{
    online{
      like
    },
    offline{
      like
    }
  }
}

query getSingleUser($id1: String!,$id2: String!){
alias1: getSingleUser(id: $id1) {
  ...usersQuery
} 
alias2: getSingleUser(id: $id2) {
  ...usersQuery
} 
}
`
const DetailsModal = ({isViewed, setIsViewed,userIds,disabled,setUserIds }) => {
  const {data} = useQuery(query, {
    variables: {
     id1: userIds[0],
     id2: userIds[1],
    }
  })
  console.log("data--data--data",data);
  const openModal = () => {
    setIsViewed(true);
  };

  const closeModal = () => {
    setIsViewed(false);
    setUserIds([]);
  };

  return (
    <div>
      <button disabled={disabled} onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={isViewed}
        onRequestClose={closeModal}
        contentLabel="Details Modal"
      >
        <div>
          <hr></hr>
          <pre><span>Name: {data?.alias1?.name}</span>; <span>Love online shopping:{data?.alias1?.shopping[0]?.online.like ? "Yes": "NO"}</span>; <span>Love offline shopping:{data?.alias1?.shopping[0]?.offline.like ? "Yes": "NO"}</span></pre>
          <hr></hr>
          <pre><span>Name: {data?.alias2?.name}</span>; <span>Love online shopping:{data?.alias2?.shopping[0]?.online.like ? "Yes": "NO"}</span>; <span>Love offline shopping:{data?.alias2?.shopping[0]?.offline.like ? "Yes": "NO"}</span></pre>
          <hr></hr>
        </div>
      </Modal>
    </div>
  );
};

export default DetailsModal;
