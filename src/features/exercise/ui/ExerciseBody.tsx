import {
  IconButton,
  styled,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import type { ChangeEvent } from "react";
import { useCalendarStore } from "../../../entities/calendarDay";
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
  const deleteSet = useCalendarStore((store) => store.deleteSet);

  const inputHandler = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    set: ExerciseSet,
  ) => {
    if (event.target.value.length <= 3) {
      onChangeHandler(
        event.target.value,
        event.target.name as keyof ExerciseSet,
        set.id,
        exercise,
      );
    }
  };
  return (
    <div className={"w-[100dvw]"}>
      <AnimatePresence>
        {exercise.sets.map((set, idx) => {
          return (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className={style.row}>
                <div className={style.setIndex}>{idx + 1}</div>
                <div className={style.cell}>
                  {/*<InputNumber/>*/}
                  <ExerciseInput
                    name={"reps"}
                    value={set.reps}
                    onChange={(e) => {
                      inputHandler(e, set);
                    }}
                  />
                </div>
                <div className={style.cell}>
                  <ExerciseInput
                    name={"weight"}
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
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div className={style.cardFooter}>
        <div></div>
        <CustomButton buttonHandler={() => addSetToExercise(exercise)}>
          Добавить подход
        </CustomButton>
      </div>
    </div>
  );
};
