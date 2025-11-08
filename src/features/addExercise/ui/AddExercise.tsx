import { useState } from "react";

import { Button } from "../../../shared/ui/shadCNComponents/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../shared/ui/shadCNComponents/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../shared/ui/shadCNComponents/ui/popover";
import { Dumbbell, Zap } from "lucide-react";
import { CreateExercise } from "@/features/createExercise";
import { CreatePreset } from "@/features/createPreset";
import { useCalendarStore } from "../../../entities/calendarDay";
import { useExerciseStore } from "../../../entities/exercise/slice/exerciseStore.ts";
import { FullExerciseCommand } from "../../fullExerciseList/ui/fullExerciseCommand.tsx";

export const AddExercise = () => {
  const [selectedPresetCheckboxes, setSelectedPresetCheckboxes] = useState<
    string[]
  >([]);
  const [selectedExerciseCheckboxes, setSelectedExerciseCheckboxes] = useState<
    string[]
  >([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const [openAddPopover, setOpenAddPopover] = useState(false);
  const [openExerciseModal, setOpenExerciseModal] = useState(false);
  const [openPresetModal, setOpenPresetModal] = useState(false);

  const addExercise = useCalendarStore((state) => state.addExercise);
  const allExercises = useExerciseStore((state) => state.exercises);
  const trainingPreset = useExerciseStore((state) => state.trainingPreset);

  const presetSelectHandler = (value: string) => {
    setSelectedPresetCheckboxes((prevState) => {
      if (prevState.includes(value)) {
        return prevState.filter((item) => item !== value);
      }
      return [...prevState, value];
    });
  };

  const exerciseSelectHandler = (value: string) => {
    setSelectedExerciseCheckboxes((prevState) => {
      if (prevState.includes(value)) {
        return prevState.filter((item) => item !== value);
      }
      return [...prevState, value];
    });
  };

  const submitHandler = () => {
    selectedExerciseCheckboxes.forEach((exercise) => {
      addExercise(
        exercise,
        allExercises.find((group) => group.exercises.includes(exercise))!
          .category,
      );
    });
    selectedPresetCheckboxes.forEach((selectedPresetName) => {
      trainingPreset
        .find((preset) => preset.presetName === selectedPresetName)!
        .exercises.forEach((exercise) => {
          addExercise(
            exercise,
            allExercises.find((group) => group.exercises.includes(exercise))!
              .category,
          );
        });
    });
    setSelectedExerciseCheckboxes([]);
    setSelectedPresetCheckboxes([]);
    setDrawerOpen(false);
  };

  return (
    <div className="h-[50px]">
      <Drawer
        direction="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="text-xl justify-center w-full p-6 border-1 border-black rounded-xl bg-white hover:bg-gray-50 text-black"
            onClick={() => setDrawerOpen(true)}
          >
            Добавить тренировку
          </Button>
        </DrawerTrigger>
        <DrawerContent className="grid grid-rows-[auto_1fr_auto] h-[100dvh] overflow-hidden">
          <div className="flex-shrink-0">
            <DrawerHeader>
              <DrawerTitle className={"text-2xl"}>
                Добавьте упражнения
              </DrawerTitle>
              <DrawerDescription></DrawerDescription>
              {/*пустой чтобы не было ошибки в консоли*/}
            </DrawerHeader>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            <FullExerciseCommand
              {...{
                selectedExerciseCheckboxes,
                selectedPresetCheckboxes,
                presetSelectHandler,
                exerciseSelectHandler,
                checkable: true,
              }}
            />
          </div>

          <DrawerFooter className="w-full flex-shrink-0">
            <Popover open={openAddPopover} onOpenChange={setOpenAddPopover}>
              <PopoverTrigger asChild>
                <Button>Создать упражнение</Button>
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
            <Button onClick={submitHandler}>Добавить</Button>
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Отмена
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
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
