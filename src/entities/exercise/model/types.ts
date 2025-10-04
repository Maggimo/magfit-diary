export interface ExerciseSet {
  id: string;
  weight: number;
  reps: number;
}

export type ExerciseCategory =
  | "Chest"
  | "Back"
  | "Legs"
  | "Arms"
  | "Abs"
  | "Cardio"
  | "Other"
  | "Shoulder";

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  sets: ExerciseSet[];
}
