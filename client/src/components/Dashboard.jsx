import { useState, useEffect } from "react"
import Welcome from "./Welcome"
import Footer from "./Footer"
import RateCard from "./RateCard"
import axios from "axios"
import {collection,addDoc,serverTimestamp} from "firebase/firestore"
import {db} from "../firebase/firebase"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from "recharts"



const Dashboard = () => {
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [rates, setRates] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  const [historicalData, setHistoricalData] = useState([])
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    "btc",
    "usd",
    "eur",
    "inr",
    "gbp",
    "cad",
    "jpy",
  ])

  const currencySymbols = {
    usd: "$",
    eur: "€",
    inr: "₹",
    gbp: "£",
    cad: "C$",
    jpy: "¥",
    btc: "₿",
  }

  const handleStartTimeChange = (e) => setStartTime(e.target.value)
  const handleEndTimeChange = (e) => setEndTime(e.target.value)

  const toggleCurrency = (currency) => {
    setSelectedCurrencies((prev) =>
      prev.includes(currency)
        ? prev.filter((c) => c !== currency)
        : [...prev, currency]
    )
  }

  // Fetch current exchange rates
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const result = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,inr,gbp,cad,jpy" //Public api
        )
        const bitcoinRates=result.data.bitcoin
        setRates({ bitcoin: result.data.bitcoin })
        setLastUpdated(new Date().toLocaleTimeString())
        setLoading(false)
        // Storing data into firestore
        await addDoc(collection(db,"bitcoinPrices"),{
          timestamp:serverTimestamp(),
          ...bitcoinRates
        })
      } catch (error) {
        console.log("Error fetching rates:", error)
        setLoading(false)
      }
    }

    fetchRate()
    const intervalId = setInterval(fetchRate, 10 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [])

  // Fetch historical price chart data
  useEffect(() => {
    const fetchHistorical = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily`//public api
        )
        const pricePoints = response.data.prices.map(([timestamp, value]) => {
          const date = new Date(timestamp).toLocaleDateString()
          return { date, usd: value }
        })

        // Convert USD to other currencies using current rates
        const updated = pricePoints.map((point) => {
          const baseUSD = point.usd
          return {
            date: point.date,
            usd: baseUSD,
            btc: baseUSD / rates?.bitcoin?.usd || 1,
            eur: baseUSD / rates?.bitcoin?.usd * (rates?.bitcoin?.eur || 0),
            inr: baseUSD / rates?.bitcoin?.usd * (rates?.bitcoin?.inr || 0),
            gbp: baseUSD / rates?.bitcoin?.usd * (rates?.bitcoin?.gbp || 0),
            cad: baseUSD / rates?.bitcoin?.usd * (rates?.bitcoin?.cad || 0),
            jpy: baseUSD / rates?.bitcoin?.usd * (rates?.bitcoin?.jpy || 0),
          }
        })

        setHistoricalData(updated)
      } catch (err) {
        console.log("Error fetching chart data:", err)
      }
    }

    if (rates) fetchHistorical()
  }, [rates])

  const currencies = ["btc", "usd", "eur", "inr", "gbp", "cad", "jpy"]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Welcome />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Time Range Selector */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Time Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="datetime-local"
                id="start-time"
                value={startTime}
                onChange={handleStartTimeChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="datetime-local"
                id="end-time"
                value={endTime}
                onChange={handleEndTimeChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Rate Cards */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Current Bitcoin Rates</h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Object.entries(rates.bitcoin).map(([currency, value]) => (
              <RateCard key={currency} currency={currency} value={value} symbol={currencySymbols[currency]} lastUpdated={lastUpdated} />
            ))}
          </div>
        )}

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Historical Price Chart (7 Days)</h2>

          <div className="flex flex-wrap gap-3 mb-4">
            {currencies.map((currency) => (
              <button
                key={currency}
                className={`px-3 py-1 text-sm rounded-md border ${
                  selectedCurrencies.includes(currency)
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => toggleCurrency(currency)}
              >
                {currency.toUpperCase()}
              </button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedCurrencies.map((currency) => (
                <Line
                  key={currency}
                  type="monotone"
                  dataKey={currency}
                  strokeWidth={2}
                  stroke={
                    {
                      btc: "#f7931a",
                      usd: "#4caf50",
                      eur: "#2196f3",
                      inr: "#ff5722",
                      gbp: "#9c27b0",
                      cad: "#3f51b5",
                      jpy: "#ff9800",
                    }[currency]
                  }
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard
