import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { CircleArrowRight, CircleArrowLeft, Clock } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { useNavigate } from "react-router-dom";

import { GamesProps } from "../interface/interfaceGame";
import { TitulosH1  } from "./Titulos";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export const Body = () => {
  const navigate = useNavigate();

  const [gamesDTO, setGamesDTO] = useState<GamesProps[]>([]);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const options = {
      method: "GET",
      url: "https://gamerpower.p.rapidapi.com/api/giveaways",

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

  function next() {
    setPage(page + 1);
  }

  function previous() {
    setPage(page - 1);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    setPage(1);
  }

  const filteredUsers = gamesDTO.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  function teste(obj: GamesProps) {
    navigate("/detalhes", { state: { key: obj } });
  }

  return (
    <div className="flex flex-wrap gap-7 justify-center ">
      <header className="bg-zinc-800  w-full pb-5  flex justify-between items-center  border-b border-white/30">
        <h1 className="text-2xl md:text-3xl pl-2 my-2   font-sans font-bold border-teal-400 tracking-wider	 dark:text-gray-200">
          ADRIANO
        </h1>
        <div className="relative">
          <label htmlFor="Search" className="sr-only">
            {" "}
            Search{" "}
          </label>

          <input
          onChange={handleSearchInput}
            type="text"
            id="Search"
            placeholder="Search for..."
            className="w-full rounded-md py-2.5 pe-10 bg-transparent text-zinc-100 shadow-sm sm:text-sm outline-none"
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">Search</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
      </header>

      {filteredUsers.slice((page - 1) * 15, page * 15).map((game) => (
        <div
          onClick={() => teste(game)}
          className=" h-full w-56 bg-zinc-700  rounded-md text-center shadow-xl cursor-pointer hover:scale-105 transition duration-300  overflow-hidden whitespace-nowrap "
          key={game.id}
        >
          <img className="w-full" src={game.thumbnail} alt="" />
          <TitulosH1>
            {game.title}
          </TitulosH1>

          
          <p className="truncate font-semibold ">{game.platforms}</p>
          <div className="flex items-center justify-center gap-3 my-5 ">
            <strong className="border border-green-800 p-0.5 text-sm rounded bg-green-800 tracking-widest">
              FREE
            </strong>
            <p className="line-through font-medium	">{game.worth}</p>
          </div>

          <div className="flex  justify-center items-center gap-1 pb-3">
            <Clock className="text-red-600 size-5" />
            <p className=" capitalize text-sm font-bold">
              {dayjs().from(dayjs(game.end_date), true)}
            </p>
          </div>
        </div>
      ))}

      <div className="flex justify-center w-full px-2">
        <div className="flex  gap-2  ">
          <button disabled={page === 1}>
            <CircleArrowLeft
              onClick={previous}
              className="cursor-pointer  size-8"
            />
          </button>

          <button disabled={page === totalPages}>
            <CircleArrowRight
              onClick={next}
              className="cursor-pointer  size-8"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
