import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {auth,db} from "../firebase/firebase.js"
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import Navbar from "./Navbar"
import Footer from "./Footer"

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo:""
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
      window.location.href = "/login"
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position:"top-center"
      });
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <form
      onSubmit={handleRegister}
      className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
    >
      <h3 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h3>
  
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          First name
        </label>
        <input
          type="text"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last name
        </label>
        <input
          type="text"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
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
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Sign Up
      </button>
  
      <p className="text-sm text-center text-gray-600">
        Already registered?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </form>
  </div>
    <Footer/>
  </div>
  
  );
}
export default Register;