import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        RateTracker
      </Link>
      <div className="space-x-3">
        <Link to="/login" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          Login
        </Link>
        <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Register
        </Link>
      </div>
    </nav>
  )
}

export default Navbar

