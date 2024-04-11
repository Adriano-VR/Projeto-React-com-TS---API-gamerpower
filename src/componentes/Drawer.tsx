import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GamesIcon from '@mui/icons-material/Games';
import { CategoryContext } from '../context/contextCategory';
import ps from "../assets/playstation.png"
import steam from "../assets/logo-steam.png"
import xbox from "../assets/xbox.png"
import android from "../assets/android.png"
import pc from "../assets/pc.png"
import MenuIcon from '@mui/icons-material/Menu';
import { Input } from './input';

import poppins from '../assets/fonts/Poppins/Poppins-SemiBold.ttf';
import { ThemeProvider, createTheme } from '@mui/material/styles';




export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const {setSelectedCategory} = React.useContext(CategoryContext)


  



  

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };



  const  handleItemClick = (text:string) => {
    setOpen(false)
    setSelectedCategory(text)
  
    }

    const getIcon = (category: string) => {
      switch (category.toLowerCase()) {
        case 'all':
          return <GamesIcon color='info' className='size-6' />;
        case 'pc':
          return <img src={pc} alt="" className='size-6' />
        case 'ps4':
         return <img src={ps} alt="" className='size-6' />
        case 'ps5':
          return <img src={ps} alt="" className='size-6' />
         case 'steam':
          return <img src={steam} alt="" className='size-6' />
        case 'xbox-series-xs':
          return <img src={xbox} alt="" className='size-6' />
        case 'android':
          return <img src={android} alt="" className='size-6' />
      
      }
    };


    const theme = createTheme({
      typography: {
        fontFamily: 'poppins, Arial',
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

    <Box sx={{ width: 300,backgroundColor:'rgb(63 63 70 )',height:'100%'}} role="presentation" >
      <Input />      
      <Divider />
      <List className='text-white'>
        {['ALL','PC', 'PS4', 'PS5', 'Steam','Xbox-Series-XS','Android'].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleItemClick(text.toLowerCase())}>
              <ListItemIcon >
                {getIcon(text)}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    
    
    </Box>
    </ThemeProvider>
  );

  return (
    
    <div className='w-full '>
      <MenuIcon onClick={toggleDrawer(true)} fontSize='large' className='cursor-pointer text-left' />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}