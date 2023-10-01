import React,{useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { convertTo12HourFormat , convertToDigit} from '../service/service';
import {useNavigate} from "react-router-dom"

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
      width: {sm:220,xs:150},
      height: {sm:200,xs:160}   
    }}>
    {
      img?.Url &&
        <CardMedia
        style={{zIndex:'20',position:'absolute', filter: `hue-rotate(30deg)`}}
        sx={{
         width: {sm:220,xs:150},
          height: {sm:200,xs:160}   
        }}
        image={img?.Url}
        title="green iguana"
      />
    }
    <CardContent style={{backgroundColor: "rgba(0, 0, 0, 0.4)",display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',zIndex:'200',position:'relative',color:'white'}}
      onClick={()=>{
        navigate('/result',{state:{
          title:data?.title,
          id:data?.id
        }
      })}}
    
    >
      <Typography  
      sx={{fontSize:{sm:'48px',xs:'36px'} }}    
      >
        {convertToDigit(values[values.length-2])}
      </Typography>
      <Typography sx={{fontSize:{sm:'20px',xs:'16px'}}}>
        {data?.title}
      </Typography>
      
      <Typography sx={{fontSize:{sm:'20px',xs:'16px'}}} >
      {convertTo12HourFormat(timeLists[timeLists.length-2])}
      </Typography>

      <Typography sx={{fontSize:{sm:'16px !important',xs:'13px !important'},padding:{sm:'0px 2px !important',xs:'0px !important',margin:"10px !important"}}} style={{background:"#FEC20f",color:'black',minWidth:146,textAlign:'center'}}>
        Next Result: {convertTo12HourFormat(timeLists[timeLists.length-1])}
      </Typography>
    </CardContent>
  </Card>
  )
}

export default DataCard;
