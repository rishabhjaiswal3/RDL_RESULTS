import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import DataCard from '../components/DataCard';
import { Grid } from '@mui/material';
import one1 from '../assets/one1.jpeg';
import one2 from '../assets/one2.jpeg';
import one3 from '../assets/one3.jpeg';
import one4 from '../assets/one4.jpeg';
import one5 from '../assets/one5.jpeg';
import one6 from '../assets/one6.jpeg';
import one7 from '../assets/one7.jpeg';
import one8 from '../assets/one8.jpeg';

const Home = () => {

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
    const apiKey = process.env.REACT_APP_URL;
    const [cardsData,setCardsData] = useState([]);

    const getCardData = async (date) => {
        axios.post(apiKey + "/getClientCurrentData", { date: date }).then((response) => {
            console.log("my cards data is",response?.data?.logs)
            setCardsData(response?.data?.logs)
        })
    }

    useEffect(()=>{
        const today = moment();
        getCardData(today.format('YYYY/MM/DD'));
    },[])

  return (
        <Grid container style={{margin:'auto'}}>
            {
                cardsData.length>0 && cardsData.map((data,index)=>{
                    return(
                        <Grid xs={4} md={4} lg={4} style={{marginTop:16,display:'flex',alignItems:'center',justifyContent:'center',}}>
                            <DataCard data={data} img={images[index]}/>
                        </Grid>
                    )
                })
            }
        </Grid>
  )
}

export default Home;