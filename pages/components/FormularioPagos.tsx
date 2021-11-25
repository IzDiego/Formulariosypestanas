import {Autocomplete, FormControl,  FormControlLabel,  Grid,  Typography} from "@mui/material"
import TextField from '@mui/material/TextField';
import {useQuery} from "react-query"
import { useState,useContext } from "react";
import Checkbox from "@mui/material/Checkbox"
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import {AppContext} from "../application/provider" 


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


const fetchStatusRequest = async(Status)=>{
  const data2={Otro:Status}
  const response= await fetch('../api/ObtenerStatus',{
      body:JSON.stringify(data2),
      method:'POST',
      headers:{
          'Content-Type':'application/json',
      },
  })
  const data= await response.json()
  const {Status1}=data;
  return Status1
}

const fetchFormaRequest = async(Status)=>{
  const data2={Otro:Status}
  const response= await fetch('../api/ObtenerForma',{
      body:JSON.stringify(data2),
      method:'POST',
      headers:{
          'Content-Type':'application/json',
      },
  })
  const data= await response.json()
  const {Forma1}=data;
  return Forma1
}
 
const fetchMonedasRequest = async(Moneda)=>{
  const data2={Otro:Moneda}
  const response= await fetch('../api/ObtenerMonedas',{
      body:JSON.stringify(data2),
      method:'POST',
      headers:{
          'Content-Type':'application/json',
      },
  })
  const data= await response.json()
  const {Monedas}=data;
  return Monedas
}
export default function Formulario() {
  const [Emisor,setEmisor]=useState('')
  const [Formas,setFormas]=useState('')
  const [Status,setStatus]=useState('')
  const [Moneda,setMoneda]=useState('')
  const [Dinero,setDinero]=useContext(AppContext)
  const [ConfirmacionFondos, setFondosI] = useState(false);
  const [ConfirmacionPago,setConfiP]=useState(false);
  const [Monto,setMonto]=useState(0)
  
  var ListaMonedas=[]
  var Emisores=[]
  var ListaForma=[]
  var ListaStatus=[]
  const {data: Emisores1}=useQuery(["Emisor",Emisor],fetchEmisorRequest)    
  const { data: ListaStatus1}=useQuery(["Status",Status],fetchStatusRequest) 
  const {data:ListaForma1}=useQuery(["Formas",Formas],fetchFormaRequest)
  const {data:ListaMonedas1}=useQuery(["Monedas",Moneda],fetchMonedasRequest)


  if(ListaMonedas1){
    for(let Mone of ListaMonedas1){
      ListaMonedas.push(Mone.soporte_moneda_clave+' - '+Mone.soporte_moneda_nombre)
    }
  }
  else{
    var ListaMonedas=[]
  }


  if(ListaForma1){
    for(let Form of ListaForma1){
      ListaForma.push(Form.forma+' - '+Form.forma_pago_nombre)     
    }
  }
  else{
    ListaForma=[]
  }

  if(ListaStatus1){
    for(let Stat of ListaStatus1){
      ListaStatus.push(Stat.status_pago_nombre)     
    }
  }
  else{
    ListaStatus=[]
  }


  if(Emisores1){
    for(let Emi of Emisores1){
      Emisores.push(Emi.empresa_nombre)
    }
  }
  else{
    Emisores=[]
  }

  const Clientes=[
        "Usada","Sakura","Uruha","Amane","Azki","Hoshimachi"
    ]

  const ListaCuentas=[
    "asd1234","zxc5678","qwe0987","vbn6543"
  ]


  const tamanoh=450

  const handleCheckIngreso=e=>{setFondosI(e.target.checked)}
  const handleCheckPago=e=>{setConfiP(e.target.checked)}
  
  const handleEmisorChange=e=>{setEmisor(e.target.value)}
  const handleEmisorSelect=(e,value)=>{
    if(value){
      setEmisor(value)
    }
    else{
      setEmisor('')
    }
  }
  const handleStatusChange=e=>{setStatus(e.target.value)}
  const handleFormaChange=e=>{setFormas(e.target.value)}
  
  const handleMonedaChange=(e)=>{
    setMoneda(e.target.value)
    setDinero(prevDinero=>({
      ...prevDinero,
      ["TipoMoneda"]:e.target.value
  }))
  }
 
  const handleMonedaSelect=(e,value)=>{
    if(value){
      setMoneda(value.substring(0,3))
      setDinero(prevDinero=>({
        ...prevDinero,
        ["TipoMoneda"]:value.substring(0,3)
      }))
    }
    else{
      setMoneda('')
      setDinero(prevDinero=>({
        ...prevDinero,
        ["TipoMoneda"]:''
      }))
    }
  }

  const handleMontoChange=e=>{
    if(e.target.value===''){
      setMonto(0)
      setDinero(prevDinero=>({
        ...prevDinero,
        ["Aplicable"]:0
      }))
    }
    else{
    setMonto(e.target.value)
    setDinero(prevDinero=>({
      ...prevDinero,
      ["Aplicable"]:e.target.value
    }))
  }
  }
/*
  const aparecerpago={
    display:ConfirmacionPago? 'flex':'none', 
    width: tamanoh,
    p:1      
  }
  const aparecerfondos={
    display:ConfirmacionFondos? 'flex':'none', 
    width: tamanoh,
    p:1        
  }
  */
  
  return (
    <div >    
      <Paper elevation={6} sx={{bgcolor: "#e1f5fe",}}>
      <Box sx={{padding:3}}>
        <Typography component="h1" variant="h5">
         Información del pago
       </Typography>
        <Autocomplete disablePortal id="ClienteAuto" options={Clientes} sx={{ width: tamanoh,p:1 }} renderInput={(params) => <TextField {...params} label="Cliente"/>}/>
        <Autocomplete onChange={handleEmisorSelect} disablePortal onInputChange={handleEmisorChange} id="EmisorAuto" options={Emisores} sx={{ width: tamanoh,p:1 }} renderInput={(params) => <TextField {...params} label="Emisor"/>}/>
        <TextField onChange={handleMontoChange} type="number" sx={{width:tamanoh,p:1}} label="Monto recibido"></TextField>
        <TextField type="number" value={Dinero.Aplicable} sx={{width:tamanoh,p:1}} label="Monto Aplicable"  disabled={true}></TextField>
        <Autocomplete disablePortal onChange={handleMonedaSelect} onInputChange={handleMonedaChange} id="MonedaAuto" options={ListaMonedas} sx={{ width: tamanoh,p:1 }} renderInput={(params) => <TextField {...params} label="Moneda"/>}/>   
        <TextField sx={{width:tamanoh,p:1}} label="Tipo de cambio" ></TextField>
        <Autocomplete disablePortal onInputChange={handleFormaChange} id="FormaPAuto" options={ListaForma} sx={{ width: tamanoh,p:1 }} renderInput={(params) => <TextField {...params} label="Forma Pago"/>}/>     
        <TextField label="Fecha" type="datetime-local" sx={{width:tamanoh,p:1}}     InputLabelProps={{shrink: true}}/>
        <Autocomplete disablePortal onInputChange={handleStatusChange} id="StatusAuto" options={ListaStatus} sx={{ width: tamanoh ,p:1}} renderInput={(params) => <TextField {...params} label="Status"/>}/>
        <TextField sx={{width:tamanoh,p:1}} label="Numero Operacion"  disabled={true}></TextField>
        <TextField sx={{width:tamanoh,p:1}} label="Observaciones" ></TextField>
       </Box> 
       {/*
        <Box sx={{padding:3}}>
        <FormControlLabel onChange={handleCheckIngreso} control={<Checkbox />} label="Ya ingresaron los fondos a la cuenta ?"/>
        <Autocomplete disablePortal   id="CuentaBancaria" options={ListaCuentas} sx={aparecerfondos} renderInput={(params) => <TextField {...params} label="Cuenta Bancaria"/>}/>
        <TextField type="date"  sx={aparecerfondos}  InputLabelProps={{shrink: true}} label="Fecha de ingreso"/>
        <TextField sx={aparecerfondos} label="Monto Registrado" ></TextField>     
        </Box>
        <Box sx={{padding:3}}>
        <FormControlLabel onChange={handleCheckPago}  control={<Checkbox />}  label="El cliente confirmo el pago?"/>
        <TextField type="datetime-local"  sx={aparecerpago}      InputLabelProps={{shrink: true}} label="Fecha de confirmación"/>
        <TextField sx={aparecerpago}   label="Observaciones al confirmar" ></TextField>    
        </Box>
        */}
      </Paper>
    </div>
  )
}
