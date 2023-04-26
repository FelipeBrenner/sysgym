import { getUsers } from "@database";
import { User } from "@types";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

export interface DatabaseContextValue {
  users: User[];
}

interface DatabaseProviderProps {
  children: ReactNode;
}

export const DatabaseContext = createContext<DatabaseContextValue>({
  users: [],
});

export const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };

    loadUsers();
  }, []);

  const value = useMemo(
    () => ({
      users,
    }),
    [users]
  );

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const DatabaseConsumer = DatabaseContext.Consumer;
