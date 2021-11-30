import {Autocomplete, FormControl,  FormControlLabel,  Grid,  Typography} from "@mui/material"
import TextField from '@mui/material/TextField';
import {useQuery} from "react-query"
import Button from '@mui/material/Button';
import Checkbox from "@mui/material/Checkbox"
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';



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

const fetchClientesRequest = async(Cliente)=>{
  const data2={Otro:Cliente}
  const response= await fetch('../api/ObtenerClientes',{
      body:JSON.stringify(data2),
      method:'POST',
      headers:{
          'Content-Type':'application/json',
      },
  })
  const data= await response.json()
  const {Clientes}=data;
  return Clientes
}



export default function Formulario({values,handleFormInput,handleFormSelect,handleCheckIngreso,handleCheckPago,handleSubirCliente,ConfirmacionFondos,ConfirmacionPago}) {
  var ListaMonedas=[]
  var Emisores=[]
  var ListaForma=[]
  var ListaStatus=[]

  const {data: Emisores1}=useQuery(["Emisor",values.emisor],fetchEmisorRequest)    
  const { data: ListaStatus1}=useQuery(["Status",values.status],fetchStatusRequest) 
  const {data:ListaForma1}=useQuery(["Formas",values.formadepago],fetchFormaRequest)
  const {data:ListaMonedas1}=useQuery(["Monedas",values.moneda],fetchMonedasRequest)
  const {data:ListaClientes}=useQuery(["Clientes",values.cliente],fetchClientesRequest)
  

  var Clientes=[]
  var ListaCuentas=[]

  if(ListaClientes){
    for(let Cliente of ListaClientes){
      Clientes.push(Cliente.cliente)
      ListaCuentas.push(Cliente.cuentabancaria)
    }
  }
  else{
    Clientes=[]
    ListaCuentas=[]
  }

  if(ListaMonedas1){
    for(let Mone of ListaMonedas1){
      ListaMonedas.push(Mone.moneda)
    }
  }
  else{
    var ListaMonedas=[]
  }


  if(ListaForma1){
    for(let Form of ListaForma1){
      ListaForma.push(Form.formadepago)     
    }
  }
  else{
    ListaForma=[]
  }

  if(ListaStatus1){
    for(let Stat of ListaStatus1){
      ListaStatus.push(Stat.status)     
    }
  }
  else{
    ListaStatus=[]
  }


  if(Emisores1){
    for(let Emi of Emisores1){
      Emisores.push(Emi.emisor)
    }
  }
  else{
    Emisores=[]
  }


  const tamanoh=450


  
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
  
  return (
    <div>    
      <Paper elevation={6} sx={{bgcolor: "#e1f5fe",}}>
      <Box sx={{padding:3}}>
        <Typography component="h1" variant="h5">
         Información del pago
       </Typography>
        <Autocomplete value={values.cliente} defaultValue={values.cliente} onChange={handleFormSelect('cliente')} onInputChange={handleFormInput('cliente')} disablePortal id="ClienteAuto" options={Clientes} sx={{ width: tamanoh,p:1 }} renderInput={(params) => <TextField {...params} label="Cliente"/>}/><br/>
        <Autocomplete value={values.emisor} defaultValue={values.emisor} onChange={handleFormSelect('emisor')} onInputChange={handleFormInput('emisor')} disablePortal  id="EmisorAuto" options={Emisores} sx={{ width: tamanoh,p:1 }} renderInput={(params) => <TextField {...params} label="Emisor"/>}/><br/>
        <TextField defaultValue={values.montorecibido} onChange={handleFormInput('montorecibido')} type="number" sx={{width:tamanoh,p:1}} label="Monto recibido"></TextField><br/>
        <TextField value={values.montorecibido} type="number"  sx={{width:tamanoh,p:1}} label="Monto Aplicable"  disabled={true}></TextField><br/>
        <Autocomplete  value={values.moneda} defaultValue={values.moneda} onChange={handleFormSelect('moneda')} onInputChange={handleFormInput('moneda')} disablePortal  id="MonedaAuto" options={ListaMonedas} sx={{ width: tamanoh,p:1 }} renderInput={(params) => <TextField {...params} label="Moneda"/>}/>  <br/> 
        <TextField sx={{width:tamanoh,p:1}} type="number" value={values.tipodecambio} onChange={handleFormInput('tipodecambio')} label="Tipo de cambio" ></TextField><br/>      
        <Autocomplete value={values.formadepago} defaultValue={values.formadepago} onChange={handleFormSelect('formadepago')} onInputChange={handleFormInput('formadepago')} disablePortal   id="FormaPAuto" options={ListaForma} sx={{ width: tamanoh,p:1 }} renderInput={(params) => <TextField {...params} label="Forma Pago"/>}/>     <br/>   
        <TextField disabled={true} value={values.fecha} onChange={handleFormInput('fecha')} label="Fecha" type="datetime-local" sx={{width:tamanoh,p:1}}     InputLabelProps={{shrink: true}}/><br/>   
        <Autocomplete  value={values.status} defaultValue={values.status} onChange={handleFormSelect('status')} onInputChange={handleFormInput('status')} disablePortal  id="StatusAuto" options={ListaStatus} sx={{ width: tamanoh ,p:1}} renderInput={(params) => <TextField {...params} label="Status"/>}/><br/>
 
        <TextField value={values.numeroperacion} sx={{width:tamanoh,p:1}} label="Numero Operacion"  disabled={true}></TextField><br/>
        
        <TextField value={values.observaciones} onChange={handleFormInput('observaciones')} sx={{width:tamanoh,p:1}} label="Observaciones" ></TextField><br/>
       
        <FormControlLabel checked={ConfirmacionFondos} onChange={handleCheckIngreso('Ingreso')} control={<Checkbox />} label="Ya ingresaron los fondos a la cuenta ?"/>
        <Autocomplete value={values.cuentabancaria} defaultValue={values.cuentabancaria} onChange={handleFormSelect('cuentabancaria')} onInputChange={handleFormInput('cuentabancaria')} disablePortal   id="CuentaBancaria" options={ListaCuentas} sx={aparecerfondos} renderInput={(params) => <TextField {...params} label="Cuenta Bancaria"/>}/><br/>
        <TextField value={values.fechadeingreso} onChange={handleFormInput('fechadeingreso')} type="date"  sx={aparecerfondos}  InputLabelProps={{shrink: true}} label="Fecha de ingreso"/><br/>
        <TextField value={values.montoregistrado} onChange={handleFormInput('montoregistrado')} sx={aparecerfondos} type="number" label="Monto Registrado" ></TextField>  
        
        <FormControlLabel checked={ConfirmacionPago} onChange={handleCheckPago('Pago')}  control={<Checkbox />}  label="El cliente confirmo el pago?"/>
        <TextField value={values.fechadeconfirmacion} onChange={handleFormInput('fechadeconfirmacion')} type="datetime-local"  sx={aparecerpago}      InputLabelProps={{shrink: true}} label="Fecha de confirmación"/><br/>
        <TextField value={values.observacionesalconfirmar} onChange={handleFormInput('observacionesalconfirmar')}  sx={aparecerpago}   label="Observaciones al confirmar" ></TextField>    <br/>
        <br/>
        <Button variant="contained"   onClick={handleSubirCliente} color="success">Guardar Informacion</Button>
        
        </Box>

      </Paper>
    </div>
  )
}
