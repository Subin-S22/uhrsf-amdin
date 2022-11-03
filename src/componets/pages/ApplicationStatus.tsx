import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { getByStatus } from "../../services/admin";
import Laytout from "../molecules/Laytout";
import CustTable from "../molecules/Table";
import { Context } from "../../context";

type Props = {};

const ApplicationStatus = (props: Props) => {
  const [received, setReceived] = useState([]);
  const { status } = useParams();
  const context = useContext(Context);

  const fetchApplicationStatus = useCallback(async () => {
    try {
      if (status) {
        const res = await getByStatus(status);
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
          title={`${context?.data.tableName}`}
          search={true}
          data={received}
        />
      </div>
    </Laytout>
  );
};

export default ApplicationStatus;
