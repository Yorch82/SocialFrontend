import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsersList } from "../../state/index";
import UserList from "./userList";

import dotenv from "react-dotenv";

const UsersList = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);
  const token = useSelector((state) => state.token);

  const getAllUsers = async () => {
    const response = await fetch(
      dotenv.REACT_APP_API_URL + `/users`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setUsersList({ usersList: data }));
  };
  
  useEffect(() => {
    getAllUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {usersList.map(
        ({
          _id,
          name,          
          email,
          avatar,
          role,
        }) => (
          <UserList
            key={_id}
            userId={_id}
            name={name}            
            email={email}            
            avatar={avatar}
            role={role}
          />
        )
      )}
    </>
  );
};

export default UsersList;