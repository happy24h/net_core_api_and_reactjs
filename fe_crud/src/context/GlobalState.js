import React, { createContext, useReducer, useContext, useEffect } from "react";
import AppReducer from "./AppReducer";
import { getUsers, addUser, editUser, deleteUser } from "./api"; // Thay đổi đường dẫn đến tệp api.js của bạn

// Initial State
const initialState = {
  users: [],
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      dispatch({
        type: "SET_USERS",
        payload: users,
      });
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      dispatch({
        type: "REMOVE_USER",
        payload: id,
      });
    } catch (error) {
      console.error("Error removing user: ", error);
    }
  };

  const addUserToApi = async (user) => {
    try {
      const newUser = await addUser(user);
      dispatch({
        type: "ADD_USER",
        payload: newUser,
      });
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  const editUserInApi = async (user) => {
    try {
      const updatedUser = await editUser(user);
      dispatch({
        type: "EDIT_USER",
        payload: updatedUser,
      });
    } catch (error) {
      console.error("Error editing user: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        removeUser,
        addUser: addUserToApi,
        editUser: editUserInApi,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
