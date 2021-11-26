import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Formulario from './FormularioPagos'
import FormComprobantes from './FormComprobantes';
import FormMovimientos from './FormMovimientos';
import {AppContext} from "../application/provider" 
import {useState,useContext} from 'react'

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
    
    const [value, setValue] = React.useState(0);
    const [Dinero,setDinero]=useContext(AppContext)
    const [DatosPrueba,setDprueba]=useState({
      cliente:'',
      emisor:'',
      montorecibido:0,
      montoaplicable:'',
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

      fechadecomfirmacion:'',
      observacionesalconfirmar:''


    })
    const [ConfirmacionFondos, setFondos] = useState(false);
    const [ConfirmacionPago,setConfiP]=useState(false);
    
    
    const handleCheckIngreso=input=>e=>{setFondos(e.target.checked)}
    const handleCheckPago=input=>e=>{setConfiP(e.target.checked)}
    var moneda=''
    if(DatosPrueba.moneda!==''){
      moneda=DatosPrueba.moneda.substring(0,3)
    }
  
    const handletabsChange = (event, newValue) => {
      setValue(newValue);
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

    return (
      <div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',padding:3 }}>
        <Typography>Agregar Pago|  Aplicable: {Dinero.Pago*DatosPrueba.tipodecambio} {moneda} Por Aplicar: {(Dinero.Pago-DatosPrueba.montorecibido)*DatosPrueba.tipodecambio} {moneda} </Typography>
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
         values={DatosPrueba}
         ConfirmacionFondos={ConfirmacionFondos}
         ConfirmacionPago={ConfirmacionPago}
         /> 
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormComprobantes/>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <FormMovimientos/>       
        </TabPanel>
      </Box>
      </div>
    );
}