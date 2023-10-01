import React,{useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { convertTo12HourFormat , convertToDigit} from '../service/service';
import {useNavigate} from "react-router-dom"
import { Grid } from '@mui/material';
const DataCard = ({data,img}) => {

  const navigate = useNavigate();
  const [timeLists,setTimeLists] = useState(['##','##']);  
  const [values,setValues ] = useState(['##','##'])

  useEffect(()=>{
    setTimeLists(data?.timesList);
    setValues(data?.values);
  },[data])


  return (
    <Card sx={{ 
      width: {sm:220,xs:158},
      height: {sm:200,xs:130}   
    }}>
    {
      img?.Url &&
        <CardMedia
        style={{zIndex:'20',position:'absolute', filter: `hue-rotate(30deg)`}}
        sx={{
         width: {sm:220,xs:158},
          height: {sm:200,xs:130}   
        }}
        image={img?.Url}
        title="green iguana"
      />
    }
    <CardContent sx={{
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',zIndex:'200',position:'relative',color:'white',height:{xs:'80px'}}}
      onClick={()=>{
        navigate('/result',{state:{
          title:data?.title,
          id:data?.id
        }
      })}}
    
    >
      <Grid style={{maxHeight:{xs:'60px',sm:'80px'},marginTop:{xs:'0px',sm:'60px'} }}>
        <Typography  
        sx={{fontSize:{sm:'68px',xs:'55px'},marginTop:{xs:'6px',sm:'60px'},height:{xs:'70px',sm:'90px'}}}
        >
          {convertToDigit(values[values.length-2])}
        </Typography>
      </Grid>
      <Typography sx={{fontSize:{sm:'20px',xs:'16px'}}}>
        {data?.title}
      </Typography>
      
      <Typography sx={{fontSize:{sm:'20px',xs:'16px'}}} >
      {convertTo12HourFormat(timeLists[timeLists.length-2])}
      </Typography>
      <Typography sx={{fontSize:{sm:'16px !important',xs:'13px !important'},padding:{sm:'0px 2px !important',xs:'0px !important',margin:"0px 10px !important"}}} style={{background:"#FEC20f",color:'black',minWidth:146,textAlign:'center'}}>
        Next Result: {convertTo12HourFormat(timeLists[timeLists.length-1])}
      </Typography>
    </CardContent>
    </Card>
  )
}

export default DataCard;
