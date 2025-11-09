import { TrendingUp } from "lucide-react";
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
import type { TonnageData } from "../lib/calculateTonnage";

const chartConfig = {
  tonnage: {
    label: "КГ",
    color: "black",
  },
} satisfies ChartConfig;

interface TonnageChartProps {
  exerciseName: string;
  data: TonnageData[];
}

export const TonnageChart = ({ exerciseName, data }: TonnageChartProps) => {
  return (
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
            data={data}
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
  );
};

