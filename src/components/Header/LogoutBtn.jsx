import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";

/*
    OVERALL FUNCTIONALITY

    Whenever logout button is clicked, user will be logged out using the appwrite auth-service and the state in redux store will be updated.
*/

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      // log the user out using appwrite service
      const response = await authService.logout();
      // update the login-status of user in the redux store
      if (response) {
        dispatch(logout());
      } else {
        throw error;
      }
    } catch (error) {
      console.log(`User Logout Error: ${error}`);
      throw error;
    }
  };

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
