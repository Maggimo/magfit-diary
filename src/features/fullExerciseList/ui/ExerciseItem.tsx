import { Dumbbell, Trash2 } from "lucide-react";
import { Checkbox } from "@/shared/ui/shadCNComponents/ui/checkbox";
import { Button } from "@/shared/ui/shadCNComponents/ui/button";
import { CommandItem } from "@/shared/ui/shadCNComponents/ui/command";

interface ExerciseItemProps {
  name: string;
  checkable: boolean;
  deletable: boolean;
  selected: boolean;
  onSelect?: (value: string) => void;
  onDelete: (name: string, category: string) => void;
  category: string;
}

export const ExerciseItem = ({
  name,
  checkable,
  deletable,
  selected,
  onSelect,
  onDelete,
  category,
}: ExerciseItemProps) => {
  return (
    <CommandItem
      value={name}
      className="text-base flex justify-between"
      onSelect={onSelect}
    >
      <div className={"flex gap-2 items-center"}>
        <Dumbbell className="text-muted-foreground" />
        <span className="text-base font-medium">{name}</span>
      </div>
      <div className="flex items-center gap-2">
        {checkable && <Checkbox value={name} checked={selected} />}
        {deletable && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(name, category);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </CommandItem>
  );
};

