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



  const DrawerList = (
    <Box sx={{ width: 300,backgroundColor:'rgb(63 63 70 )',height:'100%'}} role="presentation" >
      <Input />      
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
      <Divider />
    
    </Box>
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