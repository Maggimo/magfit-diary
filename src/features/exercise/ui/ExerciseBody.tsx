import {
  IconButton,
  styled,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import type { ChangeEvent } from "react";
import { useCalendarStore } from "../../../entities/calendarDay";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import type { Exercise, ExerciseSet } from "../../../entities/exercise";
import style from "./ExerciseCard.module.css";
import { CustomButton } from "../../../shared/ui";

interface ExerciseBodyProps {
  exercise: Exercise;
}

const ExerciseInput = styled((props: TextFieldProps) => (
  <TextField
    autoComplete="off"
    variant="standard"
    type="number"
    placeholder={"0"}
    {...props}
  />
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
  const addSetToExercise = useCalendarStore((store) => store.addSetToExercise);
  const deleteExercise = useCalendarStore((store) => store.deleteExercise);
  const deleteSet = useCalendarStore((store) => store.deleteSet);

  const inputHandler = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    set: ExerciseSet,
  ) => {
    if (event.target.value.length <= 3) {
      onChangeHandler(
        event.target.value,
        event.target.id as keyof ExerciseSet,
        set.id,
        exercise,
      );
    }
  };
  return (
    <div className={style.sets}>
      {exercise.sets.map((set, idx) => {
        return (
          <div className={style.row} key={set.id}>
            <div className={style.setIndex}>{idx + 1}</div>
            <div className={style.cell}>
              <ExerciseInput
                id={"reps"}
                value={set.reps === 0 ? "" : set.reps}
                onChange={(e) => {
                  inputHandler(e, set);
                }}
              />
            </div>
            <div className={style.cell}>
              <ExerciseInput
                id={"weight"}
                value={set.weight === 0 ? "" : set.weight}
                onChange={(e) => {
                  inputHandler(e, set);
                }}
              />
            </div>
            <div>
              <IconButton onClick={() => deleteSet(exercise, set)}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        );
      })}
      <div className={style.row}>
        <CustomButton buttonHandler={() => addSetToExercise(exercise)}>
          Добавить подход
        </CustomButton>
        <IconButton onClick={() => deleteExercise(exercise)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
