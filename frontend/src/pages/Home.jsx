import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import DataCard from '../components/DataCard';
import { Grid, Typography } from '@mui/material';
import ResponsiveDrawer from '../components/Drawer';
const Home = () => {

    const drawerWidth = 240;
    
    const images = [
        {
          Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one1.jpeg",
        },
        {
          Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one2.jpeg",
        },
        {
            Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one3.jpeg",
          },
          {
            Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one4.jpeg",
          },
          {
            Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one5.jpeg",
          },
          {
            Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one6.jpeg",
          },
          {
              Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one7.jpeg",
            },
            {
              Url: "https://rdlresults.s3.ap-south-1.amazonaws.com/one8.jpeg",
            },
    ];
    const [cardsData,setCardsData] = useState([]);
    const getCardData = async (date) => {
      const apiKey = process.env.REACT_APP_URL;
      axios.post(apiKey + "/getClientCurrentData", { date: date }).then((response) => {
          console.log("my cards data is",response?.data?.logs)
          setCardsData(response?.data?.logs)
      })
    }

    
    useEffect(()=>{
        const today = moment();
        getCardData(today.format('YYYY/MM/DD'));
    },[])

    useEffect(()=>{
      setInterval(()=>{
        const today = moment();
        getCardData(today.format('YYYY/MM/DD'));
      },40000)
    },[])
  return (
    <Grid container style={{minHeight:'100vh',background:"#007201"}}>
      <ResponsiveDrawer/>

      <Grid sx={{ ml: { md: `${drawerWidth}px`,sm:'0px' },minHeight:'100vh', width: { sm: `calc(100% - ${drawerWidth}px)`,xs:"100vw" } }} >
        <Grid sx={{marginTop:"80px",ml:{sm:4,xs:0},paddingX:{sm:4,xs:1} }}>
          <Typography
            variant="h6" // You can adjust the variant as needed
            sx={{
              fontSize:  {xs:'25px',sm:'40px'},
              color: 'white',
              textShadow: '1.5px 1px 5px yellow', // Use the textShadow property
            }}
        >
            Welcome to RDL Result...
          </Typography>
        </Grid>
        <Grid
          container
          style={{height:'100%'}}
          sx={{
            background:"#007201",
          }} 
        >
          {
              cardsData.length>0 && cardsData.map((data,index)=>{
                  return(
                      <Grid xs={6} md={4} lg={4} style={{marginTop:0,display:'flex',alignItems:'center',justifyContent:'center',}}>
                          <DataCard data={data} img={images[index]}/>
                      </Grid>
                  )
              })
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home;