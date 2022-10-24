import HeaderCard from "./componets/molecules/HeaderCard";
import Laytout from "./componets/molecules/Laytout";
import Table from "./componets/molecules/Table";

function App() {
  return (
    <Laytout>
      <section className="mt-6">
        <HeaderCard />
      </section>
      <section className="m-8">
        <Table title="Application Received" />
        <Table title="Members Enrolled" />
      </section>
    </Laytout>
  );
}

export default App;
