import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Icon from '../assets/Icon1.png';
const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [newState,setNewState] = React.useState(1);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{height:'100%'}} id={newState}>
      <Toolbar style={{background:"#007201",display:'flex',flexDirection:'column'}} >
        <div style={{width:"100%"}} onClick={()=>navigate('/')}>
            <img src={Icon} style={{width:"80px",cursor:'pointer'}}/>
        </div>
        <div style={{padding:'0px 10px 10px 0px',color:'white',cursor:'pointer'}} onClick={()=>navigate('/')}>
            <Typography style={{cursor:'pointer'}}>
                RDL Result
            </Typography>
            <Typography>
                rdlresultInfo@gmail.com
            </Typography>
        </div>
        </Toolbar>
      <List style={{background:'white'}}>
        {['RDL Delhi', 'RDL Mumbai', 'RDL Kolkata', 'RDL Haryana','Faridabad','Ghaziabad','Gali','Deshawar'].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={()=>{navigate('/result',
            
            {state:{id:index,title:text} })}} >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background:"#007201",
          boxShadow:1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container style={{width:"100%",display:'flex',flexDirection:'row'}}>
            <Grid xs={6} style={{display:'flex',alignItems:'center'}}>
                <Typography variant='h6' onClick={()=>navigate('/')} style={{cursor:'pointer'}}>
                    RDL Result
                </Typography>
            </Grid>
            <Grid xs={6} style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>  
                <img src={Icon} style={{width:"40px",cursor:'pointer'}} onClick={()=>setNewState((newState+1)%2)} />          
                <Typography>
                    Share
                </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box
        // component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' ,borderRight:'0px' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,borderRight:0,boxShadow:1 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
     
    </Box>
  );
}


export default ResponsiveDrawer;