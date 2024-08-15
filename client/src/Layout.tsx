import Header from "./Header";
import { Outlet } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
export default function Layout() {
  return (
    <main>
      <UserContextProvider>
        <Header />
      </UserContextProvider>
      <Outlet />
    </main>
  );
}
