import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import type { PanInfo } from "motion";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../components/ui/command.tsx";
import { Pencil } from "lucide-react";
import { useCalendarStore } from "../../../entities/calendarDay";
import { allExercises } from "../../../shared/utilities";
import { ExerciseBody } from "./ExerciseBody.tsx";
import style from "./ExerciseCard.module.css";
import type { Exercise } from "../../../entities/exercise";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button.tsx";

export type ExerciseOption = { group: string; name: string };

interface ExerciseCardProps {
  exercise: Exercise;
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const setExerciseName = useCalendarStore((store) => store.setExerciseName);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const deleteExercise = useCalendarStore((store) => store.deleteExercise);

  const cardDragHandler = (info: PanInfo) => {
    if (info.offset.x < -180) {
      deleteExercise(exercise);
    }
  };

  const inputChangeHandler = (name: string) => {
    setExerciseName(
      {
        name,
        group: allExercises.find((group) => group.exercises.includes(name))!
          .group,
      },
      exercise,
    );
    setPopupVisibility(false);
  };

  return (
    <div className={"w-screen"}>
      <motion.div
        drag="x"
        onDragEnd={(_, info) => cardDragHandler(info)}
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
        dragElastic={0.3}
        className={"w-[calc(100vw+50px)] flex justify-start gap-10"}
      >
        <div className={style.card}>
          <div
            onClick={() => {
              setIsEditable((p) => !p);
            }}
            className={style.cardHead}
          >
            <div className={style.info}>
              <div className={style.icon}>
                <img
                  className={style.img}
                  src={`/muscles-category/${exercise.category.toLowerCase()}.png`}
                  alt="Icon"
                />
              </div>
              <div
                onClick={(e) => {
                  if (isEditable) {
                    e.stopPropagation();
                  }
                }}
                className={style.exerciseName}
              >
                <Popover
                  open={popupVisibility}
                  onOpenChange={setPopupVisibility}
                >
                  <PopoverTrigger asChild>
                    <Button
                      disabled={!isEditable}
                      variant="ghost"
                      role="combobox"
                      aria-expanded={popupVisibility}
                      className=" w-[150px] sm:w-[200px] justify-between text-md"
                    >
                      {exercise.name || "Выберите упражнение"}
                      {isEditable && <Pencil className="opacity-50" />}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className=" p-0">
                    <Command className={""}>
                      <CommandInput placeholder="Поиск упражнения" />
                      <CommandList>
                        <CommandEmpty>Упражнение не найдено</CommandEmpty>
                        {allExercises.map((element) => {
                          return (
                            <CommandGroup
                              heading={element.group}
                              key={element.group}
                            >
                              {element.exercises.map((exerciseName) => (
                                <CommandItem
                                  onSelect={inputChangeHandler}
                                  key={exerciseName}
                                >
                                  {exerciseName}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          );
                        })}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>{isEditable ? <ExpandLess /> : <ExpandMore />}</div>
          </div>
          {isEditable && <ExerciseBody exercise={exercise} />}
        </div>
        <div className={"flex justify-center items-center"}>
          <DeleteIcon color="error" />
        </div>
      </motion.div>
    </div>
  );
};
