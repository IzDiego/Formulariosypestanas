import APestanas from './components/pagos/APestanas'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Header from  "./components/Header";

export default function Home() {
  return (
    <div >
    <AppBar position="relative">
    <Header />
        <Toolbar>
          <Typography variant="h5" color="black" noWrap>
            Pagos
          </Typography>
        </Toolbar>
      </AppBar>
      <APestanas/>
    </div>
  )
}
