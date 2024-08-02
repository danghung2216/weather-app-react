import { Fragment, useState } from "react";

import "./App.css";
import WeatherApp from "./Page/WeatherApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Fragment>
      <WeatherApp />
    </Fragment>
  );
}

export default App;
