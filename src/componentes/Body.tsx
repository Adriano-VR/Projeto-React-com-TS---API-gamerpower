import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  CircleArrowRight,
  CircleArrowLeft,
  Clock,
  LoaderCircle,
} from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { useNavigate } from "react-router-dom";
import { GamesProps } from "../interface/interfaceGame";
import { TitulosH1 } from "./Titulos";
import TemporaryDrawer from "./Drawer";
import { CategoryContext } from "../context/contextCategory";
import ErrorIcon from '@mui/icons-material/Error';
dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export const Body = () => {
  const navigate = useNavigate();

  const [gamesDTO, setGamesDTO] = useState<GamesProps[]>([]);
  const {next,previous,search,page,setPage,setSearch} = useContext(CategoryContext)

  const {selectedCategory,setSelectedCategory} = useContext(CategoryContext);
  const [selectedSort, setSelectedSort] = useState<string>("");

  const fetchData = async (url: string) => {
    const options = {
      method: "GET",
      url: url,

      headers: {
        "X-RapidAPI-Key": "7f5ed69f57msh56242f71d3966fbp11c1d2jsnd0c316423ce1",
        "X-RapidAPI-Host": "gamerpower.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setGamesDTO(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = Math.ceil(gamesDTO.length / 15);

  function teste(obj: GamesProps) {
    navigate("/detalhes", { state: { key: obj } });
  }

 
 

  const filteredUsers = [...gamesDTO].filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );


  function whatsFilter() {
    let sort = "";
    const drop: HTMLSelectElement = document.querySelector("#HeadlineAct")!;
    if (drop.value === "popularidade") {
      sort = "popularity";
    } else if (drop.value === "valor") {
      sort = "value";
    } else if(drop.value === 'data'){
      sort = "date"
    }
    
    else if (drop.value === "default") {
      setPage(1);
    }

    setSelectedSort(sort);
  }

  useEffect(() => {
    buildURL();
  }, [selectedSort, selectedCategory]);

  function buildURL() {
    let url = "https://gamerpower.p.rapidapi.com/api/giveaways";
    setSearch('')
    
    if(selectedCategory === 'all'){
      setSelectedCategory('')
    }
    else if (selectedSort.length > 0 && selectedCategory.length > 0) {
      url = `https://gamerpower.p.rapidapi.com/api/giveaways?platform=${selectedCategory}&sort-by=${selectedSort}`;
    } else if (selectedSort.length > 0 && selectedCategory.length === 0) {
      url = `https://gamerpower.p.rapidapi.com/api/giveaways?sort-by=${selectedSort}`;
    } else if (selectedSort.length === 0 && selectedCategory.length > 0) {
      url = `https://gamerpower.p.rapidapi.com/api/giveaways?platform=${selectedCategory}`;
    }

    fetchData(url);
  }




  return (
   <>
    <div className="flex justify-between items-center pb-5 px-1">
      <TemporaryDrawer />
      <div className="flex justify-end items-center w-64">
            <select
              onChange={whatsFilter}
              name="HeadlineAct"
              id="HeadlineAct"
              className="bg-transparent h-9 mt-1.5 w-full rounded-lg border-zinc-500 text-zinc-500 sm:text-sm"
            >
              <option value="default">Please select</option>
              <option value="data">Data</option>
              <option value="popularidade">Popular</option>
              <option value="valor">Valor</option>
            </select>
        </div>
      </div>
    
    <div className="flex flex-wrap gap-7 justify-center ">
    
      
    

      {gamesDTO.length === 0 ? (
        <div className=" flex w-full h-full justify-center items-center">
          <LoaderCircle className="animate-spin size-10" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="flex flex-col gap-3 w-full h-full font-bold justify-center items-center">
         <ErrorIcon fontSize="large" color="error" />
          <p>Nenhum resultado encontrado.</p>
        </div>
      ) : (
        gamesDTO
          .filter((game) =>
            game.title.toLowerCase().includes(search.toLowerCase())
          )
          .slice((page - 1) * 15, page * 15)
          .map((game) => (
            <div
              onClick={() => teste(game)}
              className="h-full w-56 bg-zinc-700 rounded-md text-center shadow-md cursor-pointer hover:scale-105 transition duration-300 overflow-hidden whitespace-nowrap"
              key={game.id}
            >
              <img className="w-full h-28" src={game.thumbnail} alt="" />
              <TitulosH1>{game.title}</TitulosH1>
              <p className=" px-6 truncate font-semibold">{game.platforms}</p>
              <div className="flex items-center justify-center gap-3 my-5">
                <strong className="border border-green-800 p-0.5 text-sm rounded bg-green-800 tracking-widest">
                  FREE
                </strong>
                <p className="line-through font-medium">{game.worth}</p>
              </div>
              <div className="flex justify-center items-center gap-1 pb-3">
                <Clock className="text-red-600 size-5" />
                <p className="capitalize text-sm font-bold">
                  {dayjs().from(dayjs(game.end_date), true)}
                </p>
              </div>
            </div>
          ))
      )}
      <div className="flex justify-between w-full px-5">
        <p className="tex-md font-medium">
          Itens 
          {gamesDTO.length}
        </p>
        <div className="flex gap-2">
          <button disabled={page === 1}>
            <CircleArrowLeft
              onClick={previous}
              className="cursor-pointer size-8"
            />
          </button>
          <button disabled={page === totalPages}>
            <CircleArrowRight
              onClick={next}
              className="cursor-pointer size-8"
            />
          </button>
        </div>
      </div>
    </div>
    </>
  );
};
