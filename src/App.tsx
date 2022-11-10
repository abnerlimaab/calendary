import { useMemo } from "react";
import { createCalendarObject } from "./functions";

function App() {
  const year = useMemo(() => createCalendarObject(2022), []);

  console.log(year);
  return <></>;
}

export default App;
