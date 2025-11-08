import { DialogTrigger } from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
import { ChartColumnBig, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/shadCNComponents/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/shadCNComponents/ui/chart";
import { Button } from "@/shared/ui/shadCNComponents/ui/button.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/shadCNComponents/ui/dialog.tsx";
import type { CalendarDay } from "@/entities/calendarDay";
import { getAllExercises } from "../lib/getAllExercises.ts";

export const description = "A tonnage chart for exercises";
const chartConfig = {
  tonnage: {
    label: "КГ",
    color: "black",
  },
} satisfies ChartConfig;

export const StatisticCard = ({ exerciseName }: { exerciseName: string }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [exerciseObj, setExerciseObj] = useState<Record<string, CalendarDay>>(
    {},
  );

  useEffect(() => {
    if (dialogOpen) {
      const allExercises: Record<string, CalendarDay> =
        getAllExercises().reduce((result, currentValue) => {
          return {
            ...result,
            ...currentValue,
          };
        }, {});
      setExerciseObj(allExercises);
    }
  }, [dialogOpen]);

  const [chartDataForExercise, setChartDataForExercise] = useState<
    { date: string; tonnage: number }[]
  >([]);

  useEffect(() => {
    if (Object.keys(exerciseObj).length > 0) {
      const tonnageData = Object.entries(exerciseObj)
        .map(([date, dayData]) => {
          const exercisesForDay = dayData.exercises.filter(
            (ex) => ex.name === exerciseName,
          );

          const totalTonnage = exercisesForDay.reduce(
            (dayTonnage, exercise) => {
              const exerciseTonnage = exercise.sets.reduce(
                (setsTonnage, set) => {
                  return setsTonnage + set.weight * set.reps;
                },
                0,
              );
              return dayTonnage + exerciseTonnage;
            },
            0,
          );

          return {
            date,
            tonnage: totalTonnage,
          };
        })
        .filter((item) => item.tonnage > 0) // Only include dates with tonnage > 0
        .sort((a, b) =>
          dayjs(a.date, "DD-MM-YYYY").diff(dayjs(b.date, "DD-MM-YYYY")),
        ); // Sort by date chronologically

      setChartDataForExercise(tonnageData);
    }
  }, [exerciseObj, exerciseName]);
  console.log(dayjs().utcOffset());
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            <ChartColumnBig />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Статистика упражнения</DialogTitle>
            <DialogDescription>
              Просмотр динамики тоннажа для упражнения {exerciseName}
            </DialogDescription>
          </DialogHeader>
          <Card>
            <CardHeader>
              <CardTitle>Тоннаж по упражнению: {exerciseName}</CardTitle>
              <CardDescription>
                Общий тоннаж (вес × повторения) по датам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart
                  accessibilityLayer
                  data={chartDataForExercise}
                  margin={{
                    top: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis
                    dataKey="date"
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => {
                      // Format date string for display (show only day-month)
                      const parts = value.split("-");
                      return parts.length >= 2
                        ? `${parts[0]}-${parts[1]}`
                        : value;
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="tonnage" fill="var(--color-tonnage)" radius={4}>
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 leading-none font-medium">
                Динамика тоннажа
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground leading-none">
                Общий тоннаж по дням выполнения упражнения
              </div>
            </CardFooter>
          </Card>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
