import { Header } from "../Header/header";
import { memo, useContext, useState } from "react";
import { ApiClientContext } from "../../App";
import { useGetRequests } from "../ApiClient";
import { PerSol, WeatherCard, WeatherObject } from "../schema";
import "./weather.scss";

export function WeatherPage() {
  const [sortBy, setSortBy] = useState<string>("temperature");
  return (
    <div className={"weather_wrapper"}>
      <Header text={"Mars Weather"} />
      <label>
        Sort by:
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="temperature">Temperature</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </label>
      <WeatherList sortBy={sortBy} />
    </div>
  );
}

const WeatherList = memo(({ sortBy }: { sortBy: string }) => {
  const apiClient = useContext(ApiClientContext);
  const weather = useGetRequests<WeatherObject, undefined>(
    apiClient.getWeather,
    undefined
  );
  if (weather.state === "resolved") {
    const solKeys = weather.value.sol_keys;
    const cardArr = Object.entries(weather.value).reduce<WeatherCard[]>(
      (acc, item) => {
        const [key, value] = item;
        if (solKeys.includes(key)) {
          const sol: PerSol = value;
          acc.push({
            dataPoint: +key,
            temperature: sol.AT.av,
            wind: sol.WD.most_common?.ct,
            pressure: sol.PRE.av,
            firstUTC: sol.First_UTC,
            lastUTC: sol.Last_UTC,
            currentPage: 0,
            nextPage: true,
          });
        }
        return acc;
      },
      []
    );

    return (
      <div>
        <ul className={"weather_grid"}>
          {cardArr.map((weatherCard) => (
            <li key={weatherCard.dataPoint}>
              <p>{`Data Point: ${weatherCard.dataPoint}`}</p>
              <p>{`First UTC: ${weatherCard.firstUTC}`}</p>
              <p>{`Last UTC: ${weatherCard.lastUTC}`}</p>
              <p>{`Pressure: ${weatherCard.pressure}`}</p>
              <p>{`Temperature: ${weatherCard.temperature}`}</p>
              <p>{`Wind: ${weatherCard.wind}`}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
});
