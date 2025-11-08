import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { Button } from "../../../shared/ui/shadCNComponents/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../shared/ui/shadCNComponents/ui/dialog";
import { Input } from "../../../shared/ui/shadCNComponents/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../shared/ui/shadCNComponents/ui/command.tsx";
import { useExerciseStore } from "@/entities/exercise/slice/exerciseStore.ts";
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
  const [focused, setFocused] = useState(false);
  const createExercise = useExerciseStore((state) => state.createExercise);
  const allExercises = useExerciseStore((state) => state.exercises);
  const commandRef = useRef<HTMLDivElement>(null);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    };

    if (focused) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, [focused]);

  const handleClose = () => {
    onOpenChange(false);
    setNewExercise({ category: "", name: "" });
    setFocused(false);
  };

  const handleCreate = () => {
    if (newExercise.category && newExercise.name) {
      createExercise(newExercise);
      handleClose();
    }
  };

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setFocused(false);
    }, 150);
  };

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    setFocused(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"max-h-[90dvh]"}>
        <DialogHeader>
          <DialogTitle>Создать упражнение</DialogTitle>
          <DialogDescription>
            Введите категорию и название нового упражнения
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Категория
            </label>
            <div ref={commandRef}>
              <Command>
                <CommandInput
                  value={newExercise.category}
                  onValueChange={(event) =>
                    setNewExercise({ ...newExercise, category: event })
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Например: Ноги, Руки, Грудь..."
                />
                <AnimatePresence>
                  {focused && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <CommandList className={"max-h-40"}>
                        <CommandEmpty>Ничего не найдено</CommandEmpty>
                        <CommandGroup heading="Категории">
                          {allExercises.map((group) => (
                            <CommandItem
                              onSelect={(event) => {
                                if (blurTimeoutRef.current) {
                                  clearTimeout(blurTimeoutRef.current);
                                }
                                setNewExercise({
                                  ...newExercise,
                                  category: event,
                                });
                                setFocused(false);
                              }}
                              key={group.category}
                            >
                              {group.category}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Command>
            </div>
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
