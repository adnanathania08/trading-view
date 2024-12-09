const HomePage = () => {
  return (
    <>
      <div className="MainContainer w-full">
        <div className="InnerContainer border-2 w-fit mt-10 m-auto p-5 rounded-md shadow-lg">
          <div className="InputContainer flex gap-2 items-center">
            <label htmlFor="username">Symbol :</label>
            <input
              className=" outline-1 bg-gray-200 rounded-lg p-2"
              type="text"
              name="symbol"
              id="symbol"
            />
          </div>
          {/* ------- */}
          <div className="Dropdowns mt-4">
            <form action="" className="flex gap-4">
              {/* -INTERVAL */}
              <select
                name="interval"
                id="interval"
                className="p-2 border rounded-md bg-gray-200"
              >
                <option value="1m">1-minute</option>
                <option value="2m">2-minute</option>
                <option value="5m">5-minute</option>
                <option value="15m">15-minute</option>
                <option value="30m">30-minute</option>
              </select>
              {/* --d2 */}
              <select
                name="timeframe"
                id="timeframe"
                className="p-2 border rounded-md bg-gray-200"
              >
                <option value="1d">1 day of data</option>
                <option value="5d">Last 5 days of data</option>
                <option value="1mo">Last 1 month of data</option>
                <option value="3mo">Last 3 months of data</option>
                <option value="6mo">Last 6 months of data</option>
                <option value="1y">Last 1 year of data</option>
                <option value="2y">Last 2 years of data</option>
                <option value="5y">Last 5 years of data</option>
                <option value="10y">Last 10 years of data</option>
                <option value="ytd">
                  Data since the start of the current year
                </option>
                <option value="max">Maximum available data</option>
              </select>
            </form>
            <button
              className="mt-8 bg-blue-500 py-2 px-6 rounded-lg text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
          {/* ------- */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
