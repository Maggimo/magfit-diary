import { useCalendarStore } from "../../entities/calendarDay/slice/exerciseStore.ts";
import { daysOfWeek, months } from "../../shared/utilities";
import CircleIcon from "@mui/icons-material/Circle";
import styles from "./Calendar.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

// @ts-ignore
import "swiper/css";

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const current = new Date();
let currentIndex = 0;

const generateArray = () => {
  const slides: { days: Date[] }[] = [];

  const clearDate = new Date(current.getFullYear() - 2, 0, 1);

  while (clearDate.getDay() !== 1) {
    if (clearDate.getDay() === 6) {
      clearDate.setDate(clearDate.getDate() - 6);
    }
    clearDate.setDate(clearDate.getDate() + 1);
  }

  const year = clearDate.getFullYear() + 4;

  let months = [];

  while (clearDate.getFullYear() < year) {
    months.push(new Date(clearDate));

    clearDate.setDate(clearDate.getDate() + 1);
    if (
      clearDate.getFullYear() === current.getFullYear() &&
      clearDate.getMonth() === current.getMonth() &&
      clearDate.getDate() === current.getDate()
    ) {
      currentIndex = slides.length + 1;
    }

    if (months.length === 7) {
      slides.push({ days: months });
      months = [];
    }
  }
  return slides;
};

const slides = generateArray();
export const Calendar = () => {
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);
  const days = useCalendarStore((state) => state.days);

  const isExercises = (exactDate: Date) => {
    const day = exactDate.toLocaleDateString();
    const exercises = days[day]?.exercises;
    if (!exercises) return false;
    return exercises?.length !== 0;
  };

  return (
    <div className={styles.calendar}>
      <Swiper initialSlide={currentIndex} spaceBetween={50} slidesPerView={1}>
        {slides.map((slide) => (
          <SwiperSlide>
            <div className={styles.month}>
              {months[slide.days.at(-1)!.getMonth()]}
            </div>
            <div className={styles.days}>
              {slide.days.map((value) => {
                const isExercisesFlag = isExercises(value);
                const key = value.toISOString().slice(0, 10);
                const todayFlag = isSameDay(value, current);
                const selectedFlag = isSameDay(value, selectedDate);
                return (
                  <div
                    className={styles.day}
                    key={key}
                    onClick={() => setSelectedDate(value)}
                  >
                    <div className={styles.dayName}>
                      {
                        daysOfWeek[
                          value.getDay() === 0 ? 6 : value.getDay() - 1
                        ]
                      }
                    </div>
                    <div
                      className={
                        todayFlag
                          ? styles.today
                          : selectedFlag
                            ? styles.selectedDay
                            : styles.dayNumber
                      }
                    >
                      {value.getDate()}
                    </div>
                    {isExercisesFlag && (
                      <CircleIcon
                        sx={{ fontSize: "10px", paddingTop: "5px" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
