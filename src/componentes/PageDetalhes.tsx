
import { useLocation, useNavigate } from 'react-router-dom';
import { GamesProps } from '../interface/interfaceGame';

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { SquareArrowLeft   } from 'lucide-react';
import { TitulosH1 } from './Titulos';
import Button from '@mui/material/Button';
import { useContext, useEffect } from 'react';
import { ref, get} from 'firebase/database';
import { CategoryContext } from '../context/contextCategory';
import { database } from '../db/db';
import {  ToastContainer } from 'react-toastify';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { handleFavorite, remover } from '../utils/Funcoes';
import { AddRemoverContext } from '../context/AddRemover';


dayjs.extend(relativeTime);
dayjs.locale("pt-br");



export const PageDetalhes = () => {
    // const { state } = useLocation();
    // const obj:GamesProps = state && state.key;

    const location = useLocation();
    const adr:GamesProps = location.state.key;
    const navigate = useNavigate();


    const {loggedInUser} = useContext(CategoryContext);

    
    const {AddRemover ,setAddRemover} = useContext(AddRemoverContext);

   
    
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
                  setAddRemover(favoritos.includes(adr.id)); 
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
       

            <div className=' relative shadow-lg shadow-monochrome-borda rounded-lg'>
            <SquareArrowLeft   onClick={() => {
            document.title = 'GAMES'
            navigate("/")}} className='absolute top-3 left-3 mb-2 cursor-pointer size-10' />
            <div className='flex flex-col '>
            <img src={adr.image} alt="" className=' h-96 w-full' />
        
            <TitulosH1 detalhes>
            {adr.title}
            </TitulosH1>
              <p className='font-semibold text-lg text-center tracking-widest'>{adr.platforms}</p>
            
              <p className='font-medium text-md p-5 tracking-wide'>{adr.description}</p>  
             
             
              <p className='font-medium text-md p-5 tracking-wide'>{adr.instructions}</p>  
              <Button variant="contained" disableElevation >
              <a className='p-2 text-base   text-center font-poppins tracking-widest' target='_blank' href={adr.open_giveaway}>Acessar</a>
           
              </Button>
              {loggedInUser ? (
              <div className="mt-5 flex items-center justify-center" >
                {AddRemover ?
                
                // <button onClick={remover}>remover</button>
                  <button  onClick={() => remover(adr,setAddRemover)} className='p-2 text-base text-red-500  text-center font-poppins tracking-widest flex items-center gap-2 '>
                  <Icon icon="gg:remove-r"   style={{fontSize:'20px'}}  />
                    <span>Remover</span> 
                  </button>

                : 
                <button onClick={() => handleFavorite(adr,setAddRemover)} className='p-2 text-base text-green-600  text-center font-poppins tracking-widest flex items-center gap-2'>
                <Icon icon="icon-park-outline:add"  style={{fontSize:'20px'}}  />
                
                   <span>Favoritar</span>
                  </button>

              //  <button className='bg-green-400' onClick={() => handleFavorite(adr)}>Add Favoritos</button>  
              }
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