import React, { useEffect, useState } from "react";
import { branchList } from "../../services/admin";
import Laytout from "../molecules/Laytout";
import CustTable from "../molecules/BranchesTable";

type Props = {};

const BranchPage = (props: Props) => {
  const [received, setReceived] = useState([]);

  const fetchApplicationReceived = async () => {
    try {
      const res = await branchList();
      setReceived(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchApplicationReceived();
  }, []);
  return (
    <Laytout>
      <div className="m-4">
        <CustTable title={"Branch List"} search={true} data={received} />
      </div>
    </Laytout>
  );
};

export default BranchPage;
