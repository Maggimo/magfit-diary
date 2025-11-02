import { useEffect } from "react";
import { AddExercise } from "../../features/addExercise";
import { ExerciseCard } from "../../features/exercise";
import { useCalendarStore } from "../../entities/calendarDay";
import style from "./ExerciseList.module.css";

export const ExerciseList = () => {
  const days = useCalendarStore((state) => state.days);
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const loadDaysFromLocalStorage = useCalendarStore(
    (state) => state.loadDaysFromLocalStorage,
  );
  const observableDate = useCalendarStore((state) => state.observableDate);
  const exerciseArray =
    days[selectedDate.format("DD-MM-YYYY")]?.exercises ?? [];

  useEffect(() => {
    loadDaysFromLocalStorage(observableDate);
  }, [observableDate]);

  return (
    <div className={style.menu}>
      <div
        className={
          exerciseArray.length !== 0 ? style.listWithShadow : style.list
        }
      >
        {exerciseArray.map((ex) => (
          <ExerciseCard key={ex.id} exercise={ex} />
        ))}
      </div>
      <div className={style.footer}>
        <div>
          <AddExercise />
        </div>
      </div>
    </div>
  );
};
