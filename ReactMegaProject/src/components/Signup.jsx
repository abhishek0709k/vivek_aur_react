import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import authService from '../appwrite/auth'
import Input from './Input/Input'
import Button from './Button/Button'
import { useForm } from 'react-hook-form'

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();
  
  const signup = async(data) => {
    setError("")
    try {
        const session = await authService.createAccount(data);
        if(session){
            navigate("/login")
        }
    } catch (error) {
        setError(error.message)
    }
  }
  return (
    <div className='container'>
        <Link className="login" to={"/login"}>Login</Link>
        { error && <p className='error'>{error}</p> }
        <div className='signup-form'>
            <form onSubmit={handleSubmit(signup)}>
                <Input 
                    className= "name"
                    name= "name"
                    type= "text"
                    label= "Name"
                    placeholder= "Enter the password"
                    { ...register("name", {
                        required: true
                    })}
                />
                <Input 
                    className= "email"
                    type= "email"
                    label= "Email"
                    name="email"
                    placeholder= "Enter the email"
                    { ...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value)=> 
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Enter the validate email"
                        }
                    })}
                />
                <Input 
                    className= "password"
                    type= "password"
                    label= "Password"
                    placeholder= "Enter the password"
                    name="password"
                    { ...register("password", {
                        required: true,
                        validate: {
                            matchPattern: (value)=>
                                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[\S]{8,}$/.test(value) || "Enter the valid password"
                        }
                    })}
                />
                <Button className='signup' type="submit" bgColor="lightBlue" textColor="white">Signup</Button>
            </form>
        </div>
    </div>
  )
}

export default Signup