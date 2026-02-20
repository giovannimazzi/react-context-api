import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function DefaultLayout() {
  return (
    <>
      <NavBar />
      <div className="container p-5 text-center">
        <Outlet />
      </div>
    </>
  );
}
