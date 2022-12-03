import { IDayObject, IMonthObject, IWeeks } from "./interfaces";

const createDayObject = (year: number): Function => {
  const date = new Date(year, 0, 1);

  return (month: number): Function => {
    date.setMonth(month);

    return (day: number): IDayObject => {
      date.setDate(day);

      return {
        day,
        month,
        year,
        weekDay: date.getDay(),
      };
    };
  };
};

const getWeeksOfYear = (months: IMonthObject[]): IWeeks => {
  const days = months.flatMap((month) => month.days);

  return days.reduce((weeks: IWeeks, day: IDayObject) => {
    if (day.weekDay === 0 || weeks.length === 0) {
      weeks.push([day]);
    } else if (weeks.length > 0) {
      weeks[weeks.length - 1].push(day);
    }

    return weeks;
  }, []);
};

export const createMonthObject = (year: number) => {
  const date = new Date(year, 0, 1);

  const getMonths = createDayObject(year);

  return (month: number): IMonthObject => {
    date.setMonth(month + 1);
    date.setDate(0);

    const getDays = getMonths(month);

    return {
      month,
      year,
      days: new Array(date.getDate()).fill(0).map((_, i) => getDays(i + 1)),
    };
  };
};

const weekMonthFilter = (month: Number) => (week: IDayObject[]) =>
  week.some((day: IDayObject) => day.month === month);

export const createYearObject = (year: number) => {
  const months = new Array(12)
    .fill(0)
    .map((_, i) => createMonthObject(year)(i));

  const weeks = getWeeksOfYear(months);

  const weeksOnMonths: IWeeks[] | any = {} as IWeeks[];
  for (let i = 0; i < 12; i++) {
    weeksOnMonths[i] = weeks.filter(weekMonthFilter(i));
  }

  return {
    year,
    months,
    weeks,
    weeksOnMonths,
  };
};

export const createCalendarObject = (yearStart: number, yearEnd?: number) => ({
  years: new Array(yearEnd ? yearEnd - yearStart + 1 : 1)
    .fill(0)
    .map((_, i) => createYearObject(i + yearStart)),
});
