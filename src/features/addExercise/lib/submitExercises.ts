import type { ExerciseCategory, TrainingPreset } from "@/entities/exercise";

export const submitExercises = (
  selectedExerciseCheckboxes: string[],
  selectedPresetCheckboxes: string[],
  allExercises: ExerciseCategory[],
  trainingPreset: TrainingPreset[],
  addExercise: (name: string, category: string) => void,
) => {
  selectedExerciseCheckboxes.forEach((exercise) => {
    const category = allExercises.find((group) =>
      group.exercises.includes(exercise),
    )?.category;
    if (category) {
      addExercise(exercise, category);
    }
  });

  selectedPresetCheckboxes.forEach((selectedPresetName) => {
    const preset = trainingPreset.find(
      (p) => p.presetName === selectedPresetName,
    );
    if (preset) {
      preset.exercises.forEach((exercise) => {
        const category = allExercises.find((group) =>
          group.exercises.includes(exercise),
        )?.category;
        if (category) {
          addExercise(exercise, category);
        }
      });
    }
  });
};

