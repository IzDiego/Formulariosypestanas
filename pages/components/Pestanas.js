import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Formulario from './FormularioPagos'
import FormComprobantes from './FormComprobantes';
import FormMovimientos from './FormMovimientos';
import {useState} from 'react'


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }




export default function Pestanas(){
    
    const [value, setValue] = useState(0);
    const [DatosPrueba,setDprueba]=useState({
      cliente:'',
      emisor:'',
      montorecibido:0,
      montoaplicable:0,
      moneda:'',
      tipodecambio:0,
      formadepago:'',
      fecha:'',
      status:'',
      numeroperacion:'',
      observaciones:'',

      cuentabancaria:'',
      fechadeingreso:'',
      montoregistrado:0,

      fechadeconfirmacion:'',
      observacionesalconfirmar:''
    })
    const [contador,setContador]=useState(1)
    const [ConfirmacionFondos, setFondos] = useState(false);
    const [ConfirmacionPago,setConfiP]=useState(false);

    const [Comprobantenombre,setComprobantenombre]=useState([''])
    const [Comprobantenumerodeparcialidad,setComprobanteparcialidad]=useState([1])
    const [Comprobantecfdi,setCfdi]=useState(['G01'])
    const [Comprobanteformadepago,setFormadepago]=useState([10])
    const [Comprobanteimporte,setImporte]=useState([0])
    
    const handleCheckIngreso=input=>e=>{setFondos(e.target.checked)}
    const handleCheckPago=input=>e=>{setConfiP(e.target.checked)}

    const handleSubirCliente=async (e)=>{
      e.preventDefault()
      console.log("subiendo")
      try{
        const body={DatosPrueba}
        await fetch(`http://localhost:3000/api/post`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(body),
        })
      } catch(error){
        console.log(error)
      }  

    }

    var moneda=''
    if(DatosPrueba.moneda!==''){
      moneda=DatosPrueba.moneda.substring(0,3)
    }
  
    const handletabsChange = (event, newValue) => {
      setValue(newValue);
    }


    const agregarComprobante=input=>e=>{
      setContador(contador+1)
      var aux=Comprobantenombre
      var aux2=''
      aux.push(aux2)
      setComprobantenombre(aux)
      
      aux=Comprobantenumerodeparcialidad
      aux2=1
      aux.push(aux2)
      setComprobanteparcialidad(aux)
      
      aux=Comprobantecfdi
      aux2='G01'
      aux.push(aux2)
      setCfdi(aux)
      
      aux=Comprobanteformadepago
      aux2=10
      aux.push(aux2)
      setFormadepago(aux)

      aux=Comprobanteimporte
      aux2=0
      aux.push(aux2)
      setImporte(aux)

    }
    const guardarComprobante=input=>e=>{
      var aux=0
      for(let pago of Comprobanteimporte){
    
        aux+=parseFloat(pago)
      }
      setDprueba(prevDprueba=>({
        ...prevDprueba,
        ["montoregistrado"]:aux
      })) 
    
    }

    const handleusocfdi=i=>e=>{
      var aux=[...Comprobantecfdi]
      aux[i]=e.target.value
      setCfdi(aux)
    }

    const handleformadepago=i=>e=>{
      var aux=[...Comprobanteformadepago]
      aux[i]=e.target.value
      setFormadepago(aux)
    }

    const handleparcialidad=(i)=>(e,value)=>{
      var aux=[...Comprobantenumerodeparcialidad]
      if(value){
        aux[i]=value
      }
      else{
        aux[i]=1  
      }
      setComprobanteparcialidad(aux)
    }
  
    const handleimporte=(i)=>e=>{
      if(e){
        var aux=[...Comprobanteimporte]
        aux[i]=e.target.value
        setImporte(aux)
      }
    }

    const handlecomprobanteinput=i=>e=>{
      if(e){
        var aux=[...Comprobantenombre]
        aux[i]=e.target.value
        setComprobantenombre(aux)
      }
    }
    const handleFormInput=input=>e=>{
      if(e){
      setDprueba(prevDprueba=>({
        ...prevDprueba,
        [input]:e.target.value
      })) 
      }
    }

    const handleFormSelect=input=>(e,value)=>{
      if(value){
        setDprueba(prevDprueba=>({
          ...prevDprueba,
          [input]:value
        }))
      }
      else{
        setDprueba(prevDprueba=>({
          ...prevDprueba,
          [input]:''
        }))
      }
    }
    const handleselectcomprobante=i=>(e,value)=>{
      var aux=[...Comprobantenombre]
      if(value){
        aux[i]=value
      }
      else{
        aux[i]=''
      }
      setComprobantenombre(aux)
    }

    const handleGuardarTabla=input=>(e)=>{
      setDprueba(prevDprueba=>({
        ...prevDprueba,
        ["emisor"]:input[0].emisor,
        ["montorecibido"]:input[0].monto,
        ["moneda"]:input[0].moneda,
        ["tipodecambio"]:input[0].tipodecambio,
        ["fecha"]:input[0].fecha,
        ["status"]:input[0].status,
        ["numeroperacion"]:input[0].referencia,
        ["formadepago"]:input[0].formadepago
      }))
    }

    const handlecancelacion= () =>{
      setDprueba(prevDprueba=>({
        ...prevDprueba,
        ["cliente"]:'',
        ["emisor"]:'',
        ["montorecibido"]:0,
        ["montoaplicable"]:0,
        ["moneda"]:'',
        ["tipodecambio"]:0,
        ["formadepago"]:'',
        ["fecha"]:'',
        ["status"]:'',
        ["numeroperacion"]:'',
        ["observaciones"]:'',
      }))
    }

    return (
      <div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',padding:3 }}>
        <Typography>Agregar Pago|  Aplicable: {parseFloat(DatosPrueba.montorecibido*DatosPrueba.tipodecambio).toFixed(2)} MXN Por Aplicar: {parseFloat((DatosPrueba.montorecibido-DatosPrueba.montoregistrado)*DatosPrueba.tipodecambio).toFixed(2)} MXN </Typography>
        </Box> 
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handletabsChange} aria-label="basic tabs example">
            <Tab label="Información del pago" {...a11yProps(0)} />
            <Tab label="Comprobantes Relacionados" {...a11yProps(1)} />
            <Tab label="Movimientos" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
         <Formulario
         handleFormInput={handleFormInput}
         handleFormSelect={handleFormSelect}
         handleCheckIngreso={handleCheckIngreso}
         handleCheckPago={handleCheckPago}
         handleSubirCliente={handleSubirCliente}
         values={DatosPrueba}
         ConfirmacionFondos={ConfirmacionFondos}
         ConfirmacionPago={ConfirmacionPago}
         /> 
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormComprobantes
          agregarComprobante={agregarComprobante}
          handleparcialidad={handleparcialidad}
          handleimporte={handleimporte}
          handleformadepago={handleformadepago}
          handleusocfdi={handleusocfdi}
          handleselectcomprobante={handleselectcomprobante}
          handlecomprobanteinput={handlecomprobanteinput}
          guardarComprobante={guardarComprobante}
          contador={contador}
          Comprobanteimporte={Comprobanteimporte}
          Comprobanteformadepago={Comprobanteformadepago}
          Comprobantecfdi={Comprobantecfdi}
          Comprobantenumerodeparcialidad={Comprobantenumerodeparcialidad}
          Comprobantenombre={Comprobantenombre}

          />
        </TabPanel>
        <TabPanel value={value} index={2}>
        <FormMovimientos
        handleGuardarTabla={handleGuardarTabla}
        handlecancelacion={handlecancelacion}
        />       
        </TabPanel>
      </Box>
      </div>
    );
}