import { useState } from "react";
import { TiInfo } from "react-icons/ti";

const HomePage = () => {
  const [symbol, setSymbol] = useState("");
  const [interval, setInterval] = useState("");
  const [period, setPeriod] = useState("");
  const submitHandler = () => {
    if (!symbol || !interval || !period) {
      return alert("All fields must be filled");
    }
    handleDownload();
  };
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
      .then(async (response) => {
        if (response.ok) {
          return response.blob();
        }
        const res = await response.json();
        if ("error" in res) {
          throw new Error("Something went wrong, " + res.error);
        } else {
          throw new Error("Network response was not ok.");
        }
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
        alert(error.message);
      });
  };
  // console.log(interval);
  const intraDayIntervals = ["1m", "2m", "5m", "15m", "30m", "60m", "90m"];

  const intraDayPeriods = [
    "3mo",
    "6mo",
    "9mo",
    "1y",
    "2y",
    "5y",
    "10y",
    "ytd",
    "max",
  ];
  const intervalHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterval(e.target.value);
  };
  return (
    <>
      
      <div className="MainContainer w-full font-inter font-normal px-4 sm:px-8">
        <div className="InnerContainer border-2 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 mt-10 mx-auto p-5 rounded-md shadow-lg">
          <div className="mt-2 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <TiInfo className="text-xl" />
            <p className="text-sm sm:text-base">
              Please refer to{" "}
              <a
                className="text-blue-800"
                href="https://finance.yahoo.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Yahoo finance site
              </a>{" "}
              for Symbol names
            </p>
          </div>
          <div className="InputContainer flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <label htmlFor="symbol" className="text-sm sm:text-base">
              Symbol :
            </label>
            <input
              className="outline-1 bg-gray-200 rounded-lg p-2 w-full sm:w-auto"
              type="text"
              name="symbol"
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>
          {/* Dropdowns */}
          <div className="Dropdowns mt-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Interval Dropdown */}
              <select
                name="interval"
                id="interval"
                className="p-2 border rounded-md bg-gray-200 w-full sm:w-auto"
                onChange={intervalHandler}
                defaultValue={""}
              >
                <option value="" disabled>
                  Select an interval
                </option>
                <option
                  value="1m"
                  disabled={
                    intraDayPeriods.includes(period) || period === "1mo"
                  }
                >
                  1 minute
                </option>
                {/* Other options here */}
              </select>
              {/* Period Dropdown */}
              <select
                name="timeframe"
                id="timeframe"
                className="p-2 border rounded-md bg-gray-200 w-full sm:w-auto"
                onChange={(e) => setPeriod(e.target.value)}
                defaultValue={""}
              >
                <option value="" disabled>
                  Select a period
                </option>
                <option value="1d" disabled={interval === "1d"}>
                  1 day of data
                </option>
                {/* Other options here */}
              </select>
            </div>
            <button
              className="mt-8 bg-blue-500 py-2 px-6 rounded-lg text-white w-full sm:w-auto"
              type="button"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
