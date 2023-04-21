import type { Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { SxProps } from "@mui/system";
import type { MutableRefObject } from "react";
import { forwardRef } from "react";
import SimpleBar, { Props as SimpleBarProps } from "simplebar-react";

interface ScrollbarProps extends SimpleBarProps {
  ref: MutableRefObject<SimpleBarProps>;
  sx?: SxProps<Theme>;
}

const ScrollbarRoot = styled(SimpleBar)``;

export const Scrollbar = forwardRef<
  MutableRefObject<SimpleBarProps>,
  ScrollbarProps
>((props, ref) => {
  return (
    <ScrollbarRoot
      // @ts-ignore
      ref={ref}
      {...props}
    />
  );
});
