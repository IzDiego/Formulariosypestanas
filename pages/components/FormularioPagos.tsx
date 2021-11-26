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
export default function Formulario(props) {
  var ListaMonedas=[]
  var Emisores=[]
  var ListaForma=[]
  var ListaStatus=[]
  const {data: Emisores1}=useQuery(["Emisor",props.values.emisor],fetchEmisorRequest)    
  const { data: ListaStatus1}=useQuery(["Status",props.values.status],fetchStatusRequest) 
  const {data:ListaForma1}=useQuery(["Formas",props.values.formadepago],fetchFormaRequest)
  const {data:ListaMonedas1}=useQuery(["Monedas",props.values.moneda],fetchMonedasRequest)
  console.log(props.values)

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

  // const handleCheckIngreso=e=>{setFondosI(e.target.checked)}
 
  
  
  const aparecerpago={
    display:props.ConfirmacionPago? 'flex':'none', 
    width: tamanoh,
    p:1      
  }
  const aparecerfondos={
    display:props.ConfirmacionFondos? 'flex':'none', 
    width: tamanoh,
    p:1        
  }
  
  return (
    <div >    
      <Paper elevation={6} sx={{bgcolor: "#e1f5fe",}}>
      <Box sx={{padding:3}}>
        <Typography component="h1" variant="h5">
         Información del pago
       </Typography>
        <Autocomplete value={props.values.cliente} defaultValue={props.values.cliente} onChange={props.handleFormSelect('cliente')} onInputChange={props.handleFormInput('cliente')} disablePortal id="ClienteAuto" options={Clientes} sx={{ width: tamanoh,p:1 }} renderInput={(params) => <TextField {...params} label="Cliente"/>}/><br/>
        <Autocomplete value={props.values.emisor} defaultValue={props.values.emisor} onChange={props.handleFormSelect('emisor')} onInputChange={props.handleFormInput('emisor')} disablePortal  id="EmisorAuto" options={Emisores} sx={{ width: tamanoh,p:1 }} renderInput={(params) => <TextField {...params} label="Emisor"/>}/><br/>
        <TextField defaultValue={props.values.montorecibido} onChange={props.handleFormInput('montorecibido')} type="number" sx={{width:tamanoh,p:1}} label="Monto recibido"></TextField><br/>
        <TextField value={props.values.montorecibido} type="number"  sx={{width:tamanoh,p:1}} label="Monto Aplicable"  disabled={true}></TextField><br/>
        <Autocomplete  value={props.values.moneda} defaultValue={props.values.moneda} onChange={props.handleFormSelect('moneda')} onInputChange={props.handleFormInput('moneda')} disablePortal  id="MonedaAuto" options={ListaMonedas} sx={{ width: tamanoh,p:1 }} renderInput={(params) => <TextField {...params} label="Moneda"/>}/>  <br/> 
        <TextField sx={{width:tamanoh,p:1}} type="number" value={props.values.tipodecambio} onChange={props.handleFormInput('tipodecambio')} label="Tipo de cambio" ></TextField><br/>      
        <Autocomplete value={props.values.formadepago} defaultValue={props.values.formadepago} onChange={props.handleFormSelect('formadepago')} onInputChange={props.handleFormInput('formadepago')} disablePortal   id="FormaPAuto" options={ListaForma} sx={{ width: tamanoh,p:1 }} renderInput={(params) => <TextField {...params} label="Forma Pago"/>}/>     <br/>   
        <TextField disabled={true} value={props.values.fecha} onChange={props.handleFormInput('fecha')} label="Fecha" type="datetime-local" sx={{width:tamanoh,p:1}}     InputLabelProps={{shrink: true}}/><br/>   
        <Autocomplete  value={props.values.status} defaultValue={props.values.status} onChange={props.handleFormSelect('status')} onInputChange={props.handleFormInput('status')} disablePortal  id="StatusAuto" options={ListaStatus} sx={{ width: tamanoh ,p:1}} renderInput={(params) => <TextField {...params} label="Status"/>}/><br/>
        {/*
        Falta que hace esto
        */}
        <TextField sx={{width:tamanoh,p:1}} label="Numero Operacion"  disabled={true}></TextField><br/>
        
        <TextField value={props.values.observaciones} onChange={props.handleFormInput('observaciones')} sx={{width:tamanoh,p:1}} label="Observaciones" ></TextField><br/>
       
        <FormControlLabel checked={props.ConfirmacionFondos} onChange={props.handleCheckIngreso('Ingreso')} control={<Checkbox />} label="Ya ingresaron los fondos a la cuenta ?"/>
        <Autocomplete value={props.values.cuentabancaria} defaultValue={props.values.cuentabancaria} onChange={props.handleFormSelect('cuentabancaria')} onInputChange={props.handleFormInput('cuentabancaria')} disablePortal   id="CuentaBancaria" options={ListaCuentas} sx={aparecerfondos} renderInput={(params) => <TextField {...params} label="Cuenta Bancaria"/>}/><br/>
        <TextField value={props.values.fechadeingreso} onChange={props.handleFormInput('fechadeingreso')} type="date"  sx={aparecerfondos}  InputLabelProps={{shrink: true}} label="Fecha de ingreso"/><br/>
        <TextField value={props.values.montoregistrado} onChange={props.handleFormInput('montoregistrado')} sx={aparecerfondos} type="number" label="Monto Registrado" ></TextField>  
        
        <FormControlLabel checked={props.ConfirmacionPago} onChange={props.handleCheckPago('Pago')}  control={<Checkbox />}  label="El cliente confirmo el pago?"/>
        <TextField value={props.values.fechadeconfirmacion} onChange={props.handleFormInput('fechadeconfirmacion')} type="datetime-local"  sx={aparecerpago}      InputLabelProps={{shrink: true}} label="Fecha de confirmación"/><br/>
        <TextField value={props.values.observacionesalconfirmar} onChange={props.handleFormInput('observacionesalconfirmar')}  sx={aparecerpago}   label="Observaciones al confirmar" ></TextField>    <br/>
        </Box>
      </Paper>
    </div>
  )
}
