import { Dumbbell, ListChecks } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { useCalendarStore } from "../../../entities/calendarDay";
import { allExercises } from "../../../shared/utilities";
import { trainingPreset } from "../../../shared/utilities/const.ts";

export const AddExercise = () => {
  const [selectedPresetCheckboxes, setSelectedPresetCheckboxes] = useState<
    string[]
  >([]);
  const [selectedExerciseCheckboxes, setSelectedExerciseCheckboxes] = useState<
    string[]
  >([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const addExercise = useCalendarStore((state) => state.addExercise);

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
        allExercises.find((group) => group.exercises.includes(exercise))!.group,
      );
    });
    selectedPresetCheckboxes.forEach((selectedPresetName) => {
      trainingPreset
        .find((preset) => preset.presetName === selectedPresetName)!
        .exercises.forEach((exercise) => {
          addExercise(
            exercise,
            allExercises.find((group) => group.exercises.includes(exercise))!
              .group,
          );
        });
    });
    setSelectedExerciseCheckboxes([]);
    setSelectedPresetCheckboxes([]);
    setDrawerOpen(false);
  };

  return (
    <Drawer
      direction="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <DrawerTrigger asChild>
        <Button variant="outline" onClick={() => setDrawerOpen(true)}>
          Добавить тренировку
        </Button>
      </DrawerTrigger>
      <DrawerContent className="left-0 after:content-none after:hidden ">
        <div className="mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle className={"text-2xl"}>
              Добавьте упражнения
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>{" "}
            {/*пустой чтобы не было ошибки в консоли*/}
          </DrawerHeader>
          <div>
            <Command className="w-full h-[calc(100dvh-180px)]">
              <CommandInput placeholder="Поиск..." />
              <CommandList className={"max-h-full overflow-y-scroll"}>
                {allExercises.map((group) => (
                  <CommandGroup heading={group.group} key={group.group}>
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
                        <Checkbox
                          value={name}
                          checked={selectedExerciseCheckboxes.includes(name)}
                        />
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
                        <Checkbox
                          value={preset.presetName}
                          checked={selectedPresetCheckboxes.includes(
                            preset.presetName,
                          )}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {preset.exercises.join(" • ")}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
          <DrawerFooter className="absolute w-full bottom-0">
            <Button onClick={submitHandler}>Добавить</Button>
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Отмена
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
