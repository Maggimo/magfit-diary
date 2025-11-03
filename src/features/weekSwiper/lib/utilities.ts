import dayjs from "dayjs";
import type { Week } from "../../../widgets/weekCalendar/model/weekType.ts";

export const generateWeek = (start: dayjs.Dayjs): Week => {
  const days = Array.from({ length: 7 }, (_, i) => start.add(i, "day"));
  return { start, days };
};
