import { Outlet } from "react-router-dom";
import Header from "../components/Header";
export default function DefaultLayout() {
  return (
    <>
      <Header></Header>
      <main className="container py-3">
        <Outlet></Outlet>
      </main>
    </>
  );
}
