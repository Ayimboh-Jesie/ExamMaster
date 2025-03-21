import React, {useContext} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {ModalContext} from "../context/ModalContext";

const ProtectedRoute = ({ children }) => {
   const { isAuthenticated } = useAuth();
    const { openLoginModal } = useContext(ModalContext);
    const location = useLocation();

   if (!isAuthenticated()) {
     openLoginModal();
     return <Navigate to="/" state={{ from: location }} />;
   }

  return children;
};

export default ProtectedRoute;