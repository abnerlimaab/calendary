import { IDayObject, IMonthObject, IWeeks, IYearObject } from "./interfaces";

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

const getExtraDaysOnWeekAtStartOfYear = (firstDay: IDayObject) =>
  createMonthObject(firstDay.year - 1)(11).days.slice(-firstDay.weekDay);

const getExtraDaysOnWeekAtEndOfYear = (lastDay: IDayObject) =>
  createMonthObject(lastDay.year + 1)(0).days.slice(0, 6 - lastDay.weekDay);

const getWeeksOfYear = (months: IMonthObject[]): IWeeks => {
  const days = months.flatMap((month) => month.days);

  if (days[0].weekDay !== 0) {
    days.unshift(...getExtraDaysOnWeekAtStartOfYear(days[0]));
  }

  if (days[days.length - 1].weekDay !== 6) {
    days.push(...getExtraDaysOnWeekAtEndOfYear(days[days.length - 1]));
  }

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

export const createCalendarObject = (yearStart: number, yearEnd?: number) => {
  const years: IYearObject[] = [];

  for (let i = yearStart; i <= (yearEnd || yearStart); i++) {
    years[i] = createYearObject(i);
  }

  return years;
};
