import { Drawer, type DrawerProps, styled } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

interface CustomDrawerProps {
  open: boolean;
  setDrawerVisibility: Dispatch<SetStateAction<boolean>>;
}

const StyledDrawer = styled((props: DrawerProps) => <Drawer {...props} />)(
  ({}) => ({
    "& .MuiPaper-root": {
      minWidth: "200px",
      padding: "10px",
      borderRadius: "0px 6px 6px 0px",
      border: `1px solid black`,
      fontFamily: "'Roboto Condensed', sans-serif",
    },
  }),
);

export const CustomDrawer = ({
  open,
  setDrawerVisibility,
}: CustomDrawerProps) => {
  return (
    <StyledDrawer
      onClose={() => setDrawerVisibility((prevState) => !prevState)}
      open={open}
    >
      <div>Список упражнений</div>
      <div>Статистика</div>
      <div>Программы тренировок</div>
      <div>Чонибуд ещё</div>
    </StyledDrawer>
  );
};
