
import { useLocation, useNavigate } from 'react-router-dom';
import { GamesProps } from '../interface/interfaceGame';

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { SquareArrowLeft   } from 'lucide-react';
import { TitulosH1 } from './Titulos';
import Button from '@mui/material/Button';


dayjs.extend(relativeTime);
dayjs.locale("pt-br");





export const PageDetalhes = () => {
    // const { state } = useLocation();
    // const obj:GamesProps = state && state.key;

    const location = useLocation();
    const adr:GamesProps = location.state.key;
    const navigate = useNavigate();

  
  
    return (
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
           
              <p className='font-medium text-md p-5'>Publicacao: {dayjs().to(dayjs(adr.published_date))}</p>  

            </div>
           
        </div>
        </div>
        </div>
    )
}