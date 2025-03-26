import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route,Navigate,useNavigate } from 'react-router-dom';
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {auth} from "./firebase/firebase.js"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css"


// function Navigation() {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <button onClick={() => navigate("/login")}>Login</button>
//       <button onClick={() => navigate("/register")}>Register</button>
//     </div>
//   );
// }

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
   const unsubscribe= auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe(); // cleanup
  },[]);
  return (
    <Router>
      {/* <Navigation/> */}
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route
                path="/"
                element={<LandingPage/>}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<PrivateRoute user={user}> <Dashboard/> </PrivateRoute>} /> 
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;