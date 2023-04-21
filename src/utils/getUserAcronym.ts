export const getUserAcronym = (name?: string, email?: string) =>
  name
    ? `${name?.split(" ")[0]?.[0]?.toUpperCase()}${
        name?.split(" ")[1]?.[0]?.toUpperCase() ?? ""
      }`
    : email?.[0].toUpperCase();
