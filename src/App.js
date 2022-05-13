import React, { useState, useEffect, useRef } from "react";
import AppBarAndDrawer from "./AppBarAndDrawer/AppBarAndDrawer";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./Home/Home";
import { createTheme , ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "./theme";
import Content from './Dashboard/Content';
import { useAuth } from "./Providers/Auth";
import NovoAnuncio from "./Anuncios/NovoAnuncio"; 
import MeusAnuncios from "./Anuncios/MeusAnuncios";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
 

const theme = createTheme({
  palette: {
      primary: {
          main: '#000000',
      },
      secondary: {
          main: '#BEBEBE',
      },
      text: {
          primary: '#4F4F4F',
          secondary: '#F8961B',
          disabled: '#A9A9A9',
          hint: '#F9C205',
      }
  },
  overrides: {
    MuiInputBase: {
          input: {
            '&$disabled':{
              "-webkit-text-fill-color": '#A9A9A9' 
            }
          }
      }
  },
});

export default function App() {

  const childRef = useRef();
  const { user } = useAuth();
  //console.log(user);
  
  const [currentTheme, setCurrentTheme] = useTheme();
  const [logado, setLogado] = useState(false);
  const [idCliente, setIdCliente] = useState(0);
  const [nomeCliente, setNomeCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");

  const resetChildState = () => {
    if (childRef.current.resetMyState) {
      childRef.current.resetMyState();
    }
  };

  function informaLogado(log,user) {
    setLogado(log);
    if(log)
      setIdCliente(user.id)   
  }
    
  useEffect(() =>{
    let userSession = sessionStorage.getItem('user');
    
    //console.log(userSession)
    if(userSession){
      let user = JSON.parse(userSession)
      //console.log(user)
      setLogado(true)  
      setIdCliente(user.id)
    }else{
      setLogado(false)  
      setIdCliente(0)
    }  

    window.scrollTo(0, 0)
  },[]);

  return (
    <>   
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>  
        
            <Router>
             
                <AppBarAndDrawer
                  currentTheme={theme}
                  setCurrentTheme={setCurrentTheme}
                  informaPaiLogado={informaLogado}
                  onClick={resetChildState}
                />
                {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                <Switch>
                  
                  <Route path="/novoAnuncio">
                    <Content>
                      <NovoAnuncio idCliente={idCliente} />
                    </Content>
                  </Route>
                  <Route path="/meusAnuncios">
                    <Content>
                      <MeusAnuncios idCliente={idCliente} ref={childRef}/>
                    </Content>
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/" />
                  </Route>
                </Switch>
              
            </Router>  
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </>
  );
}
