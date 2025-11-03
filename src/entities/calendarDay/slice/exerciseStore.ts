import dayjs from "dayjs";
import "dayjs/locale/ru";
import { create } from "zustand";
import type { ExerciseOption } from "../../../features/exercise/ui/ExerciseCard.tsx";
import type { Exercise, ExerciseSet } from "../../exercise";
import type { CalendarDay } from "../model/types.ts";

dayjs.locale("ru");

interface CalendarStore {
  days: Record<string, CalendarDay>;
  selectedDate: dayjs.Dayjs;
  setSelectedDate: (date: dayjs.Dayjs) => void;
  observableDate: dayjs.Dayjs;
  setObservableDate: (date: dayjs.Dayjs) => void;
  loadDaysFromLocalStorage: (date: dayjs.Dayjs) => void;
  addExercise: (name: string, group: string) => void;
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

const getDaysFromLocalStorage = (date: dayjs.Dayjs) => {
  const prevDate = dayjs(date.add(-1, "month"));
  const prevDateKey = prevDate.format("MM-YYYY");
  const prevDays = JSON.parse(localStorage.getItem(prevDateKey) ?? "{}");
  const nextDate = dayjs(date.add(1, "month"));
  const nextDateKey = nextDate.format("MM-YYYY");
  const nextDays = JSON.parse(localStorage.getItem(nextDateKey) ?? "{}");
  const currentDateKey = date.format("MM-YYYY");
  const currentDays = JSON.parse(localStorage.getItem(currentDateKey) ?? "{}");
  return {
    ...prevDays,
    ...currentDays,
    ...nextDays,
  };
};

const generateExercise = (name: string, group: string) => {
  return {
    sets: [
      {
        weight: 0,
        reps: 0,
        id: crypto.randomUUID(),
      },
    ],
    id: crypto.randomUUID(),
    category: group,
    name: name,
  };
};

const saveDaysToLocalStorage = (
  date: dayjs.Dayjs,
  newDays: Record<string, CalendarDay>,
) => {
  localStorage.setItem(date.format("MM-YYYY"), JSON.stringify(newDays));
};

const getDateKeyAndOldExercises = (state: CalendarStore) => {
  const dateKey = state.selectedDate.format("DD-MM-YYYY");
  const oldExercises = state.days[dateKey]?.exercises ?? [];
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
  selectedDate: dayjs(),
  setSelectedDate: (date) => set({ selectedDate: date }),

  observableDate: dayjs(),
  setObservableDate: (date) => set({ observableDate: date }),

  loadDaysFromLocalStorage: (date) =>
    set(() => {
      const days = getDaysFromLocalStorage(date);
      return {
        days: days,
      };
    }),

  addExercise: (name, group) =>
    set((state) => {
      const { dateKey, oldExercises } = getDateKeyAndOldExercises(state);
      oldExercises.push(generateExercise(name, group));
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
      const lastSet = exercise.sets[exercise.sets.length - 1];
      const newExercises = oldExercises.map((ex) => {
        if (ex.id !== exercise.id) return ex;
        return {
          ...ex,
          sets: [
            ...ex.sets,
            {
              id: crypto.randomUUID(),
              weight: lastSet.weight,
              reps: lastSet.reps,
            },
          ],
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
