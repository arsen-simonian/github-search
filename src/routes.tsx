import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { RepositoryList } from "./features/repository-list";
import RepositoryDetails from "./features/repository-details/ui/details";

const routs = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:'/:page?',
        element: <RepositoryList />
      },
      {
        path: '/details/:id',
        element: <RepositoryDetails />
      }
    ]
  },
]);

export default routs;