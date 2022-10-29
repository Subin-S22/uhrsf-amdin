import HeaderCard from "./componets/molecules/HeaderCard";
import Laytout from "./componets/molecules/Laytout";
import Table from "./componets/molecules/Table";
import BranchTable from "./componets/molecules/BranchesTable";
import TableDetails from "./componets/atoms/TableDetails";

const headCells = [
  {
    id: "uhrsfMemberId",
    numeric: false,
    disablePadding: false,
    label: "Application No",
  },
  {
    id: "firstAndLastName",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "state",
    numeric: false,
    disablePadding: false,
    label: "State",
  },
  {
    id: "city",
    numeric: false,
    disablePadding: false,
    label: "City",
  },
  {
    id: "dob",
    numeric: false,
    disablePadding: false,
    label: "DateTime",
  },
  {
    id: "view",
    numeric: false,
    disablePadding: false,
    label: "View",
  },
];

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
