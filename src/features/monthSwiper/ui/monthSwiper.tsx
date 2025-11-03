import DragHandleIcon from "@mui/icons-material/DragHandle";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Day } from "../../../entities/calendarDay/ui/Day.tsx";
import type { Week } from "../../../widgets/weekCalendar/model/weekType.ts";
import { PRELOAD_MONTHS, generateMonth } from "../lib";

interface MonthSwiperProps {
  selectedDate: dayjs.Dayjs;
  observableDate: dayjs.Dayjs;
  setSelectedDate: (date: dayjs.Dayjs) => void;
  hasExercises: (date: dayjs.Dayjs) => boolean;
  setObservableDate: (date: dayjs.Dayjs) => void;
}

export const MonthSwiper = ({
  selectedDate,
  setSelectedDate,
  hasExercises,
  setObservableDate,
  observableDate,
}: MonthSwiperProps) => {
  const [months, setMonths] = useState(() => {
    const current = selectedDate.startOf("month").startOf("isoWeek");
    const initialMonths = [];

    for (let i = -PRELOAD_MONTHS; i <= PRELOAD_MONTHS; i++) {
      initialMonths.push(generateMonth(current.add(i, "month")));
    }
    return initialMonths;
  });

  const monthSwiperRef = useRef<any>(null);

  const handleMonthSlideChange = (swiper: any) => {
    const { activeIndex } = swiper;
    const lastIndex = months.length - 1;
    setObservableDate(months[activeIndex].start.add(31, "day"));

    // если дошли до конца — добавляем ещё 5 недель вперёд
    if (activeIndex >= lastIndex - 2) {
      const nextStart = months[lastIndex].start.add(1, "month");
      const newMonths: Week[] = [];
      for (let i = 0; i < PRELOAD_MONTHS; i++) {
        newMonths.push(generateMonth(nextStart.add(i, "month")));
      }
      setMonths((prev) => [...prev, ...newMonths]);
    }

    // если дошли к началу — добавляем 5 недель назад
    if (activeIndex <= 2) {
      const prevStart = months[0].start.subtract(PRELOAD_MONTHS, "month");
      const newMonths: Week[] = [];
      for (let i = 0; i < PRELOAD_MONTHS; i++) {
        newMonths.push(generateMonth(prevStart.add(i, "month")));
      }
      setMonths((prev) => [...newMonths, ...prev]);
      setTimeout(() => swiper.slideTo(activeIndex + PRELOAD_MONTHS, 0), 0);
    }
  };

  const monthsRender = () => {
    return months.map((month) => (
      <SwiperSlide key={month.start.toString()}>
        <div className={"grid grid-cols-7 gap-y-5"}>
          {month.days.map((day, index) => {
            return (
              <div key={day.format("DD-MM-YYYY")}>
                <Day
                  observableDate={observableDate}
                  value={day}
                  selectedDate={selectedDate}
                  dayName={index < 7 ? day.format("dd") : undefined}
                  onClickDate={setSelectedDate}
                  hasExercises={hasExercises}
                />
              </div>
            );
          })}
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <Swiper
      key={"month"}
      ref={monthSwiperRef}
      slidesPerView={1}
      onSlideChange={handleMonthSlideChange}
      initialSlide={PRELOAD_MONTHS}
    >
      {monthsRender()}
      <div className={"flex pt-4 justify-center items-baseline w-full h-full"}>
        <DragHandleIcon />
      </div>
    </Swiper>
  );
};
