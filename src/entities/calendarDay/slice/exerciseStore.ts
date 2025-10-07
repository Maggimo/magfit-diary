import { create } from "zustand";
import type { ExerciseOption } from "../../../features/exercise/ui/ExerciseCard.tsx";
import type { Exercise, ExerciseSet } from "../../exercise";
import type { CalendarDay } from "../model/types.ts";

interface CalendarStore {
  days: Record<string, CalendarDay>;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  loadDaysFromLocalStorage: (date: Date) => void;
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
  deleteExercise: (exercise: Exercise) => void;
  deleteSet: (exercise: Exercise, exerciseSet: ExerciseSet) => void;
}

const getDaysFromLocalStorage = (date: Date) => {
  const prevDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const prevDateKey = `days-${prevDate.getMonth()}-${prevDate.getFullYear()}`;
  const prevDays = JSON.parse(localStorage.getItem(prevDateKey) ?? "{}");
  const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const nextDateKey = `days-${nextDate.getMonth()}-${nextDate.getFullYear()}`;
  const nextDays = JSON.parse(localStorage.getItem(nextDateKey) ?? "{}");
  const currentDateKey = `days-${date.getMonth()}-${date.getFullYear()}`;
  const currentDays = JSON.parse(localStorage.getItem(currentDateKey) ?? "{}");
  return {
    ...prevDays,
    ...currentDays,
    ...nextDays,
  };
};

const generateExercise = () => {
  return {
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
  };
};

const saveDaysToLocalStorage = (
  date: Date,
  newDays: Record<string, CalendarDay>,
) => {
  localStorage.setItem(
    `days-${date.getMonth()}-${date.getFullYear()}`,
    JSON.stringify(newDays),
  );
};

const getDateKeyAndOldExercises = (state: CalendarStore) => {
  const dateKey = state.selectedDate.toLocaleDateString();
  const oldExercises = state.days[dateKey].exercises ?? [];
  return { dateKey, oldExercises };
};

const replaceExercises = (
  state: CalendarStore,
  dateKey: string,
  newExercises: Exercise[],
) => {
  const newDays = {
    ...state.days,
    [dateKey]: {
      ...state.days[dateKey],
      exercises: newExercises,
    },
  };
  saveDaysToLocalStorage(state.selectedDate, newDays);
  return newDays;
};

export const useCalendarStore = create<CalendarStore>()((set) => ({
  days: {},
  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),

  loadDaysFromLocalStorage: (date) =>
    set(() => {
      const days = getDaysFromLocalStorage(date);
      return {
        days: days,
      };
    }),

  addExercise: () =>
    set((state) => {
      const { dateKey, oldExercises } = getDateKeyAndOldExercises(state);
      oldExercises.push(generateExercise());
      const newDays = replaceExercises(state, dateKey, oldExercises);
      return {
        days: newDays,
      };
    }),

  setExerciseName: (exerciseParams, exercise) =>
    set((state) => {
      const { dateKey, oldExercises } = getDateKeyAndOldExercises(state);
      const newExercises = oldExercises.map((ex) => {
        if (ex.id !== exercise.id) return ex;
        return {
          ...ex,
          name: exerciseParams!.name,
          category: exerciseParams!.group as string,
        };
      });
      const newDays = replaceExercises(state, dateKey, newExercises);
      return {
        days: newDays,
      };
    }),

  setExerciseValues: (value, type, id, exercise) =>
    set((state) => {
      const { dateKey, oldExercises } = getDateKeyAndOldExercises(state);
      const newExercises = oldExercises.map((ex) => {
        if (ex.id !== exercise.id) return ex;
        return {
          ...ex,
          sets: ex.sets.map((set) =>
            set.id === id ? { ...set, [type]: Number(value) } : set,
          ),
        };
      });
      const newDays = replaceExercises(state, dateKey, newExercises);
      return {
        days: newDays,
      };
    }),

  addSetToExercise: (exercise) =>
    set((state) => {
      const { dateKey, oldExercises } = getDateKeyAndOldExercises(state);
      const newExercises = oldExercises.map((ex) => {
        if (ex.id !== exercise.id) return ex;
        return {
          ...ex,
          sets: [...ex.sets, { id: crypto.randomUUID(), weight: 0, reps: 0 }],
        };
      });
      const newDays = replaceExercises(state, dateKey, newExercises);
      return {
        days: newDays,
      };
    }),

  deleteExercise: (exercise) =>
    set((state) => {
      const { dateKey, oldExercises } = getDateKeyAndOldExercises(state);
      const newExercises = oldExercises.filter((ex) => ex.id !== exercise.id);

      const newDays = replaceExercises(state, dateKey, newExercises);
      return {
        days: newDays,
      };
    }),

  deleteSet: (exercise, exerciseSet) =>
    set((state) => {
      const { dateKey, oldExercises } = getDateKeyAndOldExercises(state);
      const newExercises = oldExercises.map((ex) => {
        if (ex.id !== exercise.id) return ex;
        return {
          ...ex,
          sets: ex.sets.filter((set) => set.id !== exerciseSet.id),
        };
      });

      const newDays = replaceExercises(state, dateKey, newExercises);
      return {
        days: newDays,
      };
    }),
}));
