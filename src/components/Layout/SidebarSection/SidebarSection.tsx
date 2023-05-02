import type { ListProps } from "@mui/material";
import { List } from "@mui/material";
import type { ReactNode } from "react";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import * as Styles from "./SidebarSection.styles";

interface Item {
  path?: string;
  icon?: ReactNode;
  chip?: ReactNode;
  info?: ReactNode;
  children?: Item[];
  title: string;
}

interface SidebarSectionProps extends ListProps {
  items: Item[];
  path: string;
  title: string;
}

const renderNavItems = ({
  depth = 0,
  items,
  path,
}: {
  depth?: number;
  items: Item[];
  path: string;
}): JSX.Element => (
  <List disablePadding>
    {items.reduce(
      (acc: JSX.Element[], item) =>
        reduceChildRoutes({ acc, depth, item, path }),
      []
    )}
  </List>
);

const reduceChildRoutes = ({
  acc,
  depth,
  item,
  path,
}: {
  acc: JSX.Element[];
  depth: number;
  item: Item;
  path: string;
}): Array<JSX.Element> => {
  const key = `${item.title}-${depth}`;
  const partialMatch = item.path ? path.includes(item.path) : false;
  const exactMatch = path.split("?")[0] === item.path; // We don't compare query params

  if (item.children) {
    acc.push(
      <SidebarItem
        active={partialMatch}
        chip={item.chip}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={partialMatch}
        path={item.path}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          items: item.children,
          path,
        })}
      </SidebarItem>
    );
  } else {
    acc.push(
      <SidebarItem
        active={exactMatch}
        chip={item.chip}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        path={item.path}
        title={item.title}
      />
    );
  }

  return acc;
};

export const SidebarSection = ({
  items,
  path,
  title,
  ...other
}: SidebarSectionProps) => (
  <List
    subheader={
      <Styles.ListSubheader disableGutters disableSticky>
        {title}
      </Styles.ListSubheader>
    }
    {...other}
  >
    {renderNavItems({
      items,
      path,
    })}
  </List>
);
