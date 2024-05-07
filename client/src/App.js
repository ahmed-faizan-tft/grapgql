import { gql, useMutation, useQuery } from '@apollo/client';
import Users from './component/Users'
import UserDetails from './component/UserDetails';
import UpdateUser from './component/UpdateUser';
import { useState } from 'react';
import DetailsModal from './component/MultipleUserDetails';

const query = gql`
query getAllData($if: Boolean!, $skipIf2: Boolean!){
  getAllUsers {
    age,
    _id,
    email @include(if: $if), # directives
    name @skip(if: $skipIf2), 
    bio
  } 
}
`
const MutationQuery = gql`
  mutation deleteOneUser($id: String!) {
    deleteUser(id:$id){
      name
      email
      age
      bio
    }
  }
`

function App() {
  const {data,refetch} = useQuery(query, {
    variables: {
      if: true, 
      skipIf2: false 
    },
    context: { 
      headers: 
      { 
        Authorization: `Bearer faian` 
      } 
    }
  })
  const [isEdit, setIsEdit] = useState(false)
  const [userDeatils, setUserDeatils] = useState({})
  const [userIds, setUserIds] = useState([])
  const [isViewed, setIsViewed] = useState(false)
  const [deleteUser] = useMutation(MutationQuery,{
    onCompleted: ()=>{
      refetch()
    }
  });

  function onEdit(user){
    setUserDeatils(user)
    setIsEdit(true)
  }
  function onDelete(user){
    deleteUser({ variables: {id:user._id} })

  }

  function onView(user){
    setUserIds([...userIds, user._id])
  }
  

  return (
    <div className="App">
      {!isEdit && <Users refetch={refetch}/>}
      {isEdit && Object.keys(userDeatils).length > 0 && <UpdateUser user={userDeatils} isEdit={isEdit} setIsEdit={setIsEdit}/>}
      <DetailsModal disabled={userIds?.length >=2 ?false:true} isViewed={isViewed} setIsViewed={setIsViewed} userIds={userIds} setUserIds={setUserIds}/>
      {data && <UserDetails users={data.getAllUsers} onEdit={onEdit} onDelete={onDelete} onView={onView}/>}
    </div>
  );
}

export default App;
