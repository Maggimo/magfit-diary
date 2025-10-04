import { useCalendarStore } from "../../entities/calendarDay/slice/exerciseStore.ts";
import { daysOfWeek, months } from "../../shared/utilities";
import styles from "./Calendar.module.css";
import { useMemo, useState } from "react";
import * as motion from "motion/react-client";

const startOfWeek = (date: Date, weekStartsOn = 1) => {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay();
  const diff = (day === 0 ? 7 : day) - weekStartsOn;
  d.setDate(d.getDate() - diff);
  return d;
};
const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const Calendar = () => {
  const [weekState, setWeekState] = useState(0);
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);

  const today = new Date();

  const weekStart = useMemo(() => {
    const base = addDays(today, weekState * 7);
    return startOfWeek(base, 1);
  }, [today, weekState]);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  const monthTitle = useMemo(() => {
    const first = weekDays[0].getMonth();
    const last = weekDays[6].getMonth();
    return first === last
      ? months[first]
      : `${months[first]} / ${months[last]}`;
  }, [weekDays]);

  const dragHandler = (offsetX: number) => {
    if (offsetX > 200) {
      setWeekState((p) => p - 1);
    } else if (offsetX < -200) setWeekState((p) => p + 1);
  };

  return (
    <div className={styles.calendar}>
      <div>
        <div className={styles.month}>
          {weekState === 0 ? months[today.getMonth()] : monthTitle}
        </div>

        <motion.div
          drag="x"
          dragDirectionLock
          onDragEnd={(_, info) => dragHandler(info.offset.x)}
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
          dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
          dragElastic={0.1}
          whileDrag={{ cursor: "grabbing" }}
          className={styles.days}
        >
          {weekDays.map((date) => {
            const key = date.toISOString().slice(0, 10);
            const todayFlag = isSameDay(date, today);
            const selectedFlag = isSameDay(date, selectedDate);

            return (
              <div
                className={styles.day}
                key={key}
                onClick={() => setSelectedDate(date)}
              >
                <div className={styles.dayName}>
                  {daysOfWeek[date.getDay() === 0 ? 6 : date.getDay() - 1]}
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
                  {date.getDate()}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
