import { useState, useEffect } from "react";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Authentication from "./components/Authentication";
import Homepage from "./components/pages/Homepage";
import Login_page from "./components/pages/Login_page";
import Signup_page from "./components/pages/Signup_page";
import AllPosts from "./components/pages/AllPosts";
import AddPosts from "./components/pages/AddPosts";
import EditPosts from "./components/pages/EditPosts";
import Post from "./components/pages/Post";
import Header from "./components/Header/Header";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .currentUser()
      .then((data) => {
        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <div className="loading">Loading...</div>;
  return (
    <div>
      <div>
        <Header />
      </div>
      <Routes>
      <Route
        path="/"
        element={
          <Authentication authentication={false}>
            <Homepage />
          </Authentication>
        }
      />
      <Route
        path="/login"
        element={
          <Authentication authentication={false}>
            <Login_page />
          </Authentication>
        }
      />
      <Route
        path="/signup"
        element={
          <Authentication authentication={false}>
            <Signup_page />
          </Authentication>
        }
      />
      <Route
        path="/all-posts"
        element={
          <Authentication authentication={true}>
            <AllPosts />
          </Authentication>
        }
      />
      <Route
        path="/add-posts"
        element={
          <Authentication authentication={true}>
            <AddPosts />
          </Authentication>
        }
      />
      <Route
        path="/edit-post/:slug"
        element={
          <Authentication authentication={true}>
            <EditPosts />
          </Authentication>
        }
      />
      <Route
        path="/post/:slug"
        element={
          <Authentication authentication={true}>
            <Post />
          </Authentication>
        }
      />
    </Routes>
    </div>
    
  );
}

export default App;
