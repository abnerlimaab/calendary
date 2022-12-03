import { useEffect, useState } from "react";
import { createYearObject } from "./functions";
import Month from "./components/Month";

import { IYearObject } from "./interfaces";

function App() {
  const [year, setYear] = useState(0);

  const [years, setYears] = useState([] as IYearObject[]);

  const [month, setMonth] = useState(0);

  const changeMonth = (newMonth: number) => {
    switch (newMonth) {
      case -1: {
        setMonth(11);

        setYear(year - 1);

        break;
      }
      case 1: {
        setMonth(newMonth);

        const yearsAux = [...years];
        yearsAux[year - 1] = createYearObject(year - 1);
        setYears(yearsAux);

        break;
      }
      case 10: {
        setMonth(newMonth);

        const yearsAux = [...years];
        yearsAux[year + 1] = createYearObject(year + 1);
        setYears(yearsAux);

        break;
      }
      case 12: {
        setMonth(0);

        setYear(year + 1);

        break;
      }
      default: {
        setMonth(newMonth);

        break;
      }
    }
  };

  const onClickPrev = (month: number, year: number) => changeMonth(month - 1);

  const onClickNext = (month: number, year: number) => changeMonth(month + 1);

  const getWeeks = (month: number) =>
    years[year]?.weeks?.filter((week) =>
      week.some((day) => day.month === month)
    );

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    setYear(year);
    setMonth(month);

    const yearsAux = [] as IYearObject[];

    if (month === 0) {
      yearsAux[year - 1] = createYearObject(year - 1);
    }

    if (month === 11) {
      yearsAux[year + 1] = createYearObject(year + 1);
    }

    yearsAux[year] = createYearObject(year);

    setYears(yearsAux);
  }, []);

  return years.length && years[year] ? (
    <Month
      weeks={getWeeks(month)}
      month={month}
      onClickPrev={onClickPrev}
      onClickNext={onClickNext}
    />
  ) : (
    <></>
  );
}

export default App;
