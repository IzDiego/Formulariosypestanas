import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from "@mui/material/Paper";
import { DataGrid } from '@mui/x-data-grid';
import { useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useQuery} from "react-query"


const fetchMovimientosRequest = async()=>{
    const response= await fetch('../api/Obtenermovimientos',{
        body:JSON.stringify(''),
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
    })
    const data= await response.json()
    const {movimientos}=data;
    return movimientos
  }


export default function FormMovimientos({handleGuardarTabla,handlecancelacion}){
    const [open, setOpen] = useState(false);
    const [Idactual,setId]=useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleCancelar=()=>{
        setId([])
        handlecancelacion()
    }
    const {data:ListaMovimientos}=useQuery(["Movimientos"],fetchMovimientosRequest)
  
    
    const columns=[
        {field:"id",headerName:"Id",width:70},
        {field:"fecha",headerName:"Fecha",width:150},
        {field:"concepto",headerName:"Concepto",width:200},
        {field:"referencia",headerName:"Referencia",width:100},
        {field:"monto",headerName:"Monto",width:100}
    ]
    
    var lista=[]
    if(ListaMovimientos){
        for(let Movi of ListaMovimientos){
          lista.push(Movi)
        }
      }
      else{
          lista=[]
      }


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
        <Button variant="contained" color="primary" onClick={handleOpen} >Agregar movimientos</Button>
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
        <Button variant="contained"  color="success" onClick={handleGuardarTabla(DatosTabla)} >Guardar Pago</Button>
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