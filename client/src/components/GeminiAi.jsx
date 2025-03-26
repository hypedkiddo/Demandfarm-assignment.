import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const apikey = import.meta.env.VITE_GEMINI_API_KEY;
const genai = new GoogleGenerativeAI(apikey);

export default function GeminiAi() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    try {
      // 1. Fetch bitcoin data from coingecko
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily"
      );

      // 2. Convert timestamps to readable dates (corrected by multiplying by 1000)
      const formattedPrices = data.prices.map(([timestamp, price]) => {
        const date = new Date(timestamp * 1000).toLocaleString(); // Corrected timestamp conversion
        return { date, price };
      });

      // 3. Prepare prompt
      const prompt = `
        ${JSON.stringify(formattedPrices)}
        This is bitcoin price for the last 7 days. Each entry is {date, price_in_usd}.
        Advise the user on the best possible investment decision: 
        - Determine where $1000 invested at the start would have yielded the highest return by the end of the period. 
        - Also determine the highest possible yield at any point (not necessarily at the end).
        Provide the response in clear bullet points.
      `;

      // 4. Generate content
      const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      setResponse(text);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setResponse("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Bitcoin Investment Insights (Gemini AI)</h2>

      <button
        onClick={run}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 mb-4"
      >
        {loading ? "Analyzing..." : "Run Gemini AI Analysis"}
      </button>

      <div className="bg-gray-100 p-4 rounded text-lg text-gray-800 border border-gray-200">
        {response ? (
          <ul className="list-disc pl-5">
            {response.split("\n").map((line, index) => (
              <li key={index} className="mb-2">
                {line}
              </li>
            ))}
          </ul>
        ) : (
          "No response yet. Click the button to start analysis."
        )}
      </div>
    </div>
  );
}
