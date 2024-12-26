import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
import CryptoHome from "./Pages/CryptoHome";
import ViewCryptoInformation from "./Pages/ViewCryptoInformation";
import NotFound from "./ErrorPage/NotFound";
import About from "./Pages/About";
import Learn from "./Pages/Learn";
import Exchanges from "./Pages/Exchanges";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/cryptolist" />,
      },

      {
        path: "/cryptolist",
        element: <CryptoHome />,
      },

      {
        path: "/viewcrypto",
        element: <ViewCryptoInformation />,
      },

      {
        path: "/about",
        element: <About />,
      },

      {
        path: '/learn',
        element: <Learn/>
      },

      {
        path: '/learn/:sectionID/:subSectionName',
        element: <Learn/>
      },
      
      {
        path: '/exchanges',
        element: <Exchanges/>
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
