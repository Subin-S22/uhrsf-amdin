import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { getByStatus, viewAllApplication } from "../../services/admin";
import Laytout from "../molecules/Laytout";
import CustTable from "../molecules/Table";
import { Context } from "../../context";

type Props = {};

const ApplicationStatus = (props: Props) => {
  const [received, setReceived] = useState([]);
  const { status } = useParams();
  const store = useContext(Context);

  const fetchApplicationStatus = useCallback(async () => {
    try {
      if (status === "view-all") {
        const res = await viewAllApplication();
        console.log(res.data);
        setReceived(res.data.data);
      } else if (status) {
        let params: string = status;
        if (status === "members") {
          params = "approved";
        } else if (status === "disabled members") {
          params = "disable";
        }

        const res = await getByStatus(params);
        console.log(res.data.data);

        setReceived(res.data.data);
      }
    } catch (err) {
      console.log(err);
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
