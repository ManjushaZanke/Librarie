import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import App from "../App";
import Home from "../Home/home";
import Shop from "../Shop/shop";
import About from "../components/About";
import Blog from "../components/Blog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/shop',
        element: <Shop/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/blog',
        element: <Blog/>
      }
    ]
  },
]);

export default router;