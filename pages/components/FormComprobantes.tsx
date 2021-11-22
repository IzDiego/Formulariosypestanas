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

export default function FormComprobantes() {
  const [comprobante, setComprobante] = React.useState("id, fecha, total");
  const [cfdi, setCfdi] = React.useState("G01 - Adquisición de mercancias");
  const [numParcialidad, setNumParcialidad] = React.useState(1);
  const [formaPago, setFormaPago] = React.useState("01 - Efectivo");

  const handleChangeCFDI = (event: any) => {
    setCfdi(event.target.value);
  };

  const handleChangeFormaPago = (event: any) => {
    setFormaPago(event.target.value);
  };

  const handleChangeComprobante = (e: any) => {
    if (e.target.value.length === 0) {
      setComprobante("");
    } else {
      setComprobante(e.target.value);
    }
  };

  return (
    <div>
      <Paper
        elevation={24}
        sx={{
          bgcolor: "#e1f5fe",
        }}
      >
        <Grid container spacing={2} padding={3}>
          <Grid item xs={6}>
            <Autocomplete
              id="combo-box-demo"
              options={[]}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChangeComprobante}
                    label="Comprobante"
                    value="Comprobante"
                  />
                </>
              )}
            />{" "}
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="num-parcialidad">{numParcialidad}</InputLabel>
              <TextField
                disabled
                InputLabelProps={{ shrink: true }}
                label="Numero de Parcialidad"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="uso-CFDI">Uso de CFDI</InputLabel>
              <Select
                value={cfdi}
                label="Uso de CFDI"
                onChange={handleChangeCFDI}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"G01 - Adquisición de mercancias"}>
                  G01 - Adquisición de mercancias
                </MenuItem>
                <MenuItem value={"G02"}>G02</MenuItem>
                <MenuItem value={"G03"}>G03</MenuItem>
              </Select>
              <FormHelperText>Elige el que necesites</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }} id="forma-pago">
              <InputLabel>
                Forma de Pago
              </InputLabel>
              <Select
                value={formaPago}
                label="Forma de Pago"
                onChange={handleChangeFormaPago}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>01 - Efectivo</MenuItem>
                <MenuItem value={20}>02 - </MenuItem>
                <MenuItem value={30}>03 - </MenuItem>
              </Select>
              <FormHelperText>Elige el que necesites</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}