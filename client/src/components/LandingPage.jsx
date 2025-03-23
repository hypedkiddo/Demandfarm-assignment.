import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "./Footer"

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Track Bitcoin & Forex Rates in Real-Time
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get instant access to live cryptocurrency and forex exchange rates with our powerful tracking platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 text-lg font-medium"
            >
              Register
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage

