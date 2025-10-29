import { type Dispatch, type SetStateAction, useEffect } from "react";
import { ExerciseCard } from "../../features/exercise";
import { useCalendarStore } from "../../entities/calendarDay";
import { CustomButton } from "../../shared/ui";
import style from "./ExerciseList.module.css";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import { Button } from "@mui/material";

interface ExerciseListProps {
  setDrawerVisibility: Dispatch<SetStateAction<boolean>>;
}

export const ExerciseList = ({ setDrawerVisibility }: ExerciseListProps) => {
  const days = useCalendarStore((state) => state.days);
  const addExercise = useCalendarStore((state) => state.addExercise);
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const loadDaysFromLocalStorage = useCalendarStore(
    (state) => state.loadDaysFromLocalStorage,
  );
  const observableDate = useCalendarStore((state) => state.observableDate);
  const exerciseArray =
    days[selectedDate.format("DD-MM-YYYY")]?.exercises ?? [];

  const btnHandler = () => {
    addExercise();
  };

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
        <Button
          color="inherit"
          onClick={() => setDrawerVisibility((prev) => !prev)}
        >
          <ViewHeadlineIcon />
        </Button>
        <div className={style.addButton}>
          <CustomButton buttonHandler={btnHandler}>
            Добавить упражнение
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
