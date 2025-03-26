
import { useState, useEffect } from "react"
import Welcome from "./Welcome"
import Footer from "./Footer"
import {collection,getDocs} from "firebase/firestore"
import { db } from "../firebase/firebase"

export default function Reports() {
  const [exchangeRates, setExchangeRates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for demonstration purposes
    const mockData = [
      {
        cad: 1.35,
        eur: 0.92,
        gbp: 0.79,
        inr: 83.12,
        jpy: 149.82,
        usd: 1.0,
        timestamp: new Date("2023-11-01T10:30:00Z"),
      },
      {
        cad: 1.36,
        eur: 0.93,
        gbp: 0.78,
        inr: 83.45,
        jpy: 150.21,
        usd: 1.0,
        timestamp: new Date("2023-11-02T10:30:00Z"),
      },
      {
        cad: 1.34,
        eur: 0.91,
        gbp: 0.77,
        inr: 82.98,
        jpy: 148.75,
        usd: 1.0,
        timestamp: new Date("2023-11-03T10:30:00Z"),
      },
      {
        cad: 1.37,
        eur: 0.94,
        gbp: 0.8,
        inr: 83.76,
        jpy: 151.05,
        usd: 1.0,
        timestamp: new Date("2023-11-04T10:30:00Z"),
      },
      {
        cad: 1.33,
        eur: 0.9,
        gbp: 0.76,
        inr: 82.54,
        jpy: 147.92,
        usd: 1.0,
        timestamp: new Date("2023-11-05T10:30:00Z"),
      },
    ]

    // Simulate API fetch delay
    setTimeout(async () => {
     const data=await getDocs(collection(db,"bitcoinPrices"))
     const tempdata=[];
    data.forEach((item)=>{
        const docData = item.data();
        if (docData.timestamp?.toDate) {
          docData.timestamp = docData.timestamp.toDate(); // Convert Firestore Timestamp to JS Date
        }
        tempdata.push(docData);
    })
      setExchangeRates(tempdata)
      setLoading(false)
    }, 500)
  }, [])

  // Format timestamp to readable format
  const formatDate = (timestamp) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(timestamp)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (<>
        <Welcome/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Data of Last Fetched Exchange rates</h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USD</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CAD</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EUR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GBP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">INR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JPY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {exchangeRates.map((rate, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(rate.timestamp)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{rate.usd.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{rate.cad.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{rate.eur.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{rate.gbp.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{rate.inr.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{rate.jpy.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>* Exchange rates are relative to USD (1.00)</p>
      </div>
    </div>
      <Footer/>
    </>
  )
}

