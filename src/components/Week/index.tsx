import { IWeek } from "../../interfaces";

interface WeekProps {
  week: IWeek;
  month: number;
}

const Week: React.FC<WeekProps> = ({ week, month }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr",
        gridTemplateColumns: "repeat(7, 1fr)",
        gridColumn: "span 7",
      }}
    >
      {week.map(({ day, month: monthDay, year, weekDay }) => (
        <button
          key={`${day}-${monthDay}-${year}`}
          style={{
            gridColumn: weekDay + 1,
            opacity: month === monthDay ? 1 : 0.5,
          }}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default Week;
