import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import AppLayout from './components/AppLayout';

const serverEndpoint = "http://localhost:5001";

function App() {
  const userDetails = useSelector((state) => state.userDetails);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const isUserLoggedIn = async () => {
    try {
      const resp = await axios.post(
        `${serverEndpoint}/auth/is-user-logged-in`,
        {},
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
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={
          <AppLayout>
            <Home />
          </AppLayout>
        } />

        <Route path="/login" element={
          <AppLayout>
            <Login />
          </AppLayout>
        } />

        <Route path="/register" element={
          <AppLayout>
            <Register />
          </AppLayout>
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

        <Route path="/logout" element={<Navigate to="/home" />} />

        <Route path="*" element={<Navigate to="/home" />} />

      </Routes>
    </>
  )
}

export default App;