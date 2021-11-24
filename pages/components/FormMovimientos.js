import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from "@mui/material/Paper";
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



export default function FormMovimientos(){
    const [open, setOpen] = useState(false);
    const [Idactual,setId]=useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCancelar=()=>setId([]);
    const handleGuardar=()=>console.log('Guardado');

    const columns=[
        {field:"id",headerName:"Id",width:70},
        {field:"fecha",headerName:"Fecha",width:150},
        {field:"concepto",headerName:"Concepto",width:200},
        {field:"referencia",headerName:"Referencia",width:100},
        {field:"pago",headerName:"Pago",width:100},
        {field:"gasto",headerName:"Gasto",width:100},
        {field:"monto",headerName:"Monto",width:100}
    ]
    
      const lista=[
          {id:"75787",fecha:"04-Nov-2021",concepto:"TEF Recibido Bank of America",referencia:"1234",pago:"",gasto:"",monto:4383.16},
          {id:"75789",fecha:"04-Nov-2021",concepto:"TEF Recibido Bank of America",referencia:"1235",pago:"",gasto:"",monto:6201.29},
          {id:"75788",fecha:"04-Nov-2021",concepto:"TEF Recibido Bank of America",referencia:"1236",pago:"",gasto:"",monto:7351.73},
          {id:"75806",fecha:"03-Nov-2021",concepto:"TEF Recibido Bank of America",referencia:"1237",pago:"",gasto:"",monto:1684.27},
          {id:"75804",fecha:"03-Nov-2021",concepto:"TEF Recibido Bank of America",referencia:"1238",pago:"",gasto:"",monto:2428.55},
          {id:"75802",fecha:"03-Nov-2021",concepto:"TEF Recibido Bank of America",referencia:"1239",pago:"",gasto:"",monto:3614.24},
          {id:"75797",fecha:"03-Nov-2021",concepto:"Pago cuenta de tercero",referencia:"1231",pago:"",gasto:"",monto:4173.53},
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
      console.log(DatosTabla)


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
  
      const Prueba=e=>{
        var aux=[]
        for(let i of e){
            aux.push(e)
        }
        setId(e)
    }

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
        <Button variant="contained"  color="success" onClick={handleGuardar} >Guardar Pago</Button>
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
                onSelectionModelChange={Prueba}/>
            </Box>
        </Modal>
        </Paper>
        </div>
    )
}