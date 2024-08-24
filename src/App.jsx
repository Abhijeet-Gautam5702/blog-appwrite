import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice.js";
import authService from "./appwrite/auth.js";
import { Header, Footer } from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {
  // local state
  const [loading, setLoading] = useState(true);

  // dispatch method
  const dispatch = useDispatch();

  /*
    On Page Load::
    1. Get the current user data from appwrite auth service
    2. If the user is logged-in => 
        i. an object with the currently-logged-in user data will be returned from auth-service
        ii. dispatch the login-reducer to the store
    3. If the user is logged-out => 
        i. null will be returned from auth-service (update the login-status as true in the store)
        ii. dispatch the logout-reducer to the store (update the login-status as false in the store)
    4. Finally, set the loading-local-state = false
  */
  useEffect(() => {
    /*
      NOTE: useEffect callback cannot be an async-function. So declare an async function inside it and invoke it right after.
    */
    /*
    NOTE: Initially (when no user is logged-in) this code will throw an error because it will not be able to get the currently-logged-in user.
   */
    const setUserDataToStore = async () => {
      console.log("debug test");
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          // userData not found => no logged-in user found => dispatch logout to store
          dispatch(logout());
        }
      } catch (error) {
        // error thrown by authService => no logged-in user found => dispatch logout to store
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    setUserDataToStore();
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>{/* <Outlet/> */}</main>
        <Footer />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
