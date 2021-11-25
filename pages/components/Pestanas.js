import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Formulario from './FormularioPagos'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FormComprobantes from './FormComprobantes';
import FormAjustes from './FormAjustes';
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
    
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',padding:3 }}>
        <Typography>Agregar Pago|  Aplicable: {Dinero.Pago} {Dinero.TipoMoneda} Por Aplicar: {Dinero.Pago-Dinero.Aplicable} {Dinero.TipoMoneda} </Typography>
        </Box> 
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Información del pago" {...a11yProps(0)} />
            <Tab label="Comprobantes Relacionados" {...a11yProps(1)} />
            <Tab label="Ajustes" {...a11yProps(2)} />
            <Tab label="Movimientos" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
         <Formulario /> 
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormComprobantes/>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <FormAjustes/>
        </TabPanel>
        <TabPanel value={value} index={3}>
        <FormMovimientos/>       
        </TabPanel>
      </Box>
    );
}