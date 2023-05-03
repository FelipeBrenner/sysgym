import * as Styles from "./Logo.styles";

export const Logo = ({ ...other }) => (
  <Styles.Logo alt="SysGym logo" src="/static/logo.png" {...other} />
);
