import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Accordion from '@mui/material/Accordion';
import { Button, TextField } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
const Dashboard = () => {

    const [data,setData] = useState([]);
    const [date,setDate] = useState(moment().format('YYYY/MM/DD'));
    const [seed, setSeed] = useState(1);
    const reset = () => {
         setSeed(Math.random());
     }


    const apiKey = process.env.REACT_APP_URL;
    const token = localStorage.getItem("token");
    const config  = {
        headers: {
            'authorization': `Bearer ${token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }
    }

    useEffect(()=>{
        axios.post(apiKey+'/getUpcomingResultDetails',{'date':date,'token':token},config).then((res)=>{
            setData(res?.data?.logs)
        })
        .catch((e)=>{
            console.log("my error is",e);
        })
    },[date])

    const setDataInDB = () => {
        try{

            axios.post(apiKey+'/updateUpcomingResults',{'date':date,'token':token,'logs':data},config).then((res)=>{
                setData(res?.data?.logs)
                
                console.log("my response of updaing data is",res);
            })
            .catch((e)=>{
                console.log("my error is",e);
            })
        }
        catch(e){
            console.log("my error is",e)
        }finally{
            setTimeout((
                reset()
            ),100)
        }
    } 

    const setNewData = (index,index2,val) =>{
        let p  = data;
        p[index].values[index2] = val
        console.log(index,index2,val)
        setData(p);
    }


  return (
    <div style={{padding:10}}>
        <div style={{fontSize:'30px',fontWeight:'bold',color:'green',margin:"30px 0px"}}>
            RDL Results
            <span style={{marginLeft:"50px"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    defaultValue={dayjs(moment().format('YYYY-MM-DD'))}
                    onChange={(newValue) =>setDate(dayjs(newValue).format('YYYY/MM/DD'))}
                    minDate={dayjs(moment().format('YYYY-MM-DD'))}
                    />
                </LocalizationProvider>
            </span>
            <span >
                <Button style={{width:"250px",margin:"20px",background:'lightgreen'}} onClick={setDataInDB}>Save</Button>
            </span>
        </div>
        <div>
        </div>
        <div key={seed}>
            {
                data &&
                data.map((d,index)=>{
                    return(
                        <Accordion key={index} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{border:'1px solid lightgrey',marginBottom:10,borderLeft:'10px solid lightgreen'}}
                            >
                                <Typography>{d?.title}</Typography>
                            </AccordionSummary>
                            {
                                d?.values.map((val,inde)=>{
                                    return(
                                    <AccordionDetails key={inde}>
                                        <Typography>
                                        {d?.timesList[inde]}
                                        </Typography>
                                        <TextField id="outlined-basic" label={val} variant="outlined" style={{width:'100%'}} onChange={(e)=>setNewData(index,inde,e?.target?.value.trim(' '))} />
                                    </AccordionDetails>
                                    )
                                })
                            }

                        </Accordion>
                    )
                })
            }
        </div>
    </div>
    
  )
}

export default Dashboard