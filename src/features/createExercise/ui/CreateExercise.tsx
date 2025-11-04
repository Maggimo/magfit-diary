import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useExerciseStore } from "../../../entities/exercise/slice/exerciseStore.ts";
import type { NewExercise } from "../model/types";

interface CreateExerciseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateExercise = ({ open, onOpenChange }: CreateExerciseProps) => {
  const [newExercise, setNewExercise] = useState<NewExercise>({
    category: "",
    name: "",
  });

  const createExercise = useExerciseStore((state) => state.createExercise);

  const handleClose = () => {
    onOpenChange(false);
    setNewExercise({ category: "", name: "" });
  };

  const handleCreate = () => {
    if (newExercise.category && newExercise.name) {
      createExercise(newExercise);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить упражнение</DialogTitle>
          <DialogDescription>
            Введите категорию и название нового упражнения
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Категория
            </label>
            <Input
              id="category"
              placeholder="Например: Ноги, Руки, Грудь..."
              value={newExercise.category}
              onChange={(e) =>
                setNewExercise({ ...newExercise, category: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="exercise-name" className="text-sm font-medium">
              Название упражнения
            </label>
            <Input
              id="exercise-name"
              placeholder="Например: Жим лежа"
              value={newExercise.name}
              onChange={(e) =>
                setNewExercise({ ...newExercise, name: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Отмена
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!newExercise.category || !newExercise.name}
          >
            Создать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
