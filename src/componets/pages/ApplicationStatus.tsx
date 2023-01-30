import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { getByStatus, viewAllApplication } from "../../services/admin";
import Laytout from "../molecules/Laytout";
import CustTable from "../molecules/Table";
import { Context } from "../../context";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type Props = {};

const ApplicationStatus = (props: Props) => {
  const [received, setReceived] = useState([]);
  const { status } = useParams();
  const store = useContext(Context);

  const fetchApplicationStatus = useCallback(async () => {
    toast.dismiss();
    const loading = toast.loading("loading...");
    try {
      if (status === "view-all") {
        //get all applications
        const res = await viewAllApplication();
        setReceived(res.data.data);
      } else if (status) {
        let params: string = status;
        if (status === "members") {
          params = "approved";
        } else if (status === "disabled members") {
          params = "disable";
        }

        //get by status
        const res = await getByStatus(params);

        setReceived(res.data.data);
      }
      toast.update(loading, {
        render: "Successfull",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err: unknown) {
      if (typeof err === "string") toast.error(err);
      else if (err instanceof Error) toast.error(err.message);
      else if (err instanceof AxiosError) {
        toast.error(err.response?.statusText);
      }
    }
  }, [status]);

  useEffect(() => {
    fetchApplicationStatus();
  }, [fetchApplicationStatus, status]);

  return (
    <Laytout>
      <div className="m-4">
        <CustTable
          title={`${store?.data.tableName}`}
          search={true}
          data={received}
        />
      </div>
    </Laytout>
  );
};

export default ApplicationStatus;
