import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment';
import DataCard from '../components/DataCard';
import dayjs from 'dayjs';
import { Grid, Typography } from '@mui/material';
import ResponsiveDrawer from '../components/Drawer';
import { convertTo12HourFormat ,convertToDigit } from '../service/service';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import '../style/table.css'

const Table = () => {

  const location = useLocation();
  const drawerWidth = 240;
  const [pageInfo,setPageInfo]= useState({});
  const [data,setData] = useState([]);
  const [currentDate,setCurrentDate] = useState('')

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDivClick = () => {
    setIsDatePickerOpen(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false); 
  };

  useEffect(()=>{
    setPageInfo(location?.state);
  },[])




  useEffect(()=>{
    const getCardData = () => {
      const apiKey = process.env.REACT_APP_URL;
      let currentDate = selectedDate.format('YYYY/MM/DD');
        axios
          .post(apiKey + "/getClientSideData", { date: currentDate})
          .then((response) => {

            let finalData = response?.data?.logs;
            finalData.forEach((final)=>{
              final.timesList = final.timesList.reverse();
              final.values = final.values.reverse();
            })          
            console.log('my final data is',finalData)
            setData(finalData)
          });
    }
    if(selectedDate){
      getCardData();
      setInterval(()=>{
        getCardData();
      },40000)
    }
  },[selectedDate])



  return (
    <Grid container style={{background:"#FEC20f"}}>
      <ResponsiveDrawer/>
        <Grid
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)`,xs:"100vw" },
            ml: { md: `${drawerWidth}px`,sm:'0px' },
            background:"#FEC20f",
            minHeight:'100vh'
          }}
        >
        <Grid container sx={{mt:'70px'}}>
          <Grid xs={6} sx={{display:'flex',alignItems:'center',justifyContent:{xs:'',sm:'center'}}}>
            <Typography sx={{fontSize:'24px',color:"#007201",fontWeight:800,ml:{xs:2,sm:0}}}>{pageInfo?.title ??'##'}</Typography>
          </Grid>
          <Grid xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div onClick={handleDivClick} style={{background:"#007201",color:"white",padding:'8px'}}>
              {selectedDate.format('DD/MM/YYYY')}
            </div>
            {
              <div style={{display:'none'}}> 
                <LocalizationProvider dateAdapter={AdapterDayjs} sx={{display:'none'}}>
                  {<MobileDatePicker
                    open={isDatePickerOpen}
                    value={selectedDate}
                    onChange={handleDateChange}
                    minDate={dayjs('2022-05-01')}
                    maxDate={dayjs()}
                    format="DD/MM/YYYY"
                     // Custom toolbar to hide Cancel and OK buttons
                    renderInput={(props) => (
                      <div>
                        <input {...props.inputProps} />
                      </div>
                    )}
                  />}
                </LocalizationProvider>
              </div>
            }
            {/* <div>
              <div onClick={}>
                {currentDate}
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker defaultValue={dayjs(currentDate)} format="DD/MM/YYYY" />
              </LocalizationProvider>
            </div> */}

          </Grid>
        </Grid>
          <Grid
            container
            sx={{
              px:1
            }} 
          >
          <Grid container style={{padding:'10px'}}>
            <Grid xs={6} sx={{display:'flex',justifyContent:{xs:'flex-start !important',sm:'center !important'}}}>  
              Time/Date
            </Grid>
            <Grid xs={6} style={{textAlign:'center',}}>
                Number
              </Grid>
          </Grid>
              {
                data[location?.state?.id]?.timesList.map((value,index)=>{
                  return(
                  <Grid container  style={{padding:'3px 10px',borderBottom:'1px solid grey'}}>
                    <Grid xs={6} sx={{display:'flex',justifyContent:{xs:'flex-start !important',sm:'center !important'}}}>  
                      {convertTo12HourFormat(data[location?.state?.id]?.timesList[index])}
                    </Grid>
                    <Grid xs={6} style={{textAlign:'center',}}>
                    {convertToDigit(data[location?.state?.id]?.values[index])}
                    </Grid>
                  </Grid>
                  )
                })
              }

          </Grid>
        </Grid>
    </Grid>
  )
}

export default Table;