import React, { useState, useEffect } from "react";
import HeaderCard from "./componets/molecules/HeaderCard";
import Laytout from "./componets/molecules/Laytout";
import Table from "./componets/molecules/Table";
import BranchTable from "./componets/molecules/BranchesTable";
import { branchList, getByStatus, yetToApprove } from "./services/admin";
import axios from "axios";

function App() {
  const [received, setReceived] = useState([]);
  const [members, setMembers] = useState([]);
  const [branches, setBranchList] = useState([]);
  const [branchCount, setBranchCount] = useState(0);

  const getYettoApprove = async () => {
    try {
      const res = await yetToApprove();

      setReceived(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMembers = async () => {
    try {
      const res = await getByStatus("member");

      setMembers(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getBranchList = async () => {
    try {
      const res = await branchList();
      setBranchCount(res.data.data.length);
      setBranchList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getYettoApprove();
    getBranchList();
    getMembers();
    getImage();
  }, []);

  const getImage = async () => {
    const data = await axios.get(
      "http://csnservernet.tech/uhrsf_dev/api/v1/uhrsf/files/UHRSFA0021/adharcard"
    );

    const b = new Blob(data.data, { type: "image/jpeg" });
    console.log(b);
  };

  return (
    <Laytout>
      <section className="w-full">
        <section className="mt-6">
          <HeaderCard
            applicationCount={received.length}
            branchCount={branchCount}
          />
        </section>
        <section className="m-8">
          <Table title="Application Received" data={received} />
          <Table title="Members" data={members} />
          <BranchTable title="Branches" data={branches} />
        </section>
      </section>
    </Laytout>
  );
}

export default App;
