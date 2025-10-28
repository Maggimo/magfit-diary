import CircleIcon from "@mui/icons-material/Circle";
import dayjs, { Dayjs } from "dayjs";
import { firstLetterToUpperCase } from "../../../shared/ui/stringFormat/functions.ts";
import styles from "./Day.module.css";

interface DayProps {
  hasExercises: (date: Dayjs) => boolean;
  value: Dayjs;
  selectedDate: Dayjs;
  onClickDate: (date: Dayjs) => void;
}

export const Day = ({
  selectedDate,
  value,
  hasExercises,
  onClickDate,
}: DayProps) => {
  const hasExercisesFlag = hasExercises(value);
  const key = value.format("DD-MM-YYYY");
  const todayFlag = dayjs().isSame(value, "day");
  const selectedFlag = dayjs(selectedDate).isSame(value, "day");

  return (
    <div className={styles.day} key={key} onClick={() => onClickDate(value)}>
      <div className={styles.dayName}>
        {firstLetterToUpperCase(value.format("dd"))}
      </div>
      <div
        className={
          todayFlag
            ? styles.today
            : selectedFlag
              ? styles.selectedDay
              : styles.dayNumber
        }
      >
        {value.format("D")}
      </div>
      {hasExercisesFlag && (
        <CircleIcon sx={{ fontSize: "10px", paddingTop: "5px" }} />
      )}
    </div>
  );
};
