import { ExerciseCard } from "../../features/exercise";
import { useCalendarStore } from "../../entities/calendarDay/slice/exerciseStore.ts";
import { CustomButton } from "../../shared/ui";
import style from "./ExerciseList.module.css";

export const ExerciseList = () => {
  const days = useCalendarStore((state) => state.days);
  const addExercise = useCalendarStore((state) => state.addExercise);
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const exerciseArray =
    days[selectedDate.toLocaleDateString()]?.exercises ?? [];

  const btnHandler = () => {
    addExercise();
  };

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
      <div className={style.addButton}>
        <CustomButton buttonHandler={btnHandler}>
          Добавить упражнение
        </CustomButton>
      </div>
    </div>
  );
};
