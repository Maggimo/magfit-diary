import { Header } from "@/widgets/index.ts";
import { Separator } from "../components/ui/separator.tsx";
import { AllExercises } from "../widgets/allExercises";

export const ExercisePage = () => {
  return (
    <div>
      <Header title="Список упражнений" navigateBack />
      <Separator />
      <AllExercises />
    </div>
  );
};
