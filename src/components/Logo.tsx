import { styled } from "@mui/material/styles";
import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

type Variant = "light" | "primary";

type LogoProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  variant?: Variant;
};

export const Logo = styled(({ variant, ...other }: LogoProps) => {
  return (
    <img
      alt="SysGym logo"
      src="/static/logo.png"
      height={60}
      width={60}
      {...other}
    />
  );
})``;
