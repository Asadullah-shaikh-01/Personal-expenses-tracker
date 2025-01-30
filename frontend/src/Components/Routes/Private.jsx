import { useState, useEffect } from "react";

import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/Auth";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth(); // No need to setAuth here

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("http://localhost:1003/api/v1/user/user-auth", {
          headers: {
            Authorization: auth?.token,
          },
        });

        setOk(res.data.ok);
      } catch (error) {
        console.error("Auth check failed:", error);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setOk(false);
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Navigate to="/login" />;
}
