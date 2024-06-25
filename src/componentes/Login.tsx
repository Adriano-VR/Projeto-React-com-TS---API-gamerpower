import { useContext, useState } from "react";
import { database } from "../db/db";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../context/contextCategory";
import { UserLogged } from "../interface/interfaceGame";
import { SquareArrowLeft } from "lucide-react";
import { Flip, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { get, ref } from "firebase/database";


export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  


  const { UserLogged } = useContext(CategoryContext);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const fazerLogin = async () => {
    try {
      const usuariosRef = ref(database, 'usuarios');
      const snapshot = await get(usuariosRef);
      if (snapshot.exists()) {
          
  
        const usuarios:UserLogged = snapshot.val();
       
       
        const usuario = Object.values(usuarios).find(user => user.username === username);
        if (usuario && usuario.senha === password) {
        
        
          const loggedUser: UserLogged = {
            id: usuario.id,
            name: usuario.username,
  
          };

       
          UserLogged(loggedUser);
          localStorage.setItem("user", JSON.stringify(loggedUser));
         
          toast.success("Login Bem Sucedido", {
            position: "top-center",
            autoClose: 2400,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Flip,
          });


          setTimeout(() => {
            navigate("/");
          }, 2500);

        } else {
          toast.error("Nome de usuário ou senha incorretos.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Flip,
          });
        }
      } else {
        toast.error("Nenhum usuário encontrado no banco de dados.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
   
  };

  return (
    <>
    <ToastContainer />
  
     
      <div className="flex flex-col  h-screen justify-center  items-center">
       
        <div className="shadow-inner p-5 flex flex-col gap-10  justify-center  py-12 rounded bg-black/40  w-3/5 ">
        <div className="grid grid-cols-4">
            <div>
            <SquareArrowLeft
              onClick={() => {
                navigate("/");
              }}
              size={40}
                className="cursor-pointer"
            /> 
            </div>
            <div className="col-span-2  justify-self-center ">
            <p className="text-2xl ">LOGIN</p>
            </div>
       
          </div>
          
        

          <label
            htmlFor="Username"
            className="relative block rounded-md  border border-gray-200 shadow-sm focus-within:border-blue-200 focus-within:ring-1 focus-within:ring-blue-200 "
          >
            <input
              onChange={handleUsernameChange}
              type="text"
              id="Username"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0   h-12"
              placeholder="Username"
            />

            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-transparent p-0.5 text-xs  text-blue-100 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              Username
            </span>
          </label>

          <label
            htmlFor="Password"
            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-200 focus-within:ring-1 focus-within:ring-blue-200 "
          >
            <input
              onChange={handlePasswordChange}
              type="password"
              id="password"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-12"
              placeholder="Password"
            />

            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-transparent p-0.5 text-xs text-blue-100 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              Password
            </span>
          </label>
          <button
            className="group relative inline-block overflow-hidden shadow-inner bg-black/40 px-8 py-3 focus:outline-none focus:ring "
            onClick={fazerLogin}
          >
            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-black/40 transition-all group-hover:h-full group-active:bg-indigo-500 "></span>

            <span className="relative text-lg font-medium text-blue-100 transition-colors group-hover:text-white ">
              Login
            </span>
          </button>
          <span
            className="underline text-center cursor-pointer "
            onClick={() => navigate("/create")}
          >
            Criar Conta
          </span>
        </div>
      </div>
    </>
  );
};
