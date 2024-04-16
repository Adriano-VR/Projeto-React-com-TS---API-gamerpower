import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Body } from "../componentes/Body";
import { PageDetalhes } from "../componentes/PageDetalhes";
import { CategoryContextProvider } from "../context/contextCategory";
import { Login } from "../componentes/Login";
import CreateAccount, {  } from "../componentes/CreateAccount";
import { FavoriteGames } from "../componentes/FavoritesGames";



export const Routes = ()   => {

    const router = createBrowserRouter([
        {
          path: "/",
          element: <Body />,
        },
        {
            path: "/detalhes",
            element: <PageDetalhes />,
          },
          {
              path: "/login",
              element: <Login />,
            },  
            {
              path: "/create",
              element: <CreateAccount />,
            },
            {
              path: "/favoritos",
              element: <FavoriteGames />,
            }
        
      ]);

      return(
        <CategoryContextProvider>
        <RouterProvider router={router} />
        </CategoryContextProvider>

      )

}