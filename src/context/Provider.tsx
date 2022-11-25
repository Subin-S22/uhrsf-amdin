import React, { useState } from "react";

export interface Store {
  data: {
    tableName: string;
    userDetails: any;
    title: string;
    branchDetails: any;
    branchCount: number;
  };
  action: {
    setTableName: React.Dispatch<React.SetStateAction<string>>;
    setUserDetails: React.Dispatch<React.SetStateAction<{}>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setBranchDetails: React.Dispatch<React.SetStateAction<{}>>;
    setBranchCount: React.Dispatch<React.SetStateAction<number>>;
  };
}

export const Context = React.createContext<Store | null>(null);

const Provider = ({ children }) => {
  const [tableName, setTableName] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [title, setTitle] = useState("");
  const [branchDetails, setBranchDetails] = useState({});
  const [branchCount, setBranchCount] = useState(0);

  const store = {
    data: {
      tableName,
      userDetails,
      title,
      branchDetails,
      branchCount,
    },
    action: {
      setTableName,
      setUserDetails,
      setTitle,
      setBranchDetails,
      setBranchCount,
    },
  };

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export default Provider;
