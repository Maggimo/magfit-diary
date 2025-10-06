export interface ExerciseSet {
  id: string;
  weight: number;
  reps: number;
}

export type ExerciseCategory =
  | "Грудь"
  | "Спина"
  | "Ноги"
  | "Руки"
  | "Пресс"
  | "Кардио"
  | "Другое"
  | "Плечи";

export interface Exercise {
  id: string;
  name: string;
  category: string;
  sets: ExerciseSet[];
}
