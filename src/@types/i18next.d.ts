import { resources } from "i18n";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: typeof resources["en"];
  }
}

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}
