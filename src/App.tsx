import React, { useState, useEffect } from "react";
import HeaderCard from "./componets/molecules/HeaderCard";
import Laytout from "./componets/molecules/Laytout";
import Table from "./componets/molecules/Table";
import BranchTable from "./componets/molecules/BranchesTable";
import { yetToApprove } from "./services/admin";

function App() {
  const [received, setReceived] = useState([]);
  const getYettoApprove = async () => {
    try {
      const res = await yetToApprove();
      console.log(res);

      setReceived(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getYettoApprove();
  }, []);
  return (
    <Laytout>
      <section className="w-full">
        <section className="mt-6">
          <HeaderCard />
        </section>
        <section className="m-8">
          <Table title="Application Received" data={received} />
          <Table title="Members Enrolled" data={[]} />
          <BranchTable title="Branches" data={[]} />
        </section>
      </section>
    </Laytout>
  );
}

export default App;
