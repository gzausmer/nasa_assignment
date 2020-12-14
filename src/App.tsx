import React, { createContext, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { About } from "./components/AboutPage/about";
import { DatePage } from "./components/DatePage/datePage";
import { WeatherPage } from "./components/WeatherPage/weather";
import { ApiClient } from "./components/ApiClient";

export const ApiClientContext = createContext(new ApiClient());

function App() {
  const apiClient = useMemo(() => new ApiClient(), []);

  return (
    <div className="App">
      <ApiClientContext.Provider value={apiClient}>
        <Router>
          <Switch>
            <Route exact path="/">
              <About />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/date">
              <DatePage />
            </Route>
            <Route path="/weather">
              <WeatherPage />
            </Route>
          </Switch>
        </Router>
      </ApiClientContext.Provider>
      <div className={"bg_image"} />
    </div>
  );
}

export default App;
