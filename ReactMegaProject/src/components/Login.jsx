import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input/Input";
import Button from "./Button/Button";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    console.log("data", data)
    setError(null);
    try {
      const session = await authService.login(data);
      console.log("session", session)
      if (session) {
        const currentUser = await authService.currentUser();
        console.log("currentUser", currentUser)
        if (currentUser) {
          dispatch(authLogin(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      console.log("error", error)
      setError(error.message);
    }
  };

  return (
    <div>
      <Link className="signup" to="/signup">
        Sign up
      </Link>

      {error && <p className="error">{error}</p>}
      <div className="form-div">
        <form onSubmit={handleSubmit(login)}>
          <Input
            className="email"
            type="email"
            label="email"
            name="email"
            placeholder="Enter the Email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    value
                  ) || "Email address must me valid",
              },
            })}
          />
          <Input
            className="password"
            type="password"
            label="password"
            placeholder="Enter the password"
            name="password"
            {...register("password", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[\S]{8,}$/.test(
                    value
                  ) || "Enter the valid password",
              },
            })}
          />
          <Button
            className="button"
            type="submit"
            bgColor="lightBlue"
            textColor="white"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
