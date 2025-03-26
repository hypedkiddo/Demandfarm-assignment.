import { Link } from "react-router-dom"
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate=useNavigate();
    const [userDetails, setUserDetails] = useState(null);
      const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
          console.log(user);
    
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            console.log(docSnap.data());
          } else {
            console.log("User is not logged in");
          }
        });
      };
      useEffect(() => {
        fetchUserData();
      }, []);
    
      async function handleLogout() {
        try {
          await auth.signOut();
          window.location.href = "/login";
          console.log("User logged out successfully!");
        } catch (error) {
          console.error("Error logging out:", error.message);
        }
      }
  return (
    <nav className="sticky top-0 z-10 bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        RateTracker
      </Link>
      <div className="flex space-x-3">
        <div className="px-4 py-2 text-blue-600 hover:text-blue-800">
        <h3>Welcome {userDetails?.firstName} 🙏🙏</h3>
        </div>
        <button className="btn btn-primary" onClick={handleLogout}>
            Logout
        </button>
        <button className="btn btn-primary" onClick={()=>{navigate("/report")}}>
            Report
        </button>
        
      </div>
    </nav>
  )
}

export default Welcome