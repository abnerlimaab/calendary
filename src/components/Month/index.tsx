import { IWeek } from "../../interfaces";
import Week from "../Week";

import config from "../../configs";

interface MonthProps {
  weeks: IWeek[];
  month: number;
  onClickPrev: (month: number, year: number) => void;
  onClickNext: (month: number, year: number) => void;
}

const Month: React.FC<MonthProps> = ({
  month,
  weeks,
  onClickPrev,
  onClickNext,
}) => {
  const { year } = weeks[0].find((day) => day.month === month) ?? { year: 0 };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "repeat(6, 1fr)",
        gridTemplateColumns: "repeat(7, 1fr)",
      }}
    >
      <button
        style={{ gridColumn: 1 }}
        onClick={() => onClickPrev(month, year)}
      >
        {"<"}
      </button>

      <button style={{ gridColumn: "span 5" }}>
        {config.monthNames[month]} - {year}
      </button>

      <button
        style={{ gridColumn: 7 }}
        onClick={() => onClickNext(month, year)}
      >
        {">"}
      </button>

      {weeks.map((week, index) => (
        <Week
          key={`week-${index}-${Math.random()}`}
          week={week}
          month={month}
        />
      ))}
    </div>
  );
};

export default Month;
