import { Link } from "react-router";

const pages = [
  {
    name: "Create Product",
    path: "/admin/create-product",
  },
];

function SideBar() {
  return (
    <>
      {pages.map((page, i) => (
        <div key={i} className="text-center">
          <Link to={page.path}>{page.name}</Link>
        </div>
      ))}
    </>
  );
}

export default SideBar;
