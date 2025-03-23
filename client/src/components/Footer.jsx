import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-gray-600">© 2025 RateTracker. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link to="/privacy" className="text-blue-600 hover:underline text-sm">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-blue-600 hover:underline text-sm">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

