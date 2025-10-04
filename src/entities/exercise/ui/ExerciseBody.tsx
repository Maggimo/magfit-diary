import { styled, TextField, type TextFieldProps } from "@mui/material";
import { useCalendarStore } from "../../calendarDay/slice/exerciseStore.ts";
import type { Exercise, ExerciseSet } from "../model/types.ts";
import style from "./ExerciseCard.module.css";

interface ExerciseBodyProps {
  exercise: Exercise;
}

const ExerciseInput = styled((props: TextFieldProps) => (
  <TextField {...props} />
))(({}) => ({
  "& .MuiInputBase-input": {
    fontFamily: "'Roboto Condensed', sans-serif",
    fontSize: "2rem",
    textAlign: "center",
    color: "white",
  },
}));

export const ExerciseBody = ({ exercise }: ExerciseBodyProps) => {
  const onChangeHandler = useCalendarStore((store) => store.setExerciseValues);

  return (
    <div className={style.sets}>
      {exercise.sets.map((set, idx) => {
        return (
          <div className={style.row} key={set.id}>
            <div className={style.setIndex}>{idx + 1}</div>

            <div className={style.cell}>
              <ExerciseInput
                id={"reps"}
                variant="standard"
                value={set.reps}
                onChange={(e) =>
                  onChangeHandler(
                    e.target.value,
                    e.target.id as keyof ExerciseSet,
                    set.id,
                    exercise,
                  )
                }
              />
            </div>
            <div className={style.cell}>
              <ExerciseInput
                variant="standard"
                id={"weight"}
                value={set.weight}
                onChange={(e) =>
                  onChangeHandler(
                    e.target.value,
                    e.target.id as keyof ExerciseSet,
                    set.id,
                    exercise,
                  )
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
