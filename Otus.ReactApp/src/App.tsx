import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);

  useEffect(() => {
    // fetch("/weatherforecast")
    fetch("http://localhost:5000/weatherforecast")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setForecasts(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isLoaded) {
    return <p><em>Loading...</em></p>;
  }

  return (
    <div>
      <h1 id="tabelLabel">Weather forecast</h1>

      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
        <tr>
          <th>Date</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
        </thead>
        <tbody>
        {forecasts.map(forecast =>
          <tr key={forecast.date}>
            <td>{forecast.date}</td>
            <td>{forecast.temperatureC}</td>
            <td>{forecast.temperatureF}</td>
            <td>{forecast.summary}</td>
          </tr>,
        )}
        </tbody>
      </table>
    </div>
  );
};

export default App;


export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
