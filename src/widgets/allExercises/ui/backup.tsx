// import { useMemo, useState } from "react";
// import { Button } from "../../../components/ui/button.tsx";
// import { Check, ChevronRight, Dumbbell, ListChecks } from "lucide-react";
// import {
//   CommandDialog,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { allExercises, trainingPreset } from "@/shared/utilities/const.ts";

// export const AllExercises = () => {
//   const [openExercises, setOpenExercises] = useState(false);
//   const [openPresets, setOpenPresets] = useState(false);
//   const [showAddMenu, setShowAddMenu] = useState(false);

//   // Custom user-created entities
//   const [customExercises, setCustomExercises] = useState<
//     { group: string; exercises: string[] }[]
//   >([]);
//   const [customPresets, setCustomPresets] = useState<
//     { presetName: string; exercises: string[] }[]
//   >([]);

//   // Dialogs for adding
//   const [openAddExercise, setOpenAddExercise] = useState(false);
//   const [openAddPreset, setOpenAddPreset] = useState(false);

//   // Form state: exercise
//   const [newExerciseCategory, setNewExerciseCategory] = useState("");
//   const [newExerciseName, setNewExerciseName] = useState("");

//   // Form state: preset
//   const [newPresetName, setNewPresetName] = useState("");
//   const [selectedExercises, setSelectedExercises] = useState<Set<string>>(new Set());

//   const combinedExerciseGroups = useMemo(() => {
//     // merge built-ins with custom, grouping by group name
//     const groupToExercises = new Map<string, Set<string>>();
//     for (const g of allExercises) {
//       groupToExercises.set(g.group, new Set(g.exercises));
//     }
//     for (const g of customExercises) {
//       if (!groupToExercises.has(g.group)) {
//         groupToExercises.set(g.group, new Set());
//       }
//       const setRef = groupToExercises.get(g.group)!;
//       for (const ex of g.exercises) setRef.add(ex);
//     }
//     return Array.from(groupToExercises.entries())
//       .sort((a, b) => a[0].localeCompare(b[0]))
//       .map(([group, setVals]) => ({ group, exercises: Array.from(setVals).sort() }));
//   }, [customExercises]);

//   const combinedPresets = useMemo(() => {
//     return [...trainingPreset, ...customPresets];
//   }, [customPresets]);

//   const resetExerciseForm = () => {
//     setNewExerciseCategory("");
//     setNewExerciseName("");
//   };

//   const resetPresetForm = () => {
//     setNewPresetName("");
//     setSelectedExercises(new Set());
//   };

//   const addCustomExercise = () => {
//     const category = newExerciseCategory.trim();
//     const name = newExerciseName.trim();
//     if (!category || !name) return;
//     setCustomExercises((prev) => {
//       const next = [...prev];
//       const idx = next.findIndex((g) => g.group.toLowerCase() === category.toLowerCase());
//       if (idx >= 0) {
//         const setVals = new Set(next[idx].exercises);
//         setVals.add(name);
//         next[idx] = { ...next[idx], exercises: Array.from(setVals) };
//       } else {
//         next.push({ group: category, exercises: [name] });
//       }
//       return next;
//     });
//     setOpenAddExercise(false);
//     setShowAddMenu(false);
//     resetExerciseForm();
//   };

//   const toggleSelectExercise = (exName: string) => {
//     setSelectedExercises((prev) => {
//       const next = new Set(prev);
//       if (next.has(exName)) next.delete(exName);
//       else next.add(exName);
//       return next;
//     });
//   };

//   const addCustomPreset = () => {
//     const name = newPresetName.trim();
//     const chosen = Array.from(selectedExercises);
//     if (!name || chosen.length === 0) return;
//     setCustomPresets((prev) => [...prev, { presetName: name, exercises: chosen }]);
//     setOpenAddPreset(false);
//     setShowAddMenu(false);
//     resetPresetForm();
//   };

//   return (
//     <div className="m-4 flex flex-col gap-4 relative">
//       {showAddMenu && (
//         <div className="absolute -top-2 left-0 right-0 flex justify-center z-20">
//           <div className="flex gap-2 bg-white border border-black rounded-xl p-2 shadow-md">
//             <Button
//               variant="outline"
//               onClick={() => {
//                 setOpenAddExercise(true);
//               }}
//             >
//               упражнение
//             </Button>
//             <Button
//               variant="outline"
//               onClick={() => {
//                 setOpenAddPreset(true);
//               }}
//             >
//               тренировку
//             </Button>
//           </div>
//         </div>
//       )}
//       <Button
//         onClick={() => setOpenExercises(true)}
//         variant="outline"
//         className={
//           "text-2xl justify-between w-full p-8 border-2 border-black rounded-xl hover:shadow-md transition-shadow"
//         }
//       >
//         Упражнения <ChevronRight />
//       </Button>

//       <Button
//         onClick={() => setOpenPresets(true)}
//         variant="outline"
//         className={
//           "text-2xl justify-between w-full p-8 border-2 border-black rounded-xl hover:shadow-md transition-shadow"
//         }
//       >
//         Пресеты тренировок <ChevronRight />
//       </Button>

//       {/* Диалог со списком упражнений */}
//       <CommandDialog
//         title="Список упражнений"
//         description="Просмотрите доступные упражнения по группам"
//         open={openExercises}
//         onOpenChange={setOpenExercises}
//       >
//         <CommandInput placeholder="Поиск упражнения..." />
//         <CommandList className="transition-all duration-300">
//           {combinedExerciseGroups.map((group) => (
//             <CommandGroup heading={group.group} key={group.group}>
//               {group.exercises.map((name) => (
//                 <CommandItem key={name} value={name} className="text-base">
//                   <Dumbbell className="text-muted-foreground" />
//                   <span>{name}</span>
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           ))}
//         </CommandList>
//       </CommandDialog>

//       {/* Диалог со списком пресетов */}
//       <CommandDialog
//         title="Пресеты тренировок"
//         description="Готовые наборы упражнений"
//         open={openPresets}
//         onOpenChange={setOpenPresets}
//       >
//         <CommandInput placeholder="Поиск пресета..." />
//         <CommandList className="transition-all duration-300">
//           <CommandGroup>
//             {combinedPresets.map((preset) => (
//               <CommandItem
//                 key={preset.presetName}
//                 value={preset.presetName}
//                 className="flex flex-col items-start gap-1 py-3"
//               >
//                 <div className="flex items-center gap-2">
//                   <ListChecks className="text-muted-foreground" />
//                   <span className="text-base font-medium">
//                     {preset.presetName}
//                   </span>
//                 </div>
//                 <div className="text-sm text-muted-foreground">
//                   {preset.exercises.join(" • ")}
//                 </div>
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </CommandList>
//       </CommandDialog>

//       {/* Add button at bottom */}
//       <Button
//         onClick={() => setShowAddMenu((v) => !v)}
//         variant="outline"
//         className={
//           "text-xl justify-center w-full p-6 border-2 border-black rounded-xl hover:shadow-md transition-shadow"
//         }
//       >
//         добавить
//       </Button>

//       {/* Modal: add exercise */}
//       <CommandDialog
//         title="Новое упражнение"
//         description="Укажите категорию и название"
//         open={openAddExercise}
//         onOpenChange={(open) => {
//           setOpenAddExercise(open);
//           if (!open) resetExerciseForm();
//         }}
//       >
//         <div className="p-4 flex flex-col gap-3">
//           <input
//             className="w-full border border-black rounded-md px-3 py-2"
//             placeholder="Категория"
//             value={newExerciseCategory}
//             onChange={(e) => setNewExerciseCategory(e.target.value)}
//           />
//           <input
//             className="w-full border border-black rounded-md px-3 py-2"
//             placeholder="Название упражнения"
//             value={newExerciseName}
//             onChange={(e) => setNewExerciseName(e.target.value)}
//           />
//           <div className="flex gap-2 justify-end mt-2">
//             <Button variant="outline" onClick={() => setOpenAddExercise(false)}>
//               Отмена
//             </Button>
//             <Button
//               onClick={addCustomExercise}
//               disabled={!newExerciseCategory.trim() || !newExerciseName.trim()}
//             >
//               Сохранить
//             </Button>
//           </div>
//         </div>
//       </CommandDialog>

//       {/* Modal: add preset */}
//       <CommandDialog
//         title="Новый пресет"
//         description="Введите название и выберите упражнения"
//         open={openAddPreset}
//         onOpenChange={(open) => {
//           setOpenAddPreset(open);
//           if (!open) resetPresetForm();
//         }}
//       >
//         <div className="p-4 flex flex-col gap-3">
//           <input
//             className="w-full border border-black rounded-md px-3 py-2"
//             placeholder="Название пресета"
//             value={newPresetName}
//             onChange={(e) => setNewPresetName(e.target.value)}
//           />

//           <div className="border border-black rounded-md">
//             <CommandInput placeholder="Поиск упражнения..." />
//             <CommandList className="max-h-64 overflow-auto">
//               {combinedExerciseGroups.map((group) => (
//                 <CommandGroup heading={group.group} key={group.group}>
//                   {group.exercises.map((name) => {
//                     const selected = selectedExercises.has(name);
//                     return (
//                       <CommandItem
//                         key={name}
//                         value={name}
//                         onSelect={() => toggleSelectExercise(name)}
//                         className="flex items-center gap-2"
//                       >
//                         <span
//                           className={`h-5 w-5 inline-flex items-center justify-center border border-black rounded ${
//                             selected ? "bg-black text-white" : "bg-white"
//                           }`}
//                         >
//                           {selected ? <Check className="h-4 w-4" /> : null}
//                         </span>
//                         <span>{name}</span>
//                       </CommandItem>
//                     );
//                   })}
//                 </CommandGroup>
//               ))}
//             </CommandList>
//           </div>

//           <div className="flex gap-2 justify-end mt-2">
//             <Button variant="outline" onClick={() => setOpenAddPreset(false)}>
//               Отмена
//             </Button>
//             <Button
//               onClick={addCustomPreset}
//               disabled={!newPresetName.trim() || selectedExercises.size === 0}
//             >
//               Сохранить
//             </Button>
//           </div>
//         </div>
//       </CommandDialog>
//     </div>
//   );
// }; cursor
