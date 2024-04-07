import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Body } from "../componentes/Body";
import { PageDetalhes } from "../componentes/PageDetalhes";



export const Routes = ()   => {

    const router = createBrowserRouter([
        {
          path: "/",
          element: <Body />,
        },
        {
            path: "/detalhes",
            element: <PageDetalhes />,
          }
        
      ]);

      return(
        
        <RouterProvider router={router} />
      )

}