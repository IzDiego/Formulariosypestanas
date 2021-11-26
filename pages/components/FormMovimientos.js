import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from "@mui/material/Paper";
import { DataGrid } from '@mui/x-data-grid';
import { useState,useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {AppContext} from "../application/provider" 



export default function FormMovimientos(props){
    const [open, setOpen] = useState(false);
    const [Idactual,setId]=useState([])
    const [Dinero,setDinero]=useContext(AppContext)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCancelar=()=>{setId([])
        setDinero(prevDinero=>({
            ...prevDinero,
            ["Pago"]:0,
            ["Aplicable"]:0
        }))
    }

    
    const columns=[
        {field:"id",headerName:"Id",width:70},
        {field:"fecha",headerName:"Fecha",width:150},
        {field:"concepto",headerName:"Concepto",width:200},
        {field:"referencia",headerName:"Referencia",width:100},
        {field:"monto",headerName:"Monto",width:100}
    ]
    
      const lista=[
          {id:"75787",fecha:"04-Nov-2021T12:23",concepto:"TEF Recibido Bank of America",referencia:"1234",monto:4383.16,tipodecambio:1,emisor:"Holo", moneda:"MXN",  formadepago:"Efectivo",                             status:"Tenemos el dinero"},
          {id:"75789",fecha:"04-Nov-2021T01:43",concepto:"TEF Recibido Bank of America",referencia:"1235",monto:6201.29,tipodecambio:21.2,emisor:"Live", moneda:"USD", formadepago:"Cheque normativo",                     status:"Salvo Buen Cobro"},
          {id:"75788",fecha:"04-Nov-2021T02:33",concepto:"TEF Recibido Bank of America",referencia:"1236",monto:7351.73,tipodecambio:1,emisor:"Fate", moneda:"MXM" ,formadepago:"Transferencia electrónica de fondos",  status:"Tenemos documento"},
          {id:"75806",fecha:"03-Nov-2021T03:53",concepto:"TEF Recibido Bank of America",referencia:"1237",monto:1684.27,tipodecambio:23,emisor:"Go",   moneda:"EUR" , formadepago:"Tarjeta de crédito",                   status:"Tenemos promesa de pago"},
          {id:"75804",fecha:"03-Nov-2021T02:43",concepto:"TEF Recibido Bank of America",referencia:"1238",monto:2428.55,tipodecambio:1,emisor:"Fatal",moneda:"MXN" ,formadepago:"Efectivo",                             status:"Tenemos el dinero"},
          {id:"75802",fecha:"03-Nov-2021T03:43",concepto:"TEF Recibido Bank of America",referencia:"1239",monto:3614.24,tipodecambio:21.2,emisor:"Frame",moneda:"USD" ,formadepago:"Efectivo",                             status:"Tenemos el dinero"},
          {id:"75797",fecha:"03-Nov-2021T13:43",concepto:"Pago cuenta de tercero",      referencia:"1231",monto:4173.53,tipodecambio:23,emisor:"Asd",  moneda:"EUR" ,formadepago:"Efectivo",                             status:"Tenemos el dinero"},
      ]



    var DatosTabla=[]
    if(Idactual){
        for(let lis of lista){
            for(let asd of Idactual){
                if(lis.id===asd){
                    DatosTabla.push(lis)
                }
            }
        }
    }

    const [SumaComprobantes,setSuma]=useState(0)
    

    const handleRowCheck=e=>{
        var aux=[]
        for(let i of e){
            aux.push(e)
        }
        setId(e)
    }



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height:500,
        bgcolor: '#e1f5fe',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
  

    return(
        <div>
        <Paper elevation={6} sx={{bgcolor: "#e1f5fe",}}>
        <Box  sx={{padding:3}} textAlign='center'>
        <Button variant="contained" color="primary" onClick={handleOpen} sx={{align:"center"}}>Agregar movimientos</Button>
        <TableContainer >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Concepto</TableCell>
                <TableCell align="center">Referencia</TableCell>
                <TableCell align="center">Monto</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {DatosTabla.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell align="center">{row.fecha}</TableCell>
                <TableCell align="center">{row.concepto}</TableCell>
                <TableCell align="center">{row.referencia}</TableCell>
                <TableCell align="center">{row.monto}</TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>
        </TableContainer>
        <Button variant="contained"  color="error" onClick={handleCancelar} >Cancelar</Button>
        <Button variant="contained"  color="success" onClick={props.handleGuardarTabla(DatosTabla)} >Guardar Pago</Button>
        </Box>
        


        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Listado Cuenta Bancaria con Datos ya establecidos
            </Typography>
                <DataGrid
                rows={lista}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableDensitySelector
                disableExtendRowFullWidth
                onSelectionModelChange={handleRowCheck}/>
            </Box>
        </Modal>
        </Paper>
        </div>
    )
}