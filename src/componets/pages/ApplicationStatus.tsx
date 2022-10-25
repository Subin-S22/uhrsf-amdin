import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getByStatus } from "../../services/admin";
import Laytout from "../molecules/Laytout";
import CustTable from "../molecules/Table";

type Props = {};

const ApplicationStatus = (props: Props) => {
  const [received, setReceived] = useState([]);
  const location = useLocation();
  const { pathname } = location;
  const status = pathname.split("/")[2];

  const fetchApplicationStatus = useCallback(async () => {
    try {
      const res = await getByStatus(status);
      setReceived(res.data.data);
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
          title={`Application ${status}`}
          search={true}
          data={received}
        />
      </div>
    </Laytout>
  );
};

export default ApplicationStatus;
