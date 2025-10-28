import { useCalendarStore } from "../../entities/calendarDay";
import { firstLetterToUpperCase } from "../../shared/ui/stringFormat/functions.ts";
import style from "./Header.module.css";

import { ProfileDropDownMenu } from "../../features/profileDropDownMenu";

export const Header = ({}) => {
  const observableDate = useCalendarStore((state) => state.observableDate);

  return (
    <div className={style.header}>
      <div className={style.title}>
        <div className={style.pageName}>Тренировки</div>
        <div className={style.month}>
          {firstLetterToUpperCase(observableDate.format("MMMM YYYY"))}
        </div>
      </div>
      <ProfileDropDownMenu />
    </div>
  );
};
