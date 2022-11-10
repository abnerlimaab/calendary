export interface IDayObject {
  day: number;
  month: number;
  year: number;
  weekDay: number;
}

export interface IWeek extends Array<IDayObject> {}

export interface IWeeks extends Array<IWeek> {}

export interface IMonthObject {
  month: number;
  year: number;
  days: IDayObject[];
}

export interface IYearObject {
  year: number;
  months: IMonthObject[];
  weeks: IWeeks;
}
