import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../../shared/ui/shadCNComponents/ui/command";
import { Checkbox } from "../../../shared/ui/shadCNComponents/ui/checkbox.tsx";
import { Dumbbell, ListChecks } from "lucide-react";
import { useExerciseStore } from "../../../entities/exercise/slice/exerciseStore.ts";

interface BaseProps {
  checkable: boolean;
}

interface CheckableProps extends BaseProps {
  checkable: true;
  exerciseSelectHandler: (value: string) => void;
  presetSelectHandler: (value: string) => void;
  selectedExerciseCheckboxes: string[];
  selectedPresetCheckboxes: string[];
}

interface NonCheckableProps extends BaseProps {
  checkable: false;
  exerciseSelectHandler?: never;
  presetSelectHandler?: never;
  selectedExerciseCheckboxes?: never;
  selectedPresetCheckboxes?: never;
}

export type FullExerciseCommandProps = CheckableProps | NonCheckableProps;

export const FullExerciseCommand = ({
  selectedExerciseCheckboxes,
  selectedPresetCheckboxes,
  presetSelectHandler,
  exerciseSelectHandler,
  checkable,
}: FullExerciseCommandProps) => {
  const allExercises = useExerciseStore((state) => state.exercises);
  const trainingPreset = useExerciseStore((state) => state.trainingPreset);

  return (
    <Command className="w-full h-full">
      <CommandInput placeholder="Поиск..." />
      <CommandList className={"flex-1 overflow-y-scroll"}>
        {allExercises.map((group) => (
          <CommandGroup heading={group.category} key={group.category}>
            <CommandSeparator />
            {group.exercises.map((name) => (
              <CommandItem
                key={name}
                value={name}
                className="text-base flex justify-between"
                onSelect={exerciseSelectHandler}
              >
                <div className={"flex gap-2 items-center"}>
                  <Dumbbell className="text-muted-foreground" />
                  <span className="text-base font-medium">{name}</span>
                </div>
                {checkable && (
                  <Checkbox
                    value={name}
                    checked={selectedExerciseCheckboxes.includes(name)}
                  />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
        <CommandGroup heading={"Пресеты"}>
          {trainingPreset.map((preset) => (
            <CommandItem
              key={preset.presetName}
              value={preset.presetName}
              className="flex flex-col items-start py-3"
              onSelect={presetSelectHandler}
            >
              <div className="flex justify-between w-full ">
                <div className="flex items-center gap-2">
                  <ListChecks className="text-muted-foreground" />
                  <span className="text-base font-medium">
                    {preset.presetName}
                  </span>
                </div>
                {checkable && (
                  <Checkbox
                    value={preset.presetName}
                    checked={selectedPresetCheckboxes.includes(
                      preset.presetName,
                    )}
                  />
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {preset.exercises.join(" • ")}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
