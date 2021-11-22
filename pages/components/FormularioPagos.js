import {Autocomplete, FormControl,  FormControlLabel,  Grid,  Typography} from "@mui/material"
import TextField from '@mui/material/TextField';
import {useQuery} from "react-query"
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox"
import Paper from "@mui/material/Paper";

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
  const [ConfirmacionFondos, setFondosI] = useState(false);
  const [ConfirmacionPago,setConfiP]=useState(false);
  const handleCheckIngreso=e=>{setFondosI(e.target.checked)}
  const handleCheckPago=e=>{setConfiP(e.target.checked)}
  
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
  const tamanoh=350

  return (
    <div >    
      <Paper elevation={6} sx={{bgcolor: "#e1f5fe",}}>
      <Typography component="h1" variant="h5">
         Información del pago
       </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Autocomplete disablePortal id="ClienteAuto" options={Clientes} sx={{ width: tamanoh }} renderInput={(params) => <TextField {...params} label="Cliente"/>}/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Autocomplete disablePortal onInputChange={handleEmisorChange} id="EmisorAuto" options={Emisores} sx={{ width: tamanoh }} renderInput={(params) => <TextField {...params} label="Emisor"/>}/>
        </Grid>
    </Grid>
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <TextField sx={{width:tamanoh}} label="Monto recibido"></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField sx={{width:tamanoh}} label="Monto recibido"  disabled={true}></TextField>
        </Grid>      
    </Grid>

    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Autocomplete disablePortal id="MonedaAuto" options={Monedas} sx={{ width: tamanoh }} renderInput={(params) => <TextField {...params} label="Moneda"/>}/>
        
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField sx={{width:tamanoh}} label="Tipo de cambio" ></TextField>
        
        </Grid>
    </Grid>
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Autocomplete disablePortal id="FormaPAuto" options={Formasdepagos} sx={{ width: tamanoh }} renderInput={(params) => <TextField {...params} label="Forma Pago"/>}/>
        
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField label="Fecha" type="datetime-local" sx={{width:tamanoh}}     InputLabelProps={{shrink: true}}/>
        
        </Grid>
    </Grid>






    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>    
        <Autocomplete disablePortal id="StatusAuto" options={Status} sx={{ width: tamanoh }} renderInput={(params) => <TextField {...params} label="Status"/>}/>
    </Grid>
    </Grid>

    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>    
        <TextField sx={{width:tamanoh}} label="Numero Operacion"  disabled={true}></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>    
        <TextField sx={{width:tamanoh}} label="Observaciones" ></TextField>
        </Grid>
    </Grid>
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>    
        <FormControlLabel onChange={handleCheckIngreso} control={<Checkbox />} label="Ya ingresaron los fondos a la cuenta ?"/>
        </Grid>
        <Grid item xs={12} sm={6}>    
        <FormControlLabel onChange={handleCheckPago}  control={<Checkbox />}  label="El cliente confirmo el pago?"/>
        </Grid>
    </Grid>
    
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>    
        <Autocomplete disablePortal   id="CuentaBancaria" options={Status}sx={{ width: tamanoh , display:ConfirmacionFondos? 'block':'none' }} renderInput={(params) => <TextField {...params} label="Cuenta Bancaria"/>}/>
        </Grid>
        <Grid item xs={12} sm={6}>    
        <TextField type="datetime-local"  sx={{display:ConfirmacionPago? 'block':'none', width: tamanoh   }}      InputLabelProps={{shrink: true}} label="Fecha de confirmación"/>
        </Grid>
    </Grid>

    
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>    
        <TextField type="date"  sx={{ width: tamanoh , display:ConfirmacionFondos? 'block':'none' }}  InputLabelProps={{shrink: true}} label="Fecha de ingreso"/>
        </Grid>
        <Grid item xs={12} sm={6}>    
        <TextField sx={{display:ConfirmacionPago? 'block':'none', width: tamanoh   }}   label="Observaciones al confirmar" ></TextField>    
        </Grid>
    </Grid>
    
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>    
        <TextField sx={{ width: tamanoh , display:ConfirmacionFondos? 'block':'none' }} label="Monto Registrado" ></TextField>
    
 
         </Grid>
    </Grid>
        
      </Paper>
    </div>
  )
}
