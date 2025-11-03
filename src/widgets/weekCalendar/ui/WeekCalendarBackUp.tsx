// import { type PanInfo, resize } from "motion";
// import { useState, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// // @ts-ignore
// import "swiper/css";
// import { motion } from "motion/react";
// import dayjs, { type Dayjs } from "dayjs";
// import "dayjs/locale/ru";
// import isoWeek from "dayjs/plugin/isoWeek";
// import { useCalendarStore } from "../../../entities/calendarDay";
// import { Day } from "../../../entities/calendarDay/ui/Day.tsx";
// import styles from "./WeekCalendar.module.css";
// import type { Week } from "./model/weekType.ts";
// import { generateWeek, PRELOAD_WEEKS } from "./lib";
//
// dayjs.extend(isoWeek); // 👉 Неделя начинается с понедельника
// dayjs.locale("ru");
//
// const hasExercises = (date: Dayjs) => {
//   const day = date.format("DD-MM-YYYY");
//   const days = useCalendarStore((state) => state.days);
//   const dayExercises = days[day]?.exercises ?? [];
//   return dayExercises.length > 0;
// };
//
// export const WeekSlider2 = () => {
//   const setObservableDate = useCalendarStore(
//     (state) => state.setObservableDate,
//   );
//   const selectedDate = useCalendarStore((state) => state.selectedDate);
//   const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);
//   const [divHeight, setDivHeight] = useState("100");
//   const [calendarExpanded, setCalendarExpanded] = useState(false);
//
//   const [weeks, setWeeks] = useState<Week[]>(() => {
//     const current = dayjs().startOf("isoWeek"); // 👉 Понедельник
//     const initialWeeks: Week[] = [];
//
//     // предзагрузка 5 недель до и после
//     for (let i = -PRELOAD_WEEKS; i <= PRELOAD_WEEKS; i++) {
//       initialWeeks.push(generateWeek(current.add(i, "week")));
//     }
//     return initialWeeks;
//   });
//   const swiperRef = useRef<any>(null);
//   resize(() => console.log("123"));
//   const calendarPullHandler = (info: PanInfo) => {
//     if (info.point.y >= 300) {
//       setDivHeight("500px");
//       setCalendarExpanded(true);
//     }
//     if (info.point.y < 400 && divHeight === "500px") {
//       setDivHeight("100px");
//       setCalendarExpanded(false);
//     }
//   };
//
//   const handleSlideChange = (swiper: any) => {
//     const { activeIndex } = swiper;
//     const lastIndex = weeks.length - 1;
//     setObservableDate(weeks[activeIndex].start.add(6, "day"));
//
//     // если дошли до конца — добавляем ещё 5 недель вперёд
//     if (activeIndex >= lastIndex - 2) {
//       const nextStart = weeks[lastIndex].start.add(1, "week");
//       const newWeeks: Week[] = [];
//       for (let i = 0; i < PRELOAD_WEEKS; i++) {
//         newWeeks.push(generateWeek(nextStart.add(i, "week")));
//       }
//       setWeeks((prev) => [...prev, ...newWeeks]);
//     }
//
//     // если дошли к началу — добавляем 5 недель назад
//     if (activeIndex <= 2) {
//       const prevStart = weeks[0].start.subtract(PRELOAD_WEEKS, "week");
//       const newWeeks: Week[] = [];
//       for (let i = 0; i < PRELOAD_WEEKS; i++) {
//         newWeeks.push(generateWeek(prevStart.add(i, "week")));
//       }
//       setWeeks((prev) => [...newWeeks, ...prev]);
//       setTimeout(() => swiper.slideTo(activeIndex + PRELOAD_WEEKS, 0), 0);
//     }
//   };
//
//   return (
//     <motion.div
//       drag="y"
//       onDragEnd={(_, info) => calendarPullHandler(info)}
//       dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
//       dragTransition={{ bounceStiffness: 800, bounceDamping: 25 }}
//       dragElastic={0.4}
//       whileDrag={{ scale: 1.1 }}
//       className={"bg-white z-20"}
//     >
//       <div className={styles.calendar}>
//         <Swiper
//           ref={swiperRef}
//           slidesPerView={1}
//           onSlideChange={handleSlideChange}
//           initialSlide={PRELOAD_WEEKS}
//           style={{
//             height: divHeight,
//             width: "100%",
//             transition: "height 0.3s",
//           }}
//         >
//           {weeks.map((week) => (
//             <SwiperSlide key={week.start.toString()}>
//               <div className={styles.days}>
//                 {week.days.map((day) => {
//                   return (
//                     <div key={day.day()}>
//                       <Day
//                         value={day}
//                         selectedDate={selectedDate}
//                         onClickDate={setSelectedDate}
//                         hasExercises={hasExercises}
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </motion.div>
//   );
// };
