import React, { useEffect, useState } from "react";
import { branchList } from "../../services/admin";
import Laytout from "../molecules/Laytout";
import CustTable from "../molecules/BranchesTable";
import { toast } from "react-toastify";

type Props = {};

const BranchPage = (props: Props) => {
  const [received, setReceived] = useState([]);

  const fetchApplicationReceived = async () => {
    try {
      toast.dismiss();
      const loading = toast.loading("loading...");
      const res = await branchList();

      toast.update(loading, {
        render: "Loaded",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
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
