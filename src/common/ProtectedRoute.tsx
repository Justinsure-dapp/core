import React, { useEffect, useState } from "react";
import useWeb3 from "../contexts/web3context";
import { Navigate, Outlet } from "react-router-dom";

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
  const { user } = useWeb3();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
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

  if (props.type === ProtectedTypes.CONSUMERONLY) {
    return <>{user && !user.marketer ? <Outlet /> : <Navigate to="/" />}</>;
  }

  if (props.type === ProtectedTypes.MARKETERONLY) {
    return <>{user && user.marketer ? <Outlet /> : <Navigate to="/" />}</>;
  }

  return <Navigate to="/" />;
}
