export interface IDayObject {
  day: number;
  month: number;
  year: number;
  weekDay: number;
}

export interface IWeek extends Array<IDayObject> {}

export interface IWeeks extends Array<IWeek> {}

export interface IWeeksOnMonths {
  0: IWeeks;
  1: IWeeks;
  2: IWeeks;
  3: IWeeks;
  4: IWeeks;
  5: IWeeks;
  6: IWeeks;
  7: IWeeks;
  8: IWeeks;
  9: IWeeks;
  10: IWeeks;
  11: IWeeks;
}

export interface IMonthObject {
  month: number;
  year: number;
  days: IDayObject[];
}

export interface IYearObject {
  year: number;
  months: IMonthObject[];
  weeks: IWeeks;
  weeksOnMonths: IWeeksOnMonths;
}

export interface ICalendar {
  years: IYearObject[];
}
