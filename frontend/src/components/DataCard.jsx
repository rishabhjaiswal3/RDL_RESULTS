import React,{useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const DataCard = ({data,img}) => {

  const [timeLists,setTimeLists] = useState(['##','##']);  
  const [values,setValues ] = useState(['##','##'])

  useEffect(()=>{
    setTimeLists(data?.timesList);
    setValues(data?.values);
  },[data])


  return (
    <Card sx={{ width: 290,height:230 }}>
    {
      img?.Url &&
        <CardMedia
        style={{ maxWidth: '100%',minWidth:290,height:230,zIndex:'20',position:'absolute', filter: `hue-rotate(30deg)`}}
        image={img?.Url}
        title="green iguana"
      />
    }
    <CardContent style={{background:'transparent',zIndex:'200',position:'relative',color:'white'}}>
      <Typography gutterBottom variant="h5" component="div">
        {data?.title}
      </Typography>
      <Typography style={{fontSize:"46px"}}>
      {values[values.length-2]}
      </Typography>
      <Typography variant="body2" >
      {timeLists[timeLists.length-2]}
      </Typography>

      <Typography>
      {timeLists[timeLists.length-1]} : {values[values.length-1]}
      </Typography>
    </CardContent>
  </Card>
  )
}

export default DataCard