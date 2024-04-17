import { get, ref, update } from "firebase/database";
import { database } from "../db/db";
import { Slide, toast } from "react-toastify";
import { GamesProps } from "../interface/interfaceGame";





// eslint-disable-next-line @typescript-eslint/ban-types
export function remover(game: GamesProps,recarregar?:boolean,setAddRemover?:Function) {
  const user = localStorage.getItem("user")!;
  const parsedUser = JSON.parse(user);
  const userId = parsedUser.id;
  if (userId) {
    try {
      const usuarioRef = ref(database, `usuarios/${userId}`);
      get(usuarioRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const usuario = snapshot.val();
            const favoritos = usuario.favoritos || [];
            const index = favoritos.indexOf(game.id);
            favoritos.splice(index, 1); // Remove o jogo dos favoritos
            if (setAddRemover) {
              setAddRemover(false); // Atualiza o estado de AddRemover
            }
            if(recarregar) window.location.reload();
            update(usuarioRef, { favoritos })
              .then(() => {
                toast.warn("Removido com Sucesso", {
                  position: "top-center",
                  autoClose: 2500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Slide,
                });

                
              })
              .catch((error) => {
                console.error(
                  "Erro ao atualizar os favoritos do usuário:",
                  error
                );
              });
          } else {
            console.log("Usuário não encontrado no banco de dados.");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar usuário no banco de dados:", error);
        });
    } catch (error) {
      console.error("Erro ao processar favorito:", error);
    }
  } else {
    console.log("ID do usuário não encontrado no armazenamento local.");
  }

}

// eslint-disable-next-line @typescript-eslint/ban-types
export function handleFavorite(game: GamesProps,setAddRemover?: Function) {

  const user = localStorage.getItem("user")!;
  const parsedUser = JSON.parse(user);
  const userId = parsedUser.id;
  if (userId) {
    try {
      const usuarioRef = ref(database, `usuarios/${userId}`);
      get(usuarioRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const usuario = snapshot.val();
            const favoritos = usuario.favoritos || [];

            if (!favoritos.includes(game.id)) {
              favoritos.push(game.id);
              if (setAddRemover) {
                setAddRemover(true); // Atualiza o estado de AddRemover
              }
            }

            update(usuarioRef, { favoritos })
              .then(() => {
                toast.info("Adicionado com Sucesso", {
                  position: "top-center",
                  autoClose: 2500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Slide,
                });
              })
              .catch((error) => {
                console.error(
                  "Erro ao atualizar os favoritos do usuário:",
                  error
                );
              });
          } else {
            console.log("Usuário não encontrado no banco de dados.");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar usuário no banco de dados:", error);
        });
    } catch (error) {
      console.error("Erro ao processar favorito:", error);
    }
  } else {
    console.log("ID do usuário não encontrado no armazenamento local.");
  }
}
