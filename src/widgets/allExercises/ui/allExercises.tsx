import { useState } from "react";
import { Button } from "../../../components/ui/button.tsx";
import { ChevronRight, Dumbbell, ListChecks } from "lucide-react";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { allExercises, trainingPreset } from "@/shared/utilities/const.ts";

export const AllExercises = () => {
  const [openExercises, setOpenExercises] = useState(false);
  const [openPresets, setOpenPresets] = useState(false);

  return (
    <div className="m-4 flex flex-col gap-4">
      <Button
        onClick={() => setOpenExercises(true)}
        variant="outline"
        className={
          "text-2xl justify-between w-full p-8 border-2 border-black rounded-xl hover:shadow-md transition-shadow"
        }
      >
        Упражнения <ChevronRight />
      </Button>

      <Button
        onClick={() => setOpenPresets(true)}
        variant="outline"
        className={
          "text-2xl justify-between w-full p-8 border-2 border-black rounded-xl hover:shadow-md transition-shadow"
        }
      >
        Пресеты тренировок <ChevronRight />
      </Button>

      {/* Диалог со списком упражнений */}
      <CommandDialog
        title="Список упражнений"
        description="Просмотрите доступные упражнения по группам"
        open={openExercises}
        onOpenChange={setOpenExercises}
      >
        <CommandInput placeholder="Поиск упражнения..." />
        <CommandList className="transition-all duration-300">
          {allExercises.map((group) => (
            <CommandGroup heading={group.group} key={group.group}>
              {group.exercises.map((name) => (
                <CommandItem key={name} value={name} className="text-base">
                  <Dumbbell className="text-muted-foreground" />
                  <span>{name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>

      {/* Диалог со списком пресетов */}
      <CommandDialog
        title="Пресеты тренировок"
        description="Готовые наборы упражнений"
        open={openPresets}
        onOpenChange={setOpenPresets}
      >
        <CommandInput placeholder="Поиск пресета..." />
        <CommandList className="transition-all duration-300">
          <CommandGroup>
            {trainingPreset.map((preset) => (
              <CommandItem
                key={preset.presetName}
                value={preset.presetName}
                className="flex flex-col items-start gap-1 py-3"
              >
                <div className="flex items-center gap-2">
                  <ListChecks className="text-muted-foreground" />
                  <span className="text-base font-medium">
                    {preset.presetName}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {preset.exercises.join(" • ")}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};
