
const CurrencyToggle = ({ currencies, activeCurrency, onToggle }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {currencies.map((currency) => (
        <button
          key={currency}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeCurrency === currency ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => onToggle(currency)}
        >
          {currency.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default CurrencyToggle

