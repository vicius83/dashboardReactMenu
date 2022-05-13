import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import { Search, Help, Notifications, Person, StarBorder, KeyboardArrowRight, QueuePlayNext, Dashboard, LineStyle, PowerSettingsNew } from '@material-ui/icons';
import logo from '../imagens/logo_iqueest_oficial_tr.png';
import logo2 from '../imagens/logo_entrada.png';
import whatsapp from '../imagens/whatsapp.png';
import instagram from '../imagens/instagram.png';
import facebook from '../imagens/facebook.png';
import youtube from '../imagens/youtube.png';
import twitter from '../imagens/twitter.png';
import linkedin from '../imagens/linkedin.png';
import internet from '../imagens/internet.png';
import share from '../imagens/share.png';
import arrowdown from '../imagens/arrow-down.png';
import googlemaps from '../imagens/google-maps.png';
import maisinfo from '../imagens/maisinfo.png';
import heart from '../imagens/heart.png';

import '../App.css';
import { BuscaMeusAnuncios, BuscaAnuncio } from '../Service/Requisicoes';
import NovoAnuncio from './NovoAnuncio';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const MeusAnuncios = forwardRef((props, ref) => {
    const [anuncio, setAnuncio] = useState(null);
    const [raioContratado, setRaioContratado] = useState(null);
    const [dataAnuncio, setDataAnuncio] = useState(null);
    const [dataMeusAnuncios, setDataMeusAnuncios] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const [buscando, setBuscando] = useState(false);

    const classes = useStyles();
    const history = useHistory();

    function resetMyState() {
        setDataAnuncio(null);
    }

    useImperativeHandle(ref, () => ({resetMyState}),[]);

    async function buscaDadosAnunciosCliente() {
        var wAuxDataMeusAnuncios = undefined;

        setBuscando(true);

        for (let i = 0; i <= 1; i++) {
            if (i == 0) {
                await BuscaMeusAnuncios(props.idCliente)
                    .then((rAuxDataAnuncios) => wAuxDataMeusAnuncios = rAuxDataAnuncios)
                    .catch((error) => { });
            }
            if (i == 1) {
                if (wAuxDataMeusAnuncios !== undefined && wAuxDataMeusAnuncios.length > 0) {
                    setDataMeusAnuncios(wAuxDataMeusAnuncios);
                    setBuscando(false);
                }
                else {
                    setBuscando(false);
                    setMensagem('Você não possui Anúncios!');
                }
            }
        }
    }

    async function buscaDadosAnuncio() {
        var wAuxDataAnuncio = undefined;

        var wAuxIdAnuncio = anuncio.substring(1, anuncio.length);
        var wAuxTipo = anuncio.substring(0, 1);

        setBuscando(true);

        for (let i = 0; i <= 1; i++) {
            if (i == 0) {
                await BuscaAnuncio(wAuxIdAnuncio, wAuxTipo)
                    .then((rAuxDataAnuncio) => wAuxDataAnuncio = rAuxDataAnuncio)
                    .catch((error) => { });
            }
            if (i == 1) {
                if (wAuxDataAnuncio !== undefined) {
                    setDataAnuncio(wAuxDataAnuncio);
                }
            }
        }

        setBuscando(false);
    }

    useEffect(() => {
        if (dataMeusAnuncios == null) {
            setDataAnuncio(null);
            buscaDadosAnunciosCliente();
        }
    }, [dataMeusAnuncios]);

    useEffect(() => {
        if (anuncio != null) {
            // TIRA FOCO DO CONTROLE
            document.getElementById("sel_01").blur();

            setRaioContratado(dataMeusAnuncios.filter((item, indice, vetor) => item.id == anuncio)[0].raiocontratado);

            setDataAnuncio(null);

            buscaDadosAnuncio();
        }
    }, [anuncio]);

    function informaFechaOpcao() {
        history.replace("/");
    }

    return (
        <>
            {dataAnuncio == null ?
                <>
                    <Grid className="FundoBranco" container direction="column" xs alignItems="center" justifyContent="center">
                        <Grid item>
                            {dataMeusAnuncios != null ?
                                <Card style={{ padding: 10, margin: 10 }} variant="outlined">
                                    <h3 style={{ margin: 0, textAlign: 'center' }}>Meus Anúncios</h3>
                                    <CardContent>
                                        <Grid container direction="column" alignItems="center">
                                            <Grid item container direction="row" xs alignItems="center" justifyContent="flex-start">
                                                <p style={{ margin: 0, marginLeft: 20 }} className="FontePrompts">Selecione um Anúncio:</p>
                                                <Select id="sel_01" style={{ height: 30, margin: 0, marginLeft: 10 }} native variant="outlined" value={anuncio}
                                                    onChange={(event) => {
                                                        if (event.target.value == "") {
                                                            setMensagem('Selecione um Anúncio!');
                                                        }
                                                        else {
                                                            setAnuncio(event.target.value);
                                                        }
                                                    }}>
                                                    <option value="" />
                                                    {dataMeusAnuncios.map((item, indice, vetor) => <option key={indice} value={item.id}>{item.titulo}</option>)}
                                                </Select>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            :
                                null
                            }
                        </Grid>
                    </Grid>

                    <Backdrop className={classes.backdrop} open={buscando}>
                        <CircularProgress color="inherit" />
                    </Backdrop>

                    <Dialog open={mensagem.length > 0} fullWidth={true} maxWidth="xs">
                        <DialogContent>
                            <DialogContentText>{mensagem}</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                if (mensagem === 'Você não possui Anúncios!') history.replace("/");
                                setMensagem("");
                            }} color="primary" style={{ textTransform: 'none' }}>OK</Button>
                        </DialogActions>
                    </Dialog>
                </>
            :
                <NovoAnuncio idCliente={props.idCliente} informaPaiFechaOpcao={informaFechaOpcao}
                    anuncio={anuncio}
                    raioContratado={raioContratado}
                    textoReduzido={dataAnuncio.titulo}
                    textoExpandido={dataAnuncio.descricao}
                    telefone={dataAnuncio.telefone}
                    botaoSite={dataAnuncio.site}
                    botaoWhatsapp={dataAnuncio.whatsapp}
                    botaoInstagram={dataAnuncio.instagram}
                    botaoFacebook={dataAnuncio.facebook}
                    botaoYoutube={dataAnuncio.youtube}
                    botaoTwitter={dataAnuncio.twitter}
                    botaoLinkedIn={dataAnuncio.linkedin}
                    imgBanner={dataAnuncio.url}
                    destaca={dataAnuncio.grifar}
                    diaSem1={dataAnuncio.diasemana1}
                    diaSem2={dataAnuncio.diasemana2}
                    hora1={dataAnuncio.horario1}
                    hora2={dataAnuncio.horario2}
                    hora3={dataAnuncio.horario3}
                    hora4={dataAnuncio.horario4}
                    cidade={dataAnuncio.cidade}
                    tags={dataAnuncio.tags}
                />
            }
        </>
    );
});
                                
export default MeusAnuncios;
                    
