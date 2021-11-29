import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";

export default function FormComprobantes(props) {
  const importe=props.Comprobanteimporte
  const formadepago=props.Comprobanteformadepago
  const usocfdi=props.Comprobantecfdi
  const numeroparcialidad=props.Comprobantenumerodeparcialidad
  const comprobante=props.Comprobantenombre

  const tamanoh=450
  var auxiliararreglo=[]
  for(var i=0; i<props.contador;i++){
    auxiliararreglo.push(i)
  }
  
  
  return (
    <div>
      <Paper elevation={24} sx={{bgcolor: "#e1f5fe"}}>        
        {auxiliararreglo.map((auxiliar,i)=>{
          return(
          <div key={"Comprobante"+i}>
            <Box  sx={{padding:3}}>
              <Typography component="h1" variant="h5">
              Información del comprobante {i+1}
              </Typography>
              <br/>
              <FormControl sx={{ width: tamanoh }}>
              <Autocomplete value={comprobante[i]} onChange={props.handleselectcomprobante(i)} onInputChange={props.handlecomprobanteinput(i)}  id="combo-box-demo" options={[]} renderInput={(params) => (
                  <><TextField {...params}InputLabelProps={{ shrink: true }}  label="Comprobante" value="Comprobante"/></>)}
              />{" "}
            
              </FormControl>
              <br/>
              <br/>
              <FormControl sx={{ width: tamanoh}}>
              <Autocomplete defaultValue={1} value={numeroparcialidad[i]}  onChange={props.handleparcialidad(i)}  disablePortal  id="EmisorAuto" options={[1,2,3,4,5]}  renderInput={(params) => <TextField {...params} label="Numero de parcialidad"/>}/><br/>
              </FormControl>
              <br/>
              <FormControl sx={{ width: tamanoh }}>
                <InputLabel  id="uso-CFDI">Uso de CFDI</InputLabel>
                <Select  value={usocfdi[i]} label="Uso de CFDI" onChange={props.handleusocfdi(i)}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"G01"}>
                    G01 - Adquisición de mercancias
                  </MenuItem>
                  <MenuItem value={"G02"}>G02 - Otra cosa A</MenuItem>
                  <MenuItem value={"G03"}>G03 - Otra cosa B</MenuItem>
                </Select>
              </FormControl>
              <br/>
              <br/>
              <FormControl sx={{ width: tamanoh }} id="forma-pago">
                <InputLabel>Forma de Pago</InputLabel>
                <Select  value={formadepago[i]} label="Forma de Pago" onChange={props.handleformadepago(i)}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>01 - Efectivo</MenuItem>
                  <MenuItem value={20}>02 - Tarjeta de credito</MenuItem>
                  <MenuItem value={30}>03 - Vales de despensa</MenuItem>
                </Select>
              </FormControl>
              <br/>
              <br/>
            
              <FormControl sx={{ width: tamanoh }} id="importe">
              <TextField value={importe[i]} type="number"  onChange={props.handleimporte(i)} label="Monto Aplicable" ></TextField><br/>
              </FormControl>
            </Box>
          </div>
          )
        })}
        <Box sx={{padding:3}}>
        <Button variant="contained"  color="primary" onClick={props.agregarComprobante('boton')} >Agregar Comprobante</Button>
        <Button variant="contained"  color="success" onClick={props.guardarComprobante('botong')} >Guardar Comrprobante(s)</Button>
        </Box>
      </Paper>
    </div>
  );
}