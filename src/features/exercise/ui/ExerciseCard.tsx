import type { PanInfo } from "motion";
import { AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useCalendarStore } from "@/entities/calendarDay";
import { type Exercise, useExerciseStore } from "@/entities/exercise";
import * as motion from "motion/react-client";
import { ExerciseBody } from "./ExerciseBody";
import { ExerciseNameSelector } from "./ExerciseNameSelector";
import style from "./ExerciseCard.module.css";

interface ExerciseCardProps {
  exercise: Exercise;
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const setExerciseName = useCalendarStore((store) => store.setExerciseName);
  const deleteExercise = useCalendarStore((store) => store.deleteExercise);
  const allExercises = useExerciseStore((store) => store.exercises);

  // 🧠 1. Проверяем, был ли уже показан hint
  useEffect(() => {
    const hintShown = localStorage.getItem("exerciseSwipeHintShown");
    if (!hintShown) {
      setShowHint(true);
      // Сохраняем флаг, чтобы больше не показывать
      localStorage.setItem("exerciseSwipeHintShown", "true");
    }
  }, []);

  // 🧩 2. Функция удаления
  const cardDragHandler = (info: PanInfo) => {
    if (info.offset.x < -180) {
      deleteExercise(exercise);
    }
  };

  // ⚙️ 3. Обработка изменения названия упражнения
  const inputChangeHandler = (name: string) => {
    const category = allExercises.find((group) =>
      group.exercises.includes(name),
    )?.category;
    if (category) {
      setExerciseName({ name, group: category }, exercise);
      setPopupVisibility(false);
    }
  };

  return (
    <div className="w-screen overflow-hidden">
      <motion.div
        drag="x"
        onDragEnd={(_, info) => cardDragHandler(info)}
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
        dragElastic={0.3}
        className="w-[calc(100dvw+50px)] flex justify-start gap-10"
        // 🎬 4. Подсказка: первый раз карточка “уезжает” влево и возвращается
        initial={showHint ? { x: 0 } : false}
        animate={showHint ? { x: [-0, -80, 0] } : { x: 0 }}
        transition={showHint ? { duration: 1.2, ease: "easeInOut" } : undefined}
      >
        <div className={style.card}>
          <div
            onClick={() => setIsEditable((p) => !p)}
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
                <ExerciseNameSelector
                  allExercises={allExercises}
                  exerciseName={exercise.name}
                  isEditable={isEditable}
                  open={popupVisibility}
                  onOpenChange={setPopupVisibility}
                  onSelect={inputChangeHandler}
                />
              </div>
            </div>
            <div>{isEditable ? <ChevronUp /> : <ChevronDown />}</div>
          </div>
          <AnimatePresence>
            {isEditable && (
              <motion.div
                key="body"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <ExerciseBody exercise={exercise} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex justify-center items-center">
          <Trash2 className="text-red-500" />
        </div>
      </motion.div>
    </div>
  );
};
