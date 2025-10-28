import type { CSSProperties } from "@mui/material";
import Button from "@mui/material/Button";
import type { MouseEventHandler, ReactNode } from "react";

interface CustomButtonProps {
  buttonHandler: (event?: MouseEventHandler<HTMLButtonElement>) => void;
  children?: ReactNode;
  classes?: CSSProperties;
}

export const CustomButton = ({
  buttonHandler,
  children,
  classes = {},
}: CustomButtonProps) => {
  return (
    <Button
      onClick={() => buttonHandler()}
      sx={[
        {
          color: "black",
          padding: "5px 5px",
          borderColor: "black",
          fontFamily: "'Roboto Condensed', sans-serif",
        },
        classes,
      ]}
      variant="outlined"
      size="large"
    >
      {children}
    </Button>
  );
};
