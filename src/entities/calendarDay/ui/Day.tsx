import CircleIcon from "@mui/icons-material/Circle";
import dayjs, { Dayjs } from "dayjs";
import { firstLetterToUpperCase } from "../../../shared/ui/stringFormat/functions.ts";
import { cn } from "../../../shared/utilities";
import styles from "./Day.module.css";

// import {} from "@/";

interface DayProps {
  hasExercises: (date: Dayjs) => boolean;
  value: Dayjs;
  selectedDate: Dayjs;
  onClickDate: (date: Dayjs) => void;
  dayName: string | undefined;
  observableDate: Dayjs;
}

export const Day = ({
  selectedDate,
  value,
  hasExercises,
  onClickDate,
  dayName,
  observableDate,
}: DayProps) => {
  const hasExercisesFlag = hasExercises(value);
  const key = value.format("DD-MM-YYYY");
  const todayFlag = dayjs().isSame(value, "day");
  const sameMonthFlag = observableDate.isSame(value, "month");
  const selectedFlag = dayjs(selectedDate).isSame(value, "day");
  return (
    <div className={styles.day} key={key} onClick={() => onClickDate(value)}>
      <div className={styles.dayName}>
        {dayName ? firstLetterToUpperCase(dayName) : ""}
      </div>
      <div
        className={cn(
          selectedFlag && !todayFlag && styles.selectedDay,
          todayFlag && styles.today,
          !sameMonthFlag && styles.anotherMonth,
          styles.dayNumber,
        )}
        aria-disabled={!sameMonthFlag}
      >
        {value.format("D")}
      </div>
      {hasExercisesFlag && (
        <CircleIcon sx={{ fontSize: "10px", paddingTop: "5px" }} />
      )}
    </div>
  );
};
