import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { yetToApprove } from "../../services/admin";
import Laytout from "../molecules/Laytout";
import CustTable from "../molecules/Table";

type Props = {};

const Application = (props: Props) => {
  const [received, setReceived] = useState([]);

  const fetchApplicationReceived = async () => {
    let loading;
    try {
      loading = toast.loading("loading...");
      const res = await yetToApprove();
      setReceived(res.data.data);
      toast.update(loading, {
        render: "Successfull",
        isLoading: false,
        type: "success",
      });
    } catch (err) {
      console.log(err);
      toast.update(loading, {
        render: "Failed",
        isLoading: false,
        type: "error",
      });
    }
  };
  useEffect(() => {
    fetchApplicationReceived();
  }, []);
  return (
    <Laytout>
      <div className="m-4">
        <CustTable
          title={"Application Received"}
          search={true}
          data={received}
        />
      </div>
    </Laytout>
  );
};

export default Application;
