import {Autocomplete, FormControl,  Grid,  Typography} from "@mui/material"
import TextField from '@mui/material/TextField';
import {useQuery} from "react-query"
import { useState } from "react";

const fetchEmisorRequest = async(Emisor)=>{
  const data2={Otro:Emisor}
  const response= await fetch('../api/ObtenerEmisor',{
      body:JSON.stringify(data2),
      method:'POST',
      headers:{
          'Content-Type':'application/json',
      },
  })
  const data= await response.json()
  const {Emisores}=data;
  return Emisores
}

  
export default function Formulario() {
  const [Emisor,setEmisor]=useState('')
  var Emisores=[]
  const {data: Emisores1}=useQuery(["Emisor",Emisor],fetchEmisorRequest)    

  if(Emisores1){
    for(let Emi of Emisores1){
      Emisores.push(Emi.empresa_nombre)
    }
  }
  else{
    console.log("cargando")
    Emisores=[]
  }

  const Clientes=[
        "a","b","c"
    ]
    const Monedas=[
      "g","h","i"
    ]

    const Formasdepagos=[
      "j","k","l"
    ]

    const Status=[
      "m","n","o"
    ]


  const handleEmisorChange =e=>{
      setEmisor(e.target.value)
  }
  

  return (
    <div >
      <FormControl>
      <Typography component="h1" variant="h5">
         Información del pago
       </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Autocomplete disablePortal id="ClienteAuto" options={Clientes} sx={{ width: 200 }} renderInput={(params) => <TextField {...params} label="Cliente"/>}/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Autocomplete disablePortal onInputChange={handleEmisorChange} id="EmisorAuto" options={Emisores} sx={{ width: 200 }} renderInput={(params) => <TextField {...params} label="Emisor"/>}/>
        </Grid>
    </Grid>
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <TextField sx={{width:200}} label="Monto recibido"></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField sx={{width:200}} label="Monto recibido"  disabled={true}></TextField>
        </Grid>      
    </Grid>

    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Autocomplete disablePortal id="MonedaAuto" options={Monedas} sx={{ width: 200 }} renderInput={(params) => <TextField {...params} label="Moneda"/>}/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField sx={{width:200}} label="Tipo de cambio" ></TextField>
        </Grid>
    </Grid>
        
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>    
        <Autocomplete disablePortal id="FormaPAuto" options={Formasdepagos} sx={{ width: 200 }} renderInput={(params) => <TextField {...params} label="Forma Pago"/>}/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField type="datetime-local" sx={{width:200}}     InputLabelProps={{shrink: true}}/>
        </Grid>
    </Grid>
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>    
        <Autocomplete disablePortal id="StatusAuto" options={Status} sx={{ width: 200 }} renderInput={(params) => <TextField {...params} label="Status"/>}/>
    </Grid>
    </Grid>

    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>    
        <TextField sx={{width:200}} label="Numero Operacion"  disabled={true}></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>    
        <TextField sx={{width:200}} label="Observaciones" ></TextField>
        </Grid>
    </Grid>
      </FormControl>
    </div>
  )
}
