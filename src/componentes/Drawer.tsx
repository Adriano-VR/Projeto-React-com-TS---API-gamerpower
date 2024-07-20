import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GamesIcon from "@mui/icons-material/Games";
import { CategoryContext } from "../context/contextCategory";
import ps from "../assets/playstation.png";
import steam from "../assets/logo-steam.png";
import xbox from "../assets/xbox.png";
import android from "../assets/android.png";
import pc from "../assets/pc.png";
import free from "../assets/controle-de-video-game.png";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import { Input } from "./input";
import poppins from "../assets/fonts/Poppins/Poppins-SemiBold.ttf";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import BasicMenu from "./Dashboard";
import { Icon } from '@iconify-icon/react';




export default function TemporaryDrawer() {
  
  const [open, setOpen] = React.useState(false);
  const { setSelectedCategory, loggedInUser } =
    React.useContext(CategoryContext);

  const navigate = useNavigate();

  const { UserLogged } = useContext(CategoryContext);


  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      const parsedUser = JSON.parse(userFromLocalStorage);
      UserLogged(parsedUser);
    
    } else {
      console.log("Sem Login no local");
    }
  }, []);


  const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
  };

  const handleItemClick = (text: string) => {
    if(text === 'all') navigate("/");
    setOpen(false);
    setSelectedCategory(text);
  };

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "all":
        return <GamesIcon color="info" className="size-6" />;
      case "pc":
        return <img src={pc} alt="" className="size-6" />;
      case "ps4":
        return <img src={ps} alt="" className="size-6" />;
      case "ps5":
        return <img src={ps} alt="" className="size-6" />;
      case "steam":
        return <img src={steam} alt="" className="size-6" />;
      case "xbox-series-xs":
        return <img src={xbox} alt="" className="size-6" />;
      case "android":
        return <img src={android} alt="" className="size-6" />;
      case "free games":
        return <img src={free} alt="" className="size-6 text-red" />;
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: "poppins, Arial",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
            @font-face {
              font-style: normal;
              font-display: swap;
              font-weight: 100;
              src: local('poppins'), local('poppins-Regular'), url(${poppins}) format('truetype');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
      },
    },
  });


  const DrawerList = (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: 300,
          backgroundColor: "rgb(0 0 0 / 0.8)",
          flex: 1,
          height: "100%",
        }}
        role="presentation"
      >
        <Input />
        <Divider />
        <List className="text-zinc-50">
          {[
            "ALL",
            "Free Games",
            "PC",
            "PS4",
            "PS5",
            "Steam",
            "Xbox-Series-XS",
            "Android",
          ].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => handleItemClick(text.toLowerCase())}
              >
                <ListItemIcon>{getIcon(text)}</ListItemIcon>

                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
            <Divider />

            {loggedInUser && (
                <List className="text-zinc-50">
                  <ListItem disablePadding>
                    <ListItemButton  onClick={() => navigate("/favoritos")}>
                    <ListItemIcon><Icon icon="mingcute:star-fill" style={{ fontSize: '30px',color:"gold" }} /></ListItemIcon>
                    <ListItemText primary={'Meus Favoritos'} />
                    </ListItemButton>
                  </ListItem>
                </List>
            )}

    
      </Box>
    </ThemeProvider>
  );

  <span className="cursor-pointer bg-green-500 text-zinc-100 items-center justify-center flex" onClick={() => navigate("/favoritos")}>
 
  </span>

  return (
    <div className="w-full ">
      <MenuIcon
        onClick={toggleDrawer(true)}
        fontSize="large"
        className="cursor-pointer text-left"
      />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}

        {loggedInUser ? (
            <>
          <div className="flex items-center bg-black/80 text-zinc-50 p-2">
            <Avatar sx={{ bgcolor: deepOrange[500], height: 60, width: 60 }}>
              {loggedInUser.name.charAt(0).toUpperCase()}
            </Avatar>
            <div className="flex flex-col items-center justify-center w-full">
              <p className="capitalize  text-zinc-50">Ola, {loggedInUser?.name + " !"}</p>


              <BasicMenu />
            </div>
          </div>
          </>
        ) : (
          

          <div className="flex items-center justify-center bg-zinc-800 cursor-pointer p-3"  >
            <button className="flex items-center text-zinc-50  justify-center gap-1 w-full " onClick={() => navigate("/login")}>
               <span className="tracking-widest font-poppins text-lg  font-semibold">Login</span> 
               <Icon icon="basil:login-solid"  style={{fontSize:'2em'}}/>

            </button>
          </div>
        )}
      </Drawer>
    </div>
  );
}
