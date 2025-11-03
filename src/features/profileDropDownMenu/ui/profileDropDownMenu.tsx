import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  type MenuProps,
  styled,
} from "@mui/material";
import { type MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../entities/user/slice/userStore.ts";
import { logoutRequest } from "../../../shared/api/userApi.ts";

const StyledMenu = styled((props: MenuProps) => <Menu {...props} />)(({}) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    border: `1px solid black`,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      fontFamily: "'Roboto Condensed', sans-serif",
      whiteSpace: "normal",
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        marginRight: 4,
      },
    },
  },
}));

export const ProfileDropDownMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    logoutRequest(user.userName).finally(() => {
      useUserStore.getState().reset();
      localStorage.clear();
      window.location.reload();
    });
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar src="../../../no-img-avatar.png" />
      </Button>
      <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem disabled onClick={handleClose}>
          <ManageAccountsIcon />
          Профиль
          <br />
          (В разработке)
        </MenuItem>
        <MenuItem disabled onClick={handleClose}>
          <SettingsIcon />
          Настройки
          <br />
          (В разработке)
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/exercises/");
          }}
        >
          <NoteAltOutlinedIcon />
          Список упражнений
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/timer");
          }}
        >
          <TimerOutlinedIcon />
          Таймер
        </MenuItem>
        <MenuItem onClick={logout}>
          <LogoutIcon />
          Выйти
        </MenuItem>
      </StyledMenu>
    </div>
  );
};
