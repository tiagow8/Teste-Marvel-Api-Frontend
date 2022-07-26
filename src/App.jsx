import React , {useEffect,useState} from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import Search from './components/Search';
import axios from 'axios';
import CharacterTable from './components/CharacterTable';
import marvelLogo from './Images/marvelLogo.png';

const theme = createTheme();
const hash =  "bd0722d5750b6362d5ba0212ca36726b";


function App() {

  const[items,setItems] = useState([])
  const[isLoading,setLoading] = useState(true)
  const [query,setQuery] = useState('')

  useEffect(()=>{
    const fetch = async()=>{
      if(query==='') {

        if(localStorage.getItem('favorites')==='[]' || !localStorage.getItem('favorites')){
          localStorage.setItem('favorites', '[]')
          const result = await axios(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=344d40df0c8cc373141c1dc321fae9cf&hash=${hash}`)
          setItems(result.data.data.results)
          setLoading(false)
        } else {
          let favorite = JSON.parse(localStorage.getItem('favorites'))
          setItems(favorite)
          setLoading(false)
        }
      }else{
        const result = await axios(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=344d40df0c8cc373141c1dc321fae9cf&hash=${hash}`)
          setItems(result.data.data.results)
          setLoading(false)
      }
    }
    fetch()
  },[query])

  // função para limpar o localStorage, setar o array vazio e setar o loading como true
  function clearStorage(){
    localStorage.clear()
    setItems([])
    document.location.reload(true)
  }
  // variável para setar o display do botão reset, de acordo com o estado do localStorage
  var displayReset = (localStorage.getItem('favorites')==='[]') ? "none" : "block"

  // função para reload da página no logo da marvel
  function refreshPage(){
    document.location.reload(true)
  }

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppBar  position="relative" >
        <Toolbar className='navBar'>

          <img src={marvelLogo} alt='MarvelLogo' style={{width: "100px", cursor:"pointer"}} onClick={refreshPage}/>

          <div style={{position: "relative", width: "100%"}}> 
          <Typography className='title' variant="h6" color="inherit" style={{textTransform: "uppercase", textAlign: "center", fontWeight:"900", fontSize:"35px"}}>
          ⚡​Marvel 🎯​ Characters⚡​
          </Typography>
          </div>
        </Toolbar>
      </AppBar>
    <main className='body'>

      <Search search={(q)=>setQuery(q)}></Search>
      <div className='buttonReset' style={{display:displayReset}}>
        <button className="btnReset" onClick={clearStorage}>Reset ❌​</button>
      </div>

      <CharacterTable items={items} isLoading={isLoading} />

    </main>
    {/* Footer */}
    <Box sx={{ bgcolor: 'background.paper'}} className="footer">
      <Typography variant="h6" align="center" gutterBottom>
      ​⚡​Tiago🎯​Gomes🙋🏽‍♂️​
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        ⚛️Projeto elaborado para desenvolver os conhecimentos em react e consumo de api.​⚡​ 
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/tiago-g-95b637205/">
        Linkedin Tiago
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </Box>
    {/* End footer */}
  </ThemeProvider>
  );
}

export default App;
