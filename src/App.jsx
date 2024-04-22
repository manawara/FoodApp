import { Outlet } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";
import Header from "./components/Header.jsx";
import Aside from "./components/Aside.jsx";
import { useState } from "react";
import "./index.css";
import ProtectedRouter from "./components/ProtectedRouter.jsx";
import { Navigate } from "react-router-dom";
import { ProjectContextProvider } from "./context/ProjectContext.jsx";
import MyPurpose from "./components/MyPurpose.jsx";

function App() {
  const [openAside, setOpenAside] = useState(false);
  const { user, userDetail } = UserAuth();
  const handleClickHamburger = () => {
    setOpenAside((prevState) => !prevState);
  };

  if (user) {
    return (
      <ProtectedRouter>
        <ProjectContextProvider>
          <Header onOpenAside={handleClickHamburger} />
          <main>
            <Aside open={openAside} />

            <div className="px-4 py-28 sm:ml-64 ">
              <MyPurpose /> <Outlet />
            </div>
          </main>
        </ProjectContextProvider>
      </ProtectedRouter>
    );
  } else {
    return <Navigate to="/" />;
  }
}

export default App;
