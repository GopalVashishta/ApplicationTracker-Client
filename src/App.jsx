import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import AppLayout from './components/AppLayout';
import UserLayout from "./components/UserLayout";

const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

function App() {
  const userDetails = useSelector((state) => state.userDetails);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const isUserLoggedIn = async () => {
    try {
      const resp = await axios.get(
        `${serverEndpoint}/auth/is-user-logged-in`,
        { withCredentials: true },
      );
      if (resp.status !== 200) throw new Error("User not logged in");
      dispatch({ type: "SET_USER", payload: resp.data.user });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { isUserLoggedIn(); }, []);

  if (loading) {
    return (
      <div className="container text-center">
        <h3>Loading....</h3>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={userDetails ?
          (<Navigate to='/dashboard' />) :
          (<Navigate to="/home" />)} />

        <Route path="/home" element={userDetails ?
          (<Navigate to='/dashboard' />) :
          (<AppLayout>
            <Home />
          </AppLayout>)
        } />

        <Route path="/login" element={
          userDetails ? (<Navigate to="/dashboard" />) : (
            <AppLayout>
              <Login />
            </AppLayout>)
        } />

        <Route path="/register" element={
          userDetails ? (<Navigate to="/dashboard" />) : (
            <AppLayout>
              <Register />
            </AppLayout>)
        } />

        <Route path="/reset-password"
          element={
            <AppLayout>
              <ResetPassword />
            </AppLayout>
          }
        />

        <Route path="/change-password"
          element={
            <AppLayout>
              <ChangePassword />
            </AppLayout>
          }
        />

        <Route path="/dashboard" element={
          userDetails ? (
            <UserLayout>
              <Dashboard />
            </UserLayout>
          ) : (
            <Navigate to="/login" />
          )
        } />

        <Route path="/projects" element={
          userDetails ? (
            <UserLayout>
              <Projects />
            </UserLayout>
          ) : (
            <Navigate to="/login" />
          )
        } />  

        <Route path="/logout" element={<Navigate to="/login" />} />

        <Route path="*" element={<Navigate to="/home" />} />

      </Routes>
    </>
  )
}

export default App;