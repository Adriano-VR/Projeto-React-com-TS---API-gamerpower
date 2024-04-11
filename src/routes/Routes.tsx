import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Body } from "../componentes/Body";
import { PageDetalhes } from "../componentes/PageDetalhes";
import { CategoryContextProvider } from "../context/contextCategory";



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
        <CategoryContextProvider>
        <RouterProvider router={router} />
        </CategoryContextProvider>

      )

}