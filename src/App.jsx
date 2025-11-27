import { Outlet } from "react-router";
import Header from "./components/Header";
import MobileNavModal from "./components/MobileNavModal";

function App() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
