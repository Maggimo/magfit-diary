export interface ExerciseSet {
  id: string;
  weight: number;
  reps: number;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  sets: ExerciseSet[];
}

export interface ExerciseCategory {
  category: string;
  exercises: string[];
}

export interface TrainingPreset {
  presetName: string;
  exercises: string[];
}
