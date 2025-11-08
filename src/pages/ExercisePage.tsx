import { Header } from "@/widgets/index.ts";
import { Separator } from "../shared/ui/shadCNComponents/ui/separator.tsx";
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
