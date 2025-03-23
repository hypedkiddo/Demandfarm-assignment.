const RateCard = ({ currency, value, symbol, lastUpdated }) => {
  const formattedValue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">BTC/{currency.toUpperCase()}</h3>
        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Live</div>
      </div>
      <p className="text-3xl font-bold text-gray-800">
        {symbol} {formattedValue}
      </p>
      <p className="text-sm text-gray-500 mt-2">Last updated: {lastUpdated}</p>
    </div>
  );
};

export default RateCard;
