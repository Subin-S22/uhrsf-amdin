import React, { useState } from "react";

export interface Store {
  data: {
    tableName: string;
    userDetails: any;
    title: string;
  };
  action: {
    setTableName: React.Dispatch<React.SetStateAction<string>>;
    setUserDetails: React.Dispatch<React.SetStateAction<{}>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
  };
}

export const Context = React.createContext<Store | null>(null);

const Provider = ({ children }) => {
  const [tableName, setTableName] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [title, setTitle] = useState("");
  const store = {
    data: {
      tableName,
      userDetails,
      title,
    },
    action: {
      setTableName,
      setUserDetails,
      setTitle,
    },
  };

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export default Provider;
