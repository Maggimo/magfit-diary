const monthYearRegex = /^(0[1-9]|1[0-2])-\d{4}$/;

const keys = Object.keys(localStorage).filter((key) =>
  monthYearRegex.test(key),
);

export const getAllExercises = () => {
  let allExercises = [];
  for (const key of keys) {
    const value = localStorage.getItem(key);
    if (value) {
      allExercises.push(JSON.parse(value));
    }
  }
  return allExercises;
};
