import React, { useState } from "react";

export interface Store {
  data: {
    tableName: string;
    userDetails: {};
  };
  action: {
    setTableName: React.Dispatch<React.SetStateAction<string>>;
    setUserDetails: React.Dispatch<React.SetStateAction<{}>>;
  };
}

export const Context = React.createContext<Store | null>(null);

const Provider = ({ children }) => {
  const [tableName, setTableName] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const store = {
    data: {
      tableName,
      userDetails,
    },
    action: {
      setTableName,
      setUserDetails,
    },
  };

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export default Provider;
