import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../utils/api";
import { useAccount } from "wagmi";
import { User } from "../types";

export enum ProtectedTypes {
  PUBLICONLY,
  VERIFIEDONLY,
  CONSUMERONLY,
  MARKETERONLY,
}

interface ProtectedRouteProps {
  type: ProtectedTypes;
  fallbackUrl?: string;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const [user, setUser] = useState<User>();
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setLoading(false);
    // }, 1000);

    // return () => clearTimeout(timer);

    const fetchUser = api.user.get(address as string);
    fetchUser.then((data) => {
      console.log(data);
      setUser(data.user);
      setLoading(false);
    });

  }, []);

  if (loading) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }

  if (props.type === ProtectedTypes.PUBLICONLY) {
    return <>{!user ? <Outlet /> : <Navigate to="/" />}</>;
  }

  if (props.type === ProtectedTypes.VERIFIEDONLY) {
    !user && alert("Please Connect your wallet");
    return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
  }

  // if (props.type === ProtectedTypes.CONSUMERONLY) {
  //   return <>{user && !user.marketer ? <Outlet /> : <Navigate to="/" />}</>;
  // }

  if (props.type === ProtectedTypes.MARKETERONLY) {
    return <>{user && user.marketer ? <Outlet /> : <Navigate to="/" />}</>;
  }

  return <Navigate to="/" />;
}
