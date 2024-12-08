import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ExplorePage from "../pages/ExplorePage";
import DetailsPage from "../pages/DetailsPage";
import SearchPage from "../pages/SearchPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProfileEdit from "../pages/ProfileEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: (state) => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        return redirect("login");
      }
    },
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: ":explore",
        element: <ExplorePage />,
      },
      {
        path: ":explore/:id",
        element: <DetailsPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "edit",
        element: <ProfileEdit />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default router;
