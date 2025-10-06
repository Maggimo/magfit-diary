import { create } from "zustand";
import type { Exercise, ExerciseSet } from "../../exercise/model/types.ts";
import type { ExerciseOption } from "../../../features/exercise/ui/ExerciseCard.tsx";
import type { CalendarDay } from "../model/types.ts";

interface CalendarStore {
  days: Record<string, CalendarDay>;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  addExercise: () => void;
  setExerciseName: (
    exerciseParams: ExerciseOption | null,
    exercise: Exercise,
  ) => void;
  setExerciseValues: (
    value: string,
    type: keyof ExerciseSet,
    id: string,
    exercise: Exercise,
  ) => void;
  addSetToExercise: (exercise: Exercise) => void;
}

export const useCalendarStore = create<CalendarStore>()((set) => ({
  days: {},
  selectedDate: new Date(),
  setSelectedDate: (date: Date) => set({ selectedDate: date }),
  addExercise: () =>
    set((state) => {
      const dateToKey = state.selectedDate.toLocaleDateString();
      const oldEx = state.days[dateToKey]?.exercises ?? [];
      return {
        days: {
          ...state.days,
          [dateToKey]: {
            ...state.days[dateToKey],
            exercises: [
              ...oldEx,
              {
                sets: [
                  {
                    weight: 0,
                    reps: 0,
                    id: crypto.randomUUID(),
                  },
                ],
                id: crypto.randomUUID(),
                category: "Другое",
                name: "Упражнение",
              },
            ],
          },
        },
      };
    }),
  setExerciseName: (exerciseParams, exercise) =>
    set((state) => {
      const exactDate = state.selectedDate.toLocaleDateString();
      const oldEx = state.days[exactDate]?.exercises ?? [];
      const newExercises = oldEx.map((ex) => {
        if (ex.id !== exercise.id) return ex;
        return {
          ...ex,
          name: exerciseParams!.name,
          category: exerciseParams!.group as string,
        };
      });

      return {
        days: {
          ...state.days,
          [exactDate]: {
            ...state.days[exactDate],
            exercises: newExercises,
          },
        },
      };
    }),

  setExerciseValues: (value, type, id, exercise) =>
    set((state) => {
      const exactDate = state.selectedDate.toLocaleDateString();
      const oldEx = state.days[exactDate]?.exercises ?? [];
      const newExercises = oldEx.map((ex) => {
        if (ex.id !== exercise.id) return ex;
        return {
          ...ex,
          sets: ex.sets.map((set) =>
            set.id === id ? { ...set, [type]: Number(value) } : set,
          ),
        };
      });

      return {
        days: {
          ...state.days,
          [exactDate]: {
            ...state.days[exactDate],
            exercises: newExercises,
          },
        },
      };
    }),
  addSetToExercise: (exercise: Exercise) =>
    set((state) => {
      const exactDate = state.selectedDate.toLocaleDateString();
      const oldEx = state.days[exactDate]?.exercises ?? [];
      const newExercises = oldEx.map((ex) => {
        if (ex.id !== exercise.id) return ex;
        return {
          ...ex,
          sets: [...ex.sets, { id: crypto.randomUUID(), weight: 0, reps: 0 }],
        };
      });
      return {
        days: {
          ...state.days,
          [exactDate]: {
            ...state.days[exactDate],
            exercises: newExercises,
          },
        },
      };
    }),
}));
