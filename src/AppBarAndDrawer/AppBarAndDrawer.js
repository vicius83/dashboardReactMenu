import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from "@material-ui/core/Typography";
import Badge from '@material-ui/core/Badge';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import { Notifications, PowerSettingsNew  } from '@material-ui/icons';
import logo from '../imagens/logo_iqueest_oficial_tr.png';
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";

import { useAuth } from '../Providers/Auth';

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  logo: {
    color: "white",
    textDecoration: "none",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: "#F7D358",
    },
    backgroundColor: "#F7D358",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color:'black',
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  active: {
    backgroundColor: theme.palette.action.selected,
  },
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

function ResponsiveDrawer(props,{ onClick }) {
  const { container, setCurrentTheme, currentTheme, informaPaiLogado } = props;
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  //const theme = currentTheme;
  const { pathname } = useLocation();
  const isHome = false; // pathname === "/";
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mensagem, setMensagem] = React.useState("");
  const [msgSair, setMsgSair] = React.useState(false);
  const [idCliente, setIdCliente] = React.useState(0);
  const [nomeCliente, setNomeCliente] = React.useState("");
  const [apelido, setApelido] = useState("");
  const [cadCompleto, setCadCompleto] = useState(false);
  const [mostraMsg, setMostraMsg] = useState(false)

  const { user, setUser } = useAuth();

  const [ usuario, setUsuario] = useState({
    id:0,
    nome:"",
    email:""
  })   

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function sair() {
    sessionStorage.removeItem("user");
    informaPaiLogado(false);
    setUser({
      id: null,
      nome:"",
      email:"",
      lembra: false
    })

    setIdCliente(0);
    setNomeCliente("");
    setMsgSair(false); 
    history.push('/');
  }

  function click(texto){
    setMobileOpen(false);   
    if(texto === 'meusAnuncios'){
      //history.push('/meusAnuncios');
      //window.location.reload(false) 
    }
  }

  useEffect(() =>{
    const userStorage = sessionStorage.getItem("user");

    if(userStorage){
      let user = JSON.parse(userStorage)
      setUsuario(user)
      setApelido(user.nome.split(' ').slice(0,2)[0])
      setCadCompleto(user.cadCompleto);
      console.log(user);
      if(!user.cadCompleto){
        setMostraMsg(true)
      }
    }else{
      setUsuario({
        id: null,
        nome:"",
        email:"",
      })
    }  
  },[]);

  //POPPER
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  /* Modifying the source code from the template example to use the react router pathname hook to set
  selected prop and to use the react router component prop */

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[
          
          { label: "Novo Anúncio", text: "novoAnuncio", icon: "queue_play_next" },
          { label: "Meus Anúncios", text: "meusAnuncios", icon: "dvr" },
         
        ].map(({ label, text, icon }, index) => (
          <ListItem
            component={RouterLink}
            selected={pathname === `/${text}`}
            to={`/${text}`}
            button
            key={text}
            disabled={false}
            onClick={() => {
              click(text);
              props.onClick(); 
            }}            
          >
            <ListItemIcon>
              <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label.toUpperCase()} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div
        style={{
          height: "64px",
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "contrast(75%)",
          
          position: "absolute",
          top: "0px",
          width: "100%",
          zIndex: -2,
        }}
      />
      <AppBar position="sticky" className={isHome ? "" : classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid container justifyContent="space-evenly" wrap="nowrap">
            <Grid container item xs={4} lg={2} align="center" justify="left">
                <Typography
                  variant="h6"
                  noWrap
                  to={"/"}
                  component={RouterLink}
                  className={classes.logo}
                  align={'left'}
                >
                  <img src={logo} height="50px" className="App-logo" alt="logo" style={{marginLeft:'0', marginTop:6}}/>
                </Typography>
            </Grid>
            <Grid container item xs lg={7} justify="flex-end" justifyContent="flex-end">
              <Typography style={{color:'black'}}>
                <Box component='div' textAlign='right' m={1} paddingTop={2} margin={0} align={'center'}>
                  Olá, {apelido}  
                </Box>
              </Typography>
            </Grid>
            <Grid container item xs={3} lg={1} justify="flex-end" justifyContent="flex-end">
              <Box component="div" paddingTop={1} style={{float:'right'}}>
                
                  <IconButton onClick={() => setMensagem("Você não possui Notificações nessa área.")} 
                              style={{display:'block',  float:'right', paddingTop:10, paddingLeft:0, paddingRight:5}}>
                      <Badge badgeContent={0} color="error">
                        <Notifications fontSize="small" color="primary" />
                      </Badge>
                  </IconButton>
                
              </Box>
              <Box component="div" paddingTop={1} style={{float:'left'}}>
                <IconButton onClick={() => setMsgSair(true)}
                            style={{display:'block', float:'left', paddingTop:10, paddingLeft:5, paddingRight:0}}>
                    <PowerSettingsNew fontSize="small" color="primary" />
                </IconButton>
              </Box>
            </Grid>
            {/*<Grid container item xs justify="left">
              <Box component="div" paddingTop={1} style={{float:'left'}}>
                <IconButton onClick={() => setMsgSair(true)}
                            style={{display:'block', marginLeft:'auto', marginRight:'auto', float:'left'}}>
                    <PowerSettingsNew fontSize="small" color="primary" />
                </IconButton>
              </Box>
              
            </Grid>*/}
          </Grid>
              <Dialog open={msgSair}>
                <DialogContent>
                    <DialogContentText>Deseja sair?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={sair} color="primary" style={{ textTransform: 'none' }}>Sim</Button>
                    <Button onClick={() => { setMsgSair(false); }} color="primary" autoFocus style={{ textTransform: 'none' }}>Não</Button>
                </DialogActions>
              </Dialog>
              <Dialog open={mensagem.length > 0} fullWidth={true} maxWidth="xs">
                <DialogContent>
                    <DialogContentText>{mensagem}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setMensagem("")} color="primary" style={{ textTransform: 'none' }}>OK</Button>
                </DialogActions>
              </Dialog>
        </Toolbar>
      </AppBar>
      {isHome && !mobileOpen ? (
        <div />
      ) : (
        <nav aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open={isHome}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      )}

      <Dialog open={mostraMsg} fullWidth={true} maxWidth="xs">
        <DialogContent>
            <DialogContentText>Complete seus dados em MINHA CONTA para acessar todos os recursos!</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setMostraMsg(false)} color="primary" style={{ textTransform: 'none' }}>OK</Button>
        </DialogActions>
      </Dialog>   
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  ),
};

export default ResponsiveDrawer;
