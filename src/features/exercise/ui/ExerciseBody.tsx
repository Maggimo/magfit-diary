import { styled, TextField, type TextFieldProps } from "@mui/material";
import { useCalendarStore } from "../../../entities/calendarDay/slice/exerciseStore.ts";
import type {
  Exercise,
  ExerciseSet,
} from "../../../entities/exercise/model/types.ts";
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
                  if (e.target.value.length <= 3) {
                    onChangeHandler(
                      e.target.value,
                      e.target.id as keyof ExerciseSet,
                      set.id,
                      exercise,
                    );
                  }
                }}
              />
            </div>
            <div className={style.cell}>
              <ExerciseInput
                id={"weight"}
                value={set.weight === 0 ? "" : set.weight}
                onChange={(e) => {
                  if (e.target.value.length <= 3) {
                    onChangeHandler(
                      e.target.value,
                      e.target.id as keyof ExerciseSet,
                      set.id,
                      exercise,
                    );
                  }
                }}
              />
            </div>
          </div>
        );
      })}
      <div className={style.row}>
        <CustomButton buttonHandler={() => addSetToExercise(exercise)}>
          Добавить подход
        </CustomButton>
      </div>
    </div>
  );
};
