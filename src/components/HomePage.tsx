import { useState } from "react";

const HomePage = () => {
  const [symbol, setSymbol] = useState("");
  const [interval, setInterval] = useState("");
  const [period, setPeriod] = useState("");
  console.log(interval, period, symbol);
  const handleDownload = () => {
    fetch(
      `http://127.0.0.1:5000/api/v1/indicator?interval=${interval}&symbol=${symbol}&period=${period}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error("Network response was not ok.");
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(
          new Blob([blob], { type: "text/csv" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "all-user-data.csv");
        document.body.appendChild(link);
        link.click();
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      })
      .catch((error) => {
        console.error("There was an error with the fetch operation:", error);
      });
  };
  // console.log(interval);
  const intraDayIntervals = ["1m", "2m", "5m", "15m", "30m", "60m", "90m"];

  const intervalHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterval(e.target.value);
  };
  return (
    <>
      <div className="MainContainer w-full">
        <div className="InnerContainer border-2 w-fit mt-10 m-auto p-5 rounded-md shadow-lg">
          <div className="InputContainer flex gap-2 items-center">
            <label htmlFor="username">Symbol :</label>
            <input
              className="outline-1 bg-gray-200 rounded-lg p-2"
              type="text"
              name="symbol"
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>
          {/* ------- */}
          <div className="Dropdowns mt-4">
            <div className="flex gap-4">
              {/* -INTERVAL */}
              <select
                name="interval"
                id="interval"
                className="p-2 border rounded-md bg-gray-200"
                onChange={intervalHandler}
                defaultValue={""}
              >
                <option value="" disabled>
                  Select an interval
                </option>
                <option value="1m">1 minutes</option>
                <option value="2m">2 minutes</option>
                <option value="5m">5 minutes</option>
                <option value="15m">15 minutes</option>
                <option value="30m">30 minutes</option>
                <option value="60m">60 minutes</option>
                <option value="90m">90 minutes</option>
                <option value="1d">1 day</option>
                <option value="5d">5 day</option>
                <option value="1wk">1 week</option>
                <option value="1mo">1 month</option>
                <option value="3mo">3 months</option>
              </select>
              <select
                name="timeframe"
                id="timeframe"
                className="p-2 border rounded-md bg-gray-200"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setPeriod(e.target.value)
                }
                defaultValue={""}
              >
                <option value="" disabled>
                  Select an period
                </option>
                <option
                  disabled={
                    interval === "1d" ||
                    interval == "5d" ||
                    interval == "1wk" ||
                    interval == "1mo" ||
                    interval == "3mo"
                  }
                  value="1d"
                >
                  1 day of data
                </option>
                <option
                  value="5d"
                  disabled={
                    interval == "5d" ||
                    interval == "1wk" ||
                    interval == "1mo" ||
                    interval == "3mo"
                  }
                >
                  Last 5 days of data
                </option>
                <option
                  disabled={interval == "1mo" || interval == "3mo"}
                  value="1mo"
                >
                  Last 1 month of data
                </option>

                <option
                  disabled={
                    interval == "3mo" || intraDayIntervals.includes(interval)
                  }
                  value="3mo"
                >
                  Last 3 months of data
                </option>
                <option
                  value="6mo"
                  disabled={intraDayIntervals.includes(interval)}
                >
                  Last 6 months of data
                </option>
                <option
                  value="1y"
                  disabled={intraDayIntervals.includes(interval)}
                >
                  Last 1 year of data
                </option>
                <option
                  value="2y"
                  disabled={intraDayIntervals.includes(interval)}
                >
                  Last 2 years of data
                </option>
                <option
                  value="5y"
                  disabled={intraDayIntervals.includes(interval)}
                >
                  Last 5 years of data
                </option>
                <option
                  value="10y"
                  disabled={intraDayIntervals.includes(interval)}
                >
                  Last 10 years of data
                </option>
                <option
                  value="ytd"
                  disabled={intraDayIntervals.includes(interval)}
                >
                  Data since the start of the current year
                </option>
                <option
                  value="max"
                  disabled={intraDayIntervals.includes(interval)}
                >
                  Maximum available data
                </option>
              </select>
            </div>
            <button
              className="mt-8 bg-blue-500 py-2 px-6 rounded-lg text-white"
              type="button" // Use "submit" type for form submission
              onClick={handleDownload}
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
