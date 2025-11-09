import { Pencil } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/shadCNComponents/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/shadCNComponents/ui/popover";
import { Button } from "@/shared/ui/shadCNComponents/ui/button";
import { type ExerciseCategory } from "@/entities/exercise";

interface ExerciseNameSelectorProps {
  exerciseName: string;
  isEditable: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (name: string) => void;
  allExercises: ExerciseCategory[];
}

export const ExerciseNameSelector = ({
  exerciseName,
  isEditable,
  open,
  onOpenChange,
  onSelect,
  allExercises,
}: ExerciseNameSelectorProps) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          disabled={!isEditable}
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] sm:w-[200px] justify-between text-md"
        >
          {exerciseName || "Выберите упражнение"}
          {isEditable && <Pencil className="opacity-50" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Поиск упражнения" />
          <CommandList>
            <CommandEmpty>Упражнение не найдено</CommandEmpty>
            {allExercises.map((element) => (
              <CommandGroup heading={element.category} key={element.category}>
                {element.exercises.map((name) => (
                  <CommandItem onSelect={onSelect} key={name}>
                    {name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
