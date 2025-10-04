import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { createFilterOptions } from "@mui/material";
import { useMemo, useState } from "react";
import { AutocompleteInput } from "../../../shared/ui/autocompleteInput/autocompleteInput.tsx";
import { allExercises } from "../../../shared/utilities";
import { useCalendarStore } from "../../calendarDay/slice/exerciseStore.ts";
import { ExerciseBody } from "./ExerciseBody.tsx";
import style from "./ExerciseCard.module.css";
import type { Exercise } from "../model/types.ts";

export type ExerciseOption = { group: string; name: string };

interface ExerciseCardProps {
  exercise: Exercise;
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const setExerciseName = useCalendarStore((store) => store.setExerciseName);

  const inputChangeHandler = (exerciseParams: ExerciseOption | null) => {
    setExerciseName(exerciseParams, exercise);
  };

  const { options, byGroupThenName } = useMemo(() => {
    const collator = new Intl.Collator("ru", { sensitivity: "base" });

    const byGroupThenName = (a: ExerciseOption, b: ExerciseOption) => {
      const g = collator.compare(a.group, b.group);
      return g !== 0 ? g : collator.compare(a.name, b.name);
    };

    const options: ExerciseOption[] = Object.entries(allExercises)
      .flatMap(([group, names]) =>
        names.map((name) => ({ group: group.trim(), name: name.trim() })),
      )
      .sort(byGroupThenName);

    return { options, byGroupThenName };
  }, []);

  const baseFilter = createFilterOptions<ExerciseOption>({
    stringify: (o) => `${o.name} ${o.group}`,
  });
  const filterOptions = (opts: ExerciseOption[], state: any) => {
    const filtered = baseFilter(opts, state);
    return filtered.sort(byGroupThenName);
  };

  const currentOption = useMemo<ExerciseOption>(() => {
    if (!exercise?.name) return { group: "Other", name: "Упражнение" };
    return (
      options.find((o) => o.name === exercise.name) ?? {
        group: "Other",
        name: "Упражнение",
      }
    );
  }, [exercise?.name, options]);

  return (
    <div className={style.card}>
      <div className={style.cardHead}>
        <div className={style.info}>
          <div className={style.icon}>
            <img
              className={style.img}
              src={`/muscles-category/${exercise.category.toLowerCase()}.png`}
              alt="Icon"
            />
          </div>

          <div className={style.exerciseName}>
            <AutocompleteInput<ExerciseOption>
              isEditable={isEditable}
              currentOption={currentOption}
              options={options}
              filterOptions={filterOptions}
              getOptionLabel={(o) => o.name}
              groupBy={(o) => o.group}
              isOptionEqualToValue={(o, v) =>
                o.group === v.group && o.name === v.name
              }
              onChange={inputChangeHandler}
            />
          </div>
        </div>

        <div
          onClick={() => setIsEditable((p) => !p)}
          style={{ cursor: "pointer" }}
        >
          {isEditable ? <ExpandLess /> : <ExpandMore />}
        </div>
      </div>
      {isEditable && <ExerciseBody exercise={exercise} />}
    </div>
  );
};
