import { useMemo } from "react";
import { createCalendarObject } from "./functions";
import { ICalendar } from "./interfaces";

function App() {
  const years: ICalendar = useMemo(() => createCalendarObject(2022), []);

  console.log(years.years[0]);
  return <></>;
}

export default App;
