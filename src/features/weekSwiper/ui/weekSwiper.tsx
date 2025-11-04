import DragHandleIcon from "@mui/icons-material/DragHandle";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Day } from "../../../entities/calendarDay/ui/Day.tsx";
import type { Week } from "../../../widgets/weekCalendar/model/weekType.ts";
import { generateWeek, PRELOAD_WEEKS } from "../lib";
import styles from "./weekSlider.module.css";

interface WeekSwiperProps {
  selectedDate: dayjs.Dayjs;
  observableDate: dayjs.Dayjs;
  setSelectedDate: (date: dayjs.Dayjs) => void;
  hasExercises: (date: dayjs.Dayjs) => boolean;
  setObservableDate: (date: dayjs.Dayjs) => void;
}

export const WeekSwiper = ({
  selectedDate,
  setSelectedDate,
  hasExercises,
  setObservableDate,
  observableDate,
}: WeekSwiperProps) => {
  const weekSwiperRef = useRef<any>(null);
  const [weeks, setWeeks] = useState<Week[]>(() => {
    const current = selectedDate.startOf("isoWeek"); // 👉 Понедельник
    const initialWeeks: Week[] = [];

    // предзагрузка 5 недель до и после
    for (let i = -PRELOAD_WEEKS; i <= PRELOAD_WEEKS; i++) {
      initialWeeks.push(generateWeek(current.add(i, "week")));
    }
    return initialWeeks;
  });
  const weeksRender = () => {
    return weeks.map((week) => (
      <SwiperSlide key={week.start.toString()}>
        <div className={styles.days}>
          {week.days.map((day) => {
            return (
              <div key={day.day()}>
                <Day
                  observableDate={observableDate}
                  value={day}
                  dayName={day.format("dd")}
                  selectedDate={selectedDate}
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

  const handleWeekSlideChange = (swiper: any) => {
    const { activeIndex } = swiper;
    const lastIndex = weeks.length - 1;
    setObservableDate(weeks[activeIndex].start.add(6, "day"));

    // если дошли до конца — добавляем ещё 5 недель вперёд
    if (activeIndex >= lastIndex - 2) {
      const nextStart = weeks[lastIndex].start.add(1, "week");
      const newWeeks: Week[] = [];
      for (let i = 0; i < PRELOAD_WEEKS; i++) {
        newWeeks.push(generateWeek(nextStart.add(i, "week")));
      }
      setWeeks((prev) => [...prev, ...newWeeks]);
    }

    // если дошли к началу — добавляем 5 недель назад
    if (activeIndex <= 2) {
      const prevStart = weeks[0].start.subtract(PRELOAD_WEEKS, "week");
      const newWeeks: Week[] = [];
      for (let i = 0; i < PRELOAD_WEEKS; i++) {
        newWeeks.push(generateWeek(prevStart.add(i, "week")));
      }
      setWeeks((prev) => [...newWeeks, ...prev]);
      setTimeout(() => swiper.slideTo(activeIndex + PRELOAD_WEEKS, 0), 0);
    }
  };

  return (
    <Swiper
      key={"week"}
      ref={weekSwiperRef}
      slidesPerView={1}
      onSlideChange={handleWeekSlideChange}
      initialSlide={PRELOAD_WEEKS}
    >
      {weeksRender()}
      <div className={"flex justify-center items-baseline"}>
        <DragHandleIcon />
      </div>
    </Swiper>
  );
};
