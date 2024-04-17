import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Body } from "../componentes/Body";
import { PageDetalhes } from "../componentes/PageDetalhes";
import { CategoryContextProvider } from "../context/contextCategory";
import { Login } from "../componentes/Login";
import CreateAccount, {  } from "../componentes/CreateAccount";
import { FavoriteGames } from "../componentes/FavoritesGames";
import { AddRemoverProviderProps } from "../context/AddRemover";



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
        <AddRemoverProviderProps>
        <CategoryContextProvider>
        <RouterProvider router={router} />
        </CategoryContextProvider>
        </AddRemoverProviderProps>

      )

}