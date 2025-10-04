import Button from "@mui/material/Button";
import { ExerciseCard } from "../../entities";
import { useCalendarStore } from "../../entities/calendarDay/slice/exerciseStore.ts";
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
      <Button
        onClick={() => btnHandler()}
        sx={{
          color: "black",
          borderColor: "black",
          fontFamily: "'Roboto Condensed', sans-serif",
          position: "absolute",
          bottom: "20px",
        }}
        variant="outlined"
        size="large"
      >
        Добавить упражнение
      </Button>
    </div>
  );
};
