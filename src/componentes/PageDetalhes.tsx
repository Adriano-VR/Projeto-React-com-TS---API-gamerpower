
import { useLocation, useNavigate } from 'react-router-dom';
import { GamesProps } from '../interface/interfaceGame';

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { SquareArrowLeft   } from 'lucide-react';
import { TitulosH1 } from './Titulos';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { ref, get, update } from 'firebase/database';
import { CategoryContext } from '../context/contextCategory';
import { database } from '../db/db';
import {  Slide, ToastContainer, toast } from 'react-toastify';


dayjs.extend(relativeTime);
dayjs.locale("pt-br");



export const PageDetalhes = () => {
    // const { state } = useLocation();
    // const obj:GamesProps = state && state.key;

    const location = useLocation();
    const adr:GamesProps = location.state.key;
    const navigate = useNavigate();
    const [fifa,setFifa]  = useState(false) 


    const {loggedInUser} = useContext(CategoryContext);

    
    function handleFavorite(game: GamesProps) {
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
                  setFifa(true); // Defina fifa como verdadeiro quando o jogo é adicionado aos favoritos
                } 
                
            
                update(usuarioRef, { favoritos })
                  .then(() => {
                    toast.info('Adicionado com Sucesso', {
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
                    console.error('Erro ao atualizar os favoritos do usuário:', error);
                  });
              } else {
                console.log('Usuário não encontrado no banco de dados.');
              }
            })
            .catch((error) => {
              console.error('Erro ao buscar usuário no banco de dados:', error);
            });
        } catch (error) {
          console.error('Erro ao processar favorito:', error);
        }
      } else {
        console.log('ID do usuário não encontrado no armazenamento local.');
      }
    }

    function remover() {
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
                const index = favoritos.indexOf(adr.id);
                favoritos.splice(index, 1); // Remove o jogo dos favoritos
                setFifa(false); // Atualiza o estado de fifa
                update(usuarioRef, { favoritos })
                  .then(() => {
                 
                    toast.warn('Removido com Sucesso', {
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
                    console.error('Erro ao atualizar os favoritos do usuário:', error);
                  });
              } else {
                console.log('Usuário não encontrado no banco de dados.');
              }
            })
            .catch((error) => {
              console.error('Erro ao buscar usuário no banco de dados:', error);
            });
        } catch (error) {
          console.error('Erro ao processar favorito:', error);
        }
      } else {
        console.log('ID do usuário não encontrado no armazenamento local.');
      }
    }
    
    useEffect(() => {
      const user = localStorage.getItem('user');
      if (user) {
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
                  setFifa(favoritos.includes(adr.id)); // Define o estado de fifa com base na existência do jogo nos favoritos
                } else {
                  console.log('Usuário não encontrado no banco de dados.');
                }
              })
              .catch((error) => {
                console.error('Erro ao buscar usuário no banco de dados:', error);
              });
          } catch (error) {
            console.error('Erro ao processar favorito:', error);
          }
        } else {
          console.log('ID do usuário não encontrado no armazenamento local.');
        }
      }
    }, [adr.id]); 
    
 

  
    return (
      <>
          <ToastContainer />
      <div className=' flex flex-col items-center justify-center h-screen'>
        <div className='flex flex-col w-10/12 '>
          <SquareArrowLeft   onClick={() => {
            document.title = 'GAMES'
            navigate("/")}} className=' mb-2 cursor-pointer size-10' />

            <div className='  border border-zinc-900 shadow-lg shadow-zinc-900  '>
            
            <div className='flex flex-col '>
            <img src={adr.image} alt="" className=' h-96 w-full' />
        
            <TitulosH1 detalhes>
            {adr.title}
            </TitulosH1>
              <p className='font-semibold text-lg text-center tracking-widest'>{adr.platforms}</p>
            
              <p className='font-medium text-md p-5 tracking-wide'>{adr.description}</p>  
             
             
              <p className='font-medium text-md p-5 tracking-wide'>{adr.instructions}</p>  
              <Button variant="contained" color='info' disableElevation>
              <a className='p-2 text-base text-zinc-900  text-center font-poppins tracking-widest ' target='_blank' href={adr.open_giveaway}>Acessar</a>
           
              </Button>
              {loggedInUser ? (
              <div className="mt-5" >
                {fifa ? <button onClick={remover}>remover</button> : <button className='bg-green-400' onClick={() => handleFavorite(adr)}>Add Favoritos</button>  }
              </div>
            ) : <span>Entre para adicionar aos favoritos</span>}             
            
              <p className='font-medium text-md p-5'>Publicacao: {dayjs().to(dayjs(adr.published_date))}</p>  

            </div>
           
        </div>
        </div>
        </div>
        </>

    )
}