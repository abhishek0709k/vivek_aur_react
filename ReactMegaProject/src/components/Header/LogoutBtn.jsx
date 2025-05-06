import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import APIResponse from "../../utils/apiResponse";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout().then(()=> {
        new APIResponse(200, {data: "" }, "logout successfully")
        dispatch(logout())
     })
  }
  return <button type="button" onClick={handleLogout}>Logout</button>;
};

export default LogoutBtn;
