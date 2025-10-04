import { Avatar } from "@mui/material";
import style from "./Header.module.css";

import { type FC } from "react";

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  return (
    <div className={style.header}>
      <div>Тренировки</div>
      <Avatar src="../../../no-img-avatar.png">U</Avatar>
    </div>
  );
};
