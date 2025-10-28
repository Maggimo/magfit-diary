import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/ru";
import isoWeek from "dayjs/plugin/isoWeek";
import { useCalendarStore } from "../../../entities/calendarDay";
import { Day } from "../../../entities/calendarDay/ui/Day.tsx";
import styles from "./Calendar.module.css";

dayjs.extend(isoWeek); // 👉 Неделя начинается с понедельника
dayjs.locale("ru");
type Week = {
  start: dayjs.Dayjs;
  days: dayjs.Dayjs[];
};

const generateWeek = (start: dayjs.Dayjs): Week => {
  const days = Array.from({ length: 7 }, (_, i) => start.add(i, "day"));
  return { start, days };
};

const PRELOAD_WEEKS = 5;

const hasExercises = (date: Dayjs) => {
  const day = date.format("DD-MM-YYYY");
  const days = useCalendarStore((state) => state.days);
  const dayExercises = days[day]?.exercises ?? [];
  return dayExercises.length > 0;
};

export const WeekSlider = () => {
  const setObservableDate = useCalendarStore(
    (state) => state.setObservableDate,
  );
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);

  const [weeks, setWeeks] = useState<Week[]>(() => {
    const current = dayjs().startOf("isoWeek"); // 👉 Понедельник
    const initialWeeks: Week[] = [];

    // предзагрузка 5 недель до и после
    for (let i = -PRELOAD_WEEKS; i <= PRELOAD_WEEKS; i++) {
      initialWeeks.push(generateWeek(current.add(i, "week")));
    }
    return initialWeeks;
  });
  const swiperRef = useRef<any>(null);

  const handleSlideChange = (swiper: any) => {
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
    <div className={styles.calendar}>
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        initialSlide={PRELOAD_WEEKS}
      >
        {weeks.map((week) => (
          <SwiperSlide key={week.start.toString()}>
            <div className="week-slide">
              <div className={styles.days}>
                {week.days.map((day) => {
                  return (
                    <div key={day.day()}>
                      <Day
                        value={day}
                        selectedDate={selectedDate}
                        onClickDate={setSelectedDate}
                        hasExercises={hasExercises}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
