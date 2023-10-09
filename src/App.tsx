import { Outlet } from "react-router-dom";

import './sass/main.sass'
import NavBar from "./components/nav-bar"
import { SearchBarButton } from "./features/search-bar"
import { DialogsRoot } from "./features/dialogs-root/global";

function App() {  
  return (
    <>
      <div className="app">
        <NavBar>
          <SearchBarButton />
        </NavBar>
        <div className="app__content">
          <Outlet />
        </div>
      </div>
      <DialogsRoot />
    </>

  )
}

export default App
