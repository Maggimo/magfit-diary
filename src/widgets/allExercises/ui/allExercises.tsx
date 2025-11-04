import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { ChevronRight, Dumbbell, ListChecks, Zap } from "lucide-react";
import { CreateExercise } from "@/features/createExercise";
import { CreatePreset } from "@/features/createPreset";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { allExercises, trainingPreset } from "@/shared/utilities/const.ts";

export const AllExercises = () => {
  const [openExercises, setOpenExercises] = useState(false);
  const [openPresets, setOpenPresets] = useState(false);

  // States for add functionality
  const [openAddPopover, setOpenAddPopover] = useState(false);
  const [openExerciseModal, setOpenExerciseModal] = useState(false);
  const [openPresetModal, setOpenPresetModal] = useState(false);

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

      {/* Кнопка добавления */}
      <div className="fixed bottom-4 left-4 right-4">
        <Popover open={openAddPopover} onOpenChange={setOpenAddPopover}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={
                "text-2xl justify-center w-full p-8 border-2 border-black rounded-xl bg-white hover:bg-gray-50 text-black"
              }
            >
              Добавить
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2" align="center">
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                className="justify-start text-lg py-3"
                onClick={() => {
                  setOpenAddPopover(false);
                  setOpenExerciseModal(true);
                }}
              >
                <Dumbbell className="mr-2 h-5 w-5" />
                Упражнение
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-lg py-3"
                onClick={() => {
                  setOpenAddPopover(false);
                  setOpenPresetModal(true);
                }}
              >
                <Zap className="mr-2 h-5 w-5" />
                Тренировку
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

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
            <CommandGroup heading={group.category} key={group.category}>
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

      {/* Модальное окно добавления упражнения */}
      <CreateExercise
        open={openExerciseModal}
        onOpenChange={setOpenExerciseModal}
      />

      {/* Модальное окно добавления пресета */}
      <CreatePreset open={openPresetModal} onOpenChange={setOpenPresetModal} />
    </div>
  );
};
