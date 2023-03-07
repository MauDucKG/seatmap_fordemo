import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Admin from "./User/Admin";
import InitializationMap from "./Map/Initialization";
import ManageMap from "./Map/Manage";
import Home from "./Home";
import ManageUser from "./User/ManageUser";
import UpdatingPage from "./Map/Updating";
import { useState } from "react";
import NotFoundPage from "./NotFoundPage";
import { urlResource} from "./Shared/InternalServices";

const App = () => {
  const [isLogin, setisLogin] = useState(localStorage.getItem('token'));
  const handleLogin = () => {
    setisLogin(true);
  }

  const handleLogout = () => {
    setisLogin(false);
  }

  return (
    <>
      {!isLogin && <BrowserRouter>
        <Routes>
          <Route path={urlResource.LINK_TO_HOME_PAGE} element={<Home />} />
          <Route path={urlResource.LINK_TO_LOGIN_PAGE} element={<Login handleLogin={handleLogin} />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>}

      {!isLogin || <BrowserRouter>
        <Routes>
          <Route path={urlResource.LINK_TO_INIT_MAP_PAGE} element={<InitializationMap handleLogout={handleLogout}/>} />
          <Route path={urlResource.LINK_TO_MANAGE_MAP_PAGE} element={<ManageMap handleLogout={handleLogout}/>} />
          <Route path={urlResource.LINK_TO_MANAGE_USER_PAGE} element={<ManageUser handleLogout={handleLogout} />} />
          <Route path={urlResource.LINK_TO_UPDATING_MAP_PAGE} element={<UpdatingPage handleLogout={handleLogout} />} />
          <Route path={`*`} element={<Admin handleLogout={handleLogout} />} />
        </Routes>
      </BrowserRouter>}
    </>
  );
}
export default App;
