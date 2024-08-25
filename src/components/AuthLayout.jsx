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
    // if authentication is needed for the route and user is not authenticated => redirect to login page ("/login")
    if (authentication && authStatus !== authentication) {
      navigate("/login");
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
