import React, { useState } from 'react'
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import Navbar from "./Navbar"
import Footer from "./Footer"
import SignInwithGoogle from './SignInWithGoogle';

function Login() {
    const[email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in Successfully");
        
        navigate("/dashboard");
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
      } catch (error) {
        console.log(error.message);
  
        toast.error(error.message, {
          position: "bottom-center",
        });
      }
    };
  return (
    <div>
       <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
     
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
  >
    <h3 className="text-2xl font-semibold text-center text-gray-800">Login</h3>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email address
      </label>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button
      type="submit"
      className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
    >
      Submit
    </button>

    <div>
    <SignInwithGoogle/>
    </div>

  </form>
</div>
  <Footer/>
</div>

  )
}

export default Login
