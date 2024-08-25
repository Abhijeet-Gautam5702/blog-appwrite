import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/*
    Protected Components:-
    This is HOC which takes in other components and protects them from unauthenticated users.
*/

export default function Protected({ children, authentication }) {
  // local state
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.status);

  useEffect(() => {
    // if (!authStatus) {
    //   navigate("/"); //user already logged-in => redirect to home-route
    // }
    // else {
    //   navigate("/login"); // user not logged-in => redirect to login-route
    // }

    // if (authentication !== authStatus) {
    //   if (!authentication) {
    //     navigate("/login");
    //   } else {
    //     navigate("/");
    //   }
    // }

    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    setLoading(false);
  }, [authStatus, navigate]);

  return loading ? (
    <>
      <p>Loading...</p>
    </>
  ) : (
    <div>{children}</div>
  );
}
