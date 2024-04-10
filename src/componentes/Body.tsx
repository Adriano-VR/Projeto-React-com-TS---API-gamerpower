import { ChangeEvent, useEffect, useState } from "react";
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
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';




dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export const Body = () => {
  const navigate = useNavigate();

  const [gamesDTO, setGamesDTO] = useState<GamesProps[]>([]);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
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

  function next() {
    setPage(page + 1);
  }

  function previous() {
    setPage(page - 1);
  }

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    setPage(1);
  }

  const filteredUsers = [...gamesDTO].filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  function whatsPlatform(pla: string) {
    let categoryValue = "";

    if (pla === "PC") {
      categoryValue = "pc";
    } else if (pla === "PS4") {
      categoryValue = "ps4";
    } else if (pla === "STEAM") {
      categoryValue = "steam";
    } else if (pla === "PS5") {
      categoryValue = "ps5";
    } else if (pla === "xbox") {
      categoryValue = "xbox-series-xs";
    } else if (pla === "android") {
      categoryValue = "android";
    }
    setSelectedCategory(categoryValue);
    setOpen(false)
  }

  function whatsFilter() {
    let sort = "";
    const drop: HTMLSelectElement = document.querySelector("#HeadlineAct")!;
    if (drop.value === "popularidade") {
      sort = "popularity";
    } else if (drop.value === "valor") {
      sort = "value";
    } else if (drop.value === "default") {
      setPage(1);
    }

    setSelectedSort(sort);
  }

  useEffect(() => {
    buildURL();
  }, [selectedSort, selectedCategory]);

  function buildURL() {
    let url = "https://gamerpower.p.rapidapi.com/api/giveaways";

    if (selectedSort.length > 0 && selectedCategory.length > 0) {
      url = `https://gamerpower.p.rapidapi.com/api/giveaways?platform=${selectedCategory}&sort-by=${selectedSort}`;
    } else if (selectedSort.length > 0 && selectedCategory.length === 0) {
      url = `https://gamerpower.p.rapidapi.com/api/giveaways?sort-by=${selectedSort}`;
    } else if (selectedSort.length === 0 && selectedCategory.length > 0) {
      url = `https://gamerpower.p.rapidapi.com/api/giveaways?platform=${selectedCategory}`;
    }

    fetchData(url);
  }

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    
    </Box>
  );

  
  return (
   
  
    
    <div className="flex flex-wrap gap-7 justify-center ">
        <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
      </Drawer>
      <header className="bg-zinc-800 w-full pb-5 flex justify-center border-b border-white/30 flex-col ">
  
        <div className="flex justify-between items-center">
          <div>
            <select
              onChange={whatsFilter}
              name="HeadlineAct"
              id="HeadlineAct"
              className="bg-transparent h-9 mt-1.5 w-full rounded-lg border-zinc-500 text-zinc-500 sm:text-sm"
            >
              <option value="default">Please select</option>
              <option value="popularidade">Popular</option>
              <option value="valor">Valor</option>
            </select>
          </div>

          <div className=" flex self-center text-lg font-bold gap-4 ">
            <h1
              className="tex-lg font-semibold cursor-pointer"
              onClick={() => whatsPlatform("PC")}
            >
              PC
            </h1>
            <h1
              className="tex-lg font-semibold cursor-pointer"
              onClick={() => whatsPlatform("PS4")}
            >
              PS4
            </h1>
            <h1
              className="tex-lg font-semibold cursor-pointer"
              onClick={() => whatsPlatform("STEAM")}
            >
              Steam
            </h1>
            <h1
              className="tex-lg font-semibold cursor-pointer"
              onClick={() => whatsPlatform("PS5")}
            >
              PS5
            </h1>
            <h1
              className="tex-lg font-semibold cursor-pointer"
              onClick={() => whatsPlatform("xbox")}
            >
              Xbox-Series-XS
            </h1>
            <h1
              className="tex-lg font-semibold cursor-pointer"
              onClick={() => whatsPlatform("android")}
            >
              Android
            </h1>
          </div>

          <div className="relative">
            <label htmlFor="Search" className="sr-only">
              Search
            </label>
            <input
              onChange={handleSearchInput}
              type="text"
              id="Search"
              placeholder="Search for..."
              className="h-9 rounded-md py-2.5 pe-10 bg-transparent text-zinc-100 shadow-sm sm:text-sm outline-none"
            />
            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
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
        </div>
      </header>

      {gamesDTO.length === 0 ? (
        <div className=" flex w-full h-full justify-center items-center">
          <LoaderCircle className="animate-spin size-10" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="flex w-full h-full font-bold justify-center items-center">
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
              <p className="truncate font-semibold">{game.platforms}</p>
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
          Mostrando {gamesDTO.length >= 15 ? 15 : gamesDTO.length} de{" "}
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
  );
};
