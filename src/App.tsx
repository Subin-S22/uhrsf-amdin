import HeaderCard from "./componets/molecules/HeaderCard";
import Laytout from "./componets/molecules/Laytout";
import SideBar from "./componets/molecules/SideBar";
import Table from "./componets/molecules/Table";
import BranchTable from "./componets/molecules/BranchesTable";

function App() {
  return (
    <Laytout>
      <section className="w-full">
        <section className="mt-6">
          <HeaderCard />
        </section>
        <section className="m-8">
          <Table title="Application Received" data={[]} />
          <Table title="Members Enrolled" data={[]} />
          <BranchTable title="Branches" data={[]} />
        </section>
      </section>
    </Laytout>
  );
}

export default App;
