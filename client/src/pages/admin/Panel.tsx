import { Outlet } from "react-router";
import SideBar from "./Sidebar";

function Panel() {
  return (
    <main className="grid grid-cols-10 my-15 mx-auto max-w-7xl">
      <section className="col-span-2">
        <SideBar />
      </section>
      <section className="col-span-8">
        <Outlet />
      </section>
    </main>
  );
}

export default Panel;
