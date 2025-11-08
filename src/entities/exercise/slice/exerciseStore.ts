import dayjs from "dayjs";
import "dayjs/locale/ru";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ExerciseCategory, TrainingPreset } from "../../exercise";
import { allExercises, trainingPreset } from "@/shared/utilities";

dayjs.locale("ru");

interface ExerciseStore {
  exercises: ExerciseCategory[];
  trainingPreset: TrainingPreset[];
  createExercise: (newExercise: { name: string; category: string }) => void;
  createTrainingPreset: (newTrainingPreset: TrainingPreset) => void;
}

export const useExerciseStore = create<ExerciseStore>()(
  persist(
    (set) => ({
      exercises: allExercises,
      trainingPreset: trainingPreset,
      createExercise: (newExercise) =>
        set((state) => {
          const newExerciseArray = state.exercises.map((exerciseGroup) =>
            exerciseGroup.category === newExercise.category
              ? {
                  ...exerciseGroup,
                  exercises: [...exerciseGroup.exercises, newExercise.name],
                }
              : exerciseGroup,
          );
          return { exercises: newExerciseArray };
        }),
      createTrainingPreset: (newTrainingPreset) =>
        set((state) => {
          return {
            trainingPreset: [...state.trainingPreset, newTrainingPreset],
          };
        }),
    }),
    { name: "exercise-store" },
  ),
);
