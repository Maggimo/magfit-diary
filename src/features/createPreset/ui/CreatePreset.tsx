import { useState } from "react";
import { Button } from "@/shared/ui/shadCNComponents/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/shadCNComponents/ui/dialog";
import { Input } from "@/shared/ui/shadCNComponents/ui/input";
import { useExerciseStore } from "@/entities/exercise";
import type { NewPreset } from "../model/types";

interface CreatePresetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePreset = ({ open, onOpenChange }: CreatePresetProps) => {
  const [newPreset, setNewPreset] = useState<NewPreset>({
    presetName: "",
    exercises: [],
  });
  
  const allExercises = useExerciseStore((state) => state.exercises);
  const createTrainingPreset = useExerciseStore(
    (state) => state.createTrainingPreset,
  );

  const handleClose = () => {
    onOpenChange(false);
    setNewPreset({ presetName: "", exercises: [] });
  };

  const handleCreate = () => {
    if (newPreset.presetName && newPreset.exercises.length > 0) {
      createTrainingPreset(newPreset);
      handleClose();
    }
  };

  const handleExerciseToggle = (exercise: string, checked: boolean) => {
    if (checked) {
      setNewPreset({
        ...newPreset,
        exercises: [...newPreset.exercises, exercise],
      });
    } else {
      setNewPreset({
        ...newPreset,
        exercises: newPreset.exercises.filter((ex) => ex !== exercise),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Добавить пресет тренировки</DialogTitle>
          <DialogDescription>
            Введите название и выберите упражнения для нового пресета
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="preset-name" className="text-sm font-medium">
              Название пресета
            </label>
            <Input
              id="preset-name"
              placeholder="Например: Грудь и трицепс"
              value={newPreset.presetName}
              onChange={(e) =>
                setNewPreset({ ...newPreset, presetName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2 max-[330px]:h-30 overflow-hidden">
            <label className="text-sm font-medium">Выберите упражнения</label>
            <div className="max-h-64 overflow-y-auto border rounded-md p-2">
              {allExercises.map((group) => (
                <div key={group.category} className="mb-4">
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">
                    {group.category}
                  </h4>
                  <div className="space-y-1">
                    {group.exercises.map((exercise) => (
                      <label
                        key={exercise}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={newPreset.exercises.includes(exercise)}
                          onChange={(e) =>
                            handleExerciseToggle(exercise, e.target.checked)
                          }
                        />
                        <span className="text-sm">{exercise}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Отмена
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!newPreset.presetName || newPreset.exercises.length === 0}
          >
            Создать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
