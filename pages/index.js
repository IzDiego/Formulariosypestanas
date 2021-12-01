import APestanas from './components/APestanas'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



export default function Home() {
  return (
    <div >
    <AppBar position="relative">
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
