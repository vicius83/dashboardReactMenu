import React, { useState, useEffect, useLayoutEffect, useReducer, useContext, useCallback, useRef } from 'react';
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
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';

import { ImageSearch, AddPhotoAlternateOutlined, KeyboardArrowRight, KeyboardArrowLeft, CancelOutlined, PictureAsPdfOutlined } from '@material-ui/icons';

import logo from '../imagens/logo_iqueest_oficial_tr.png';
import logo2 from '../imagens/logo_entrada.png';
import whatsapp from '../imagens/whatsapp.png';
import instagram from '../imagens/instagram.png';
import facebook from '../imagens/facebook.png';
import youtube from '../imagens/youtube.png';
import twitter from '../imagens/twitter.png';
import linkedin from '../imagens/linkedin.png';
import internet from '../imagens/internet.png';
import googlemaps from '../imagens/google-maps_2.png';
import heart from '../imagens/heart.png';
import arrowdown from '../imagens/arrow-down.png';
import arrowup from '../imagens/arrow-up.png';
import share from '../imagens/share.png';
import fone from '../imagens/telefone.png';

import '../App.css';
import { GravaPreAnuncio } from '../Service/Requisicoes';

const useStyles = makeStyles({
    gridEmForm: {
        marginBottom: '10px',
        alignItems: 'center'
    },
    fonteMenorTextField: {
        fontSize: 12
    },
    fonteMenorInputLabel: {
        fontSize: 12
    }
});

var wDiaSem1 = "";
var wDiaSem2 = "";
var wIdAnuncio = "";
var wAuxAltura = 0;
var wAuxIndImg = -1;

function NovoAnuncio(props) {
    const [contReduzido, setContReduzido] = useState(props.textoReduzido != null ? props.textoReduzido.length : 0);
    const [textoReduzido, setTextoReduzido] = useState(props.textoReduzido);
    const [contExpandido, setContExpandido] = useState(props.textoExpandido != null ? props.textoExpandido.length : 0);
    const [textoExpandido, setTextoExpandido] = useState(props.textoExpandido);
    const [destaca, setDestaca] = useState(props.destaca != null ? props.destaca : []);
    const [destaca2, setDestaca2] = useState([]);
    const [tags, setTags] = useState(props.tags != null ? props.tags : []);
    const [tags2, setTags2] = useState([]);
    const [diaSem, setDiaSem] = useState(null);
    const [diaSem1, setDiaSem1] = useState(9);
    const [diaSem2, setDiaSem2] = useState(9);
    const [diaSemana1, setDiaSemana1] = useState(props.diaSem1); 
    const [diaSemana2, setDiaSemana2] = useState(props.diaSem2); 
    const [vetDiaSem, setVetDiaSem] = useState([false, false, false, false, false, false, false]);
    const [atuDias, setAtuDias] = useState(false);
    const [hora1, setHora1] = useState(props.hora1);
    const [hora2, setHora2] = useState(props.hora2);
    const [hora3, setHora3] = useState(props.hora3);
    const [hora4, setHora4] = useState(props.hora4);
    const [telefone, setTelefone] = useState(props.telefone);
    const [auxTelefone, setAuxTelefone] = useState(props.telefone != null ? props.telefone.replace(/[^0-9]/g, '') : "");
    const [botaoWhatsapp, setBotaoWhatsapp] = useState(props.botaoWhatsapp);
    const [botaoInstagram, setBotaoInstagram] = useState(props.botaoInstagram);
    const [botaoFacebook, setBotaoFacebook] = useState(props.botaoFacebook);
    const [botaoYoutube, setBotaoYoutube] = useState(props.botaoYoutube);
    const [botaoTwitter, setBotaoTwitter] = useState(props.botaoTwitter);
    const [botaoLinkedIn, setBotaoLinkedIn] = useState(props.botaoLinkedIn);
    const [botaoSite, setBotaoSite] = useState(props.botaoSite);
    const [telaAtual, setTelaAtual] = useState(1);
    const [bkpImgBanner, setBkpImgBanner] = useState([]);
    const [imgBanner, setImgBanner] = useState([]);
    const [urlImgBanner, setUrlImgBanner] = useState(props.imgBanner);
    const [indImgBanners, setIndImgBanners] = useState(0);
    const [expandido, setExpandido] = useState(false);
    const [maisInfo, setMaisInfo] = useState(false);
    const [cidade, setCidade] = useState(props.cidade)
    const [gravandoDados, setGravandoDados] = useState(false);
    const [mensagem, setMensagem] = useState("");

    const classes = useStyles();
    const fileInput = useRef();
    const wRefAlturaPagina = useRef();
    const wRefLarguraAnuncio = useRef();

    useEffect(() => {
        if (destaca.length > 0) {
            if (textoExpandido == null || textoExpandido.length == 0) {
                setMensagem('Trecho informado não encontrado no Texto Expandido!');
                setDestaca([]);
                setDestaca2([]);
            }
            else {
                for (let z = 0; z < destaca.length; z++) {
                    if (textoExpandido.indexOf(destaca[z]) == -1) {
                        setMensagem('Trecho informado não encontrado no Texto Expandido!');
                        setDestaca2([]);
                        setDestaca(destaca => destaca.filter((valor, indice, vetor) => { return indice != z; }));
                    }
                }
            }
        }
    }, [textoExpandido]);

    useEffect(() => {
        if (destaca.length > destaca2.length) {
            if (textoExpandido == null || textoExpandido.indexOf(destaca[destaca.length - 1]) == -1) {
                setMensagem('Trecho informado não encontrado no Texto Expandido!');
                destaca.pop();
                setDestaca(destaca);
            }
            else {
                let wAuxDestaca2 = [];
                for (let z = 0; z < destaca.length; z++) {
                    wAuxDestaca2[z] =
                        <Paper variant="outlined" style={{ margin: 2, borderRadius: 8, borderColor: '#F8961B', paddingLeft: 2, paddingRight: 2, height: 24, alignItems: 'center' }}>
                            {destaca[z]}
                            <IconButton id={z} style={{ padding: 0 }} onClick={() => {
                                setDestaca2([]);
                                setDestaca(destaca => destaca.filter((valor, indice, vetor) => { return indice != document.activeElement.id; }));
                            }}>
                                <CancelOutlined fontSize="small" />
                            </IconButton>
                        </Paper>
                }
                setDestaca2(wAuxDestaca2);
            }
        }
    }, [destaca]);

    useEffect(() => {
        if (tags.length > tags2.length) {
            let wAuxTags2 = [];
            for (let z = 0; z < tags.length; z++) {
                wAuxTags2[z] =
                    <Paper variant="outlined" style={{ margin: 2, borderRadius: 8, borderColor: '#F8961B', paddingLeft: 2, paddingRight: 2, height: 24, alignItems: 'center' }}>
                        {tags[z]}
                        <IconButton id={z} style={{ padding: 0 }} onClick={() => {
                            setTags2([]);
                            setTags(tags => tags.filter((valor, indice, vetor) => { return indice != document.activeElement.id; }));
                        }}>
                            <CancelOutlined fontSize="small" />
                        </IconButton>
                    </Paper>
            }
            setTags2(wAuxTags2);
        }
    }, [tags]);

    useEffect(() => {
        if (diaSem != null) {
            if (vetDiaSem[diaSem] == true) {
                if (diaSem1 == 9) {
                    setDiaSem1(diaSem);
                }
                else {
                    if (diaSem > diaSem1) {
                        setDiaSem2(diaSem);
                    }
                    else {
                        setDiaSem2(diaSem1);
                        setDiaSem1(diaSem);
                    }
                }
            }
            else {
                if (diaSem >= diaSem1 && diaSem < diaSem2) {
                    setDiaSem1(diaSem + 1);
                }
                else if (diaSem == diaSem2 && diaSem > diaSem1) {
                    setDiaSem2(diaSem - 1);
                }
                else {
                    setDiaSem1(9);
                    setDiaSem2(9);
                }
            }
        }
    }, [vetDiaSem]);

    useEffect(() => {
        if (diaSemana1 != null && diaSemana2 != null) {
            switch (diaSemana1) {
                case "SEG":
                    setDiaSem1(0);
                    break;
                case "TER":
                    setDiaSem1(1);
                    break;
                case "QUA":
                    setDiaSem1(2);
                    break;
                case "QUI":
                    setDiaSem1(3);
                    break;
                case "SEX":
                    setDiaSem1(4);
                    break;
                case "SÁB":
                    setDiaSem1(5);
                    break;
                case "DOM":
                    setDiaSem1(6);
                    break;
            }

            switch (diaSemana2) {
                case "SEG":
                    setDiaSem2(0);
                    break;
                case "TER":
                    setDiaSem2(1);
                    break;
                case "QUA":
                    setDiaSem2(2);
                    break;
                case "QUI":
                    setDiaSem2(3);
                    break;
                case "SEX":
                    setDiaSem2(4);
                    break;
                case "SÁB":
                    setDiaSem2(5);
                    break;
                case "DOM":
                    setDiaSem2(6);
                    break;
            }
        }
    }, [diaSemana1, diaSemana2]);

    useEffect(() => {
        if (diaSem1 != 9 && diaSem2 != 9) {
            setAtuDias(true);
        }
    }, [diaSem1, diaSem2]);

    useEffect(() => {
        if (atuDias == true) {
            setDiaSem(null);

            setVetDiaSem([
                0 >= diaSem1 && 0 <= diaSem2 ? true : false,
                1 >= diaSem1 && 1 <= diaSem2 ? true : false,
                2 >= diaSem1 && 2 <= diaSem2 ? true : false,
                3 >= diaSem1 && 3 <= diaSem2 ? true : false,
                4 >= diaSem1 && 4 <= diaSem2 ? true : false,
                5 >= diaSem1 && 5 <= diaSem2 ? true : false,
                6 >= diaSem1 && 6 <= diaSem2 ? true : false,
            ]);

            setAtuDias(false);
        }
    }, [atuDias]);

    function validaTextoReduzido(event) {
        if (event.target.value.length > 40) {
            setTextoReduzido(event.target.value.substring(0, 40));
            setContReduzido(40);
        } else {
            setContReduzido(event.target.value.length);
            setTextoReduzido(event.target.value);
        }
    }

    function validaTextoExpandido(event) {
        if (event.target.value.length > 300) {
            setTextoExpandido(event.target.value.substring(0, 300));
            setContExpandido(300);
        } else {
            setContExpandido(event.target.value.length);
            setTextoExpandido(event.target.value);
        }
    }

    ////
    // ROTINA PARA DESTACAR OS TRECHOS DE TEXTO QUE DEVEM SER GRIFADOS
    ////
    var wVetDescricao;
    var wAuxDescricao = textoExpandido;

    if (destaca.length > 0) {
        destaca.forEach((valor) => { wAuxDescricao = wAuxDescricao.replace(valor, 'ø' + valor + 'ø') });

        wVetDescricao = wAuxDescricao.split('ø').map((valor, indice) => {
            if (destaca.indexOf(valor) >= 0) {
                return <span key={indice.toString()} style={{ color: 'white', backgroundColor: '#F9C205' }}>{valor}</span>;
            } else {
                return <span key={indice.toString()}>{valor}</span>;
            }
        });
    }
    else {
        wVetDescricao = wAuxDescricao;
    }
    ////
    // FIM - ROTINA PARA DESTACAR OS TRECHOS DE TEXTO QUE DEVEM SER GRIFADOS
    ////

    function mostraMaisInfo() {
        if (imgBanner.length > 0) {
            if (telefone !== null || (hora1 !== null && hora2 !== null)) {
                setMaisInfo(true);
            }
        }
    }

    useEffect(() => {
        if (urlImgBanner != null) {
            baixaArquivo();
        }
    }, [urlImgBanner]);    

    async function baixaArquivo() {
        for (let z = 0; z < urlImgBanner.length; z++) {
            await fetch(urlImgBanner[z])
                .then((r) => r.blob())
                .then((blob) => {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(blob);
                    fileReader.onload = (e) => {
                        setImgBanner((vet) => [...vet, e.target.result]);
                        setBkpImgBanner((vet) => [...vet, e.target.result]);
                    };
                })
                .catch(() => setMensagem('Ocorreu um erro ao tentar recuperar a imagem do banner desse Anúncio!'))
        }
    }

    async function selectArquivo({ target }) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            if (imgBanner.length > 0) {
                if (wAuxIndImg > 0) {
                    setIndImgBanners(wAuxIndImg);
                    setImgBanner((vet) => [...vet.slice(0, wAuxIndImg), e.target.result, ...vet.slice((wAuxIndImg + 1))]);
                }
                else {
                    setImgBanner((vet) => [...vet.slice(0, indImgBanners), e.target.result, ...vet.slice((indImgBanners + 1))]);
                }
            }
            else {
                setIndImgBanners(0);
                setImgBanner([e.target.result]);
            }

            wAuxIndImg = -1;
        };
    }

    async function baixaTermo() {
        const wA = document.createElement("a");
        wA.rel = "noreferrer noopener";
        wA.target = "_blank";
        wA.download = "termo_autor_" + wIdAnuncio + ".pdf";
        wA.href = "https://www.iqueest.com.br/imagens/termo_autorizacao.pdf";
        wA.dispatchEvent(new MouseEvent('click'));
    }

    function avancaTela2() {
        window.scrollTo(0, 0);

        let segue = true;

        if (textoReduzido == null || textoReduzido.length == 0) {
            setMensagem('Texto Reduzido não foi preenchido.');
            segue = false;
        }

        if (textoExpandido == null || textoExpandido.length == 0) {
            setMensagem('Texto Expandido não foi preenchido.');
            segue = false;
        }

        if ((diaSem1 != 9 && diaSem2 == 9) ||
            (diaSem1 == 9 && diaSem2 != 9) ||
            (diaSem1 != 9 && diaSem2 != 9 && (!hora1 || !hora2)) ||
            (hora3 && (!hora4 || !hora1 || !hora2)) ||
            (hora4 && (!hora3 || !hora1 || !hora2)) ||
            (hora1 && !hora2) ||
            (hora2 && !hora1) ||
            ((hora1 && hora1.indexOf("_") > 0) || (hora2 && hora2.indexOf("_") > 0) || (hora3 && hora3.indexOf("_") > 0) || (hora4 && hora4.indexOf("_") > 0))) {

            setMensagem('Há algum erro no preenchimento do Horário de Funcionamento.');
            segue = false;
        }

        if (telefone && telefone.indexOf("_") > 0) {
            setMensagem('Há algum erro no preenchimento do Telefone.');
            segue = false;
        }

        if (botaoWhatsapp && (botaoWhatsapp.length < 10 || botaoWhatsapp.search(/\D/) > 0)) {
            setMensagem('Há algum erro no preenchimento do Whatsapp.');
            segue = false;
        }

        if (segue == false) {
            return;
        }

        switch (diaSem1) {
            case 0:
                wDiaSem1 = "SEG";
                break;
            case 1:
                wDiaSem1 = "TER";
                break;
            case 2:
                wDiaSem1 = "QUA";
                break;
            case 3:
                wDiaSem1 = "QUI";
                break;
            case 4:
                wDiaSem1 = "SEX";
                break;
            case 5:
                wDiaSem1 = "SÁB";
                break;
            case 6:
                wDiaSem1 = "DOM";
                break;
        }

        switch (diaSem2) {
            case 0:
                wDiaSem2 = "SEG";
                break;
            case 1:
                wDiaSem2 = "TER";
                break;
            case 2:
                wDiaSem2 = "QUA";
                break;
            case 3:
                wDiaSem2 = "QUI";
                break;
            case 4:
                wDiaSem2 = "SEX";
                break;
            case 5:
                wDiaSem2 = "SÁB";
                break;
            case 6:
                wDiaSem2 = "DOM";
                break;
        }

        wAuxAltura = wRefAlturaPagina.current.clientHeight;

        setTelaAtual(2);
    }

    async function gravaDados() {
        if (imgBanner.length == 0) {
            setMensagem('Não foi selecionada uma imagem para o banner do Anúncio.');
            return;
        }

        setGravandoDados(true);

        for (let i = 0; i <= 0; i++) {
            if (i == 0) {
                const dadosPreAnuncio = {
                    id: props.anuncio != null && props.anuncio.substring(0, 1) == "P" ? Number(props.anuncio.substring(1, props.anuncio.length)) : null,
                    idcliente: props.idCliente,
                    titulo: textoReduzido,
                    descricao: textoExpandido,
                    telefone: telefone,
                    site: botaoSite,
                    whatsapp: botaoWhatsapp,
                    instagram: botaoInstagram,
                    facebook: botaoFacebook,
                    youtube: botaoYoutube,
                    twitter: botaoTwitter,
                    linkedin: botaoLinkedIn,
                    url: imgBanner !== bkpImgBanner ? imgBanner: null,
                    grifar: destaca,
                    diasemana1: wDiaSem1,
                    diasemana2: wDiaSem2,
                    horario1: hora1,
                    horario2: hora2,
                    horario3: hora3,
                    horario4: hora4,
                    tags: tags,
                    idanuncioexistente: props.anuncio != null && props.anuncio.substring(0, 1) == "A" ? Number(props.anuncio.substring(1, props.anuncio.length)) : null, 
                    acao: props.anuncio != null && props.anuncio.substring(0, 1) == "P" ? "A" : "I"
                };

                await GravaPreAnuncio(dadosPreAnuncio)
                    .then((r) => {
                        setGravandoDados(false);
                        if (r.toString().substring(0, 7) === 'Sucesso') {
                            wIdAnuncio = r.toString().substring(r.toString().indexOf("|") + 1);
                            setMensagem('O Anúncio foi salvo com sucesso! Aguarde sua publicação no iQueest.');
                        }
                        else if (r == 'Falha_Img_Tam') {
                            setMensagem('O arquivo de imagem selecionado tem tamanho maior do que 128kb!');
                        }
                        else if (r == 'Falha_Img_Tip') {
                            setMensagem('O tipo do arquivo de imagem selecionado não é válido!');
                        }
                        else {
                            setMensagem('Ocorreu algum erro ao tentar salvar o Anúncio!');
                        }
                    })
                    .catch((error) => { setGravandoDados(false); });
            }
        }
    }

    function aposSalvarAnuncio() {
        if (props.anuncio == null) {
            window.scrollTo(0, 0);
            setTelaAtual(3);
        }
        else {
            props.informaPaiFechaOpcao();
        }
    }

    return (
        <>
            <Card style={{ width: '100%', minWidth: '79vw' }} variant="outlined" ref={wRefLarguraAnuncio}>
                <CardContent style={{ padding: 0 }}>
                    <Grid container direction="row" alignItems="center" justifyContent="space-between">
                        <Grid item container lg={4} xs={12}>
                            {props.anuncio != null && props.anuncio.substring(0, 1) == "P" ?
                                <Paper variant="outlined" style={{ margin: 10, paddingLeft: 20, paddingRight: 20, borderRadius: 5, height: 15, alignItems: "center" }}>
                                    <h6 style={{ margin: 0, color: "red" }}>Anúncio aguardando publicação no iQueest</h6>
                                </Paper>
                            :
                                <>
                                    {props.anuncio != null && props.anuncio.substring(0, 1) == "A" ?
                                        <Paper variant="outlined" style={{ margin: 10, paddingLeft: 20, paddingRight: 20, borderRadius: 5, height: 15, alignItems: "center" }}>
                                            <h6 style={{ margin: 0, color: "green" }}>Anúncio publicado no iQueest</h6>
                                        </Paper>
                                    :
                                        null
                                    }
                                </>
                            }
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <Typography variant="h6" align="center">
                                {props.anuncio != null ?
                                    <>MEUS ANÚNCIOS</>
                                :
                                    <>NOVO ANÚNCIO</>
                                }
                            </Typography>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            {props.raioContratado != null && props.raioContratado != 0 ?
                                <Grid container direction="row" alignItems="center" justifyContent="flex-end">
                                    <p style={{ margin: 0, marginRight: 10 }} className="FontePrompts">Raio Contratado: </p>
                                    <p style={{ margin: 0, marginRight: 20 }} className="FonteInfosGray">{props.raioContratado} Km</p>
                                </Grid>
                            :
                                null
                            }
                        </Grid>
                    </Grid>

                    <Card style={{ padding: 10, margin: 10, borderRadius: 15 }} variant="elevation" elevation={5}>
                        <CardContent style={{ padding: 10 }}>
                            {telaAtual == 1 ?
                                <Grid container spacing={2} ref={wRefAlturaPagina}>
                                    <Grid container direction="column" lg={7} xs={12} alignItems="stretch" style={{ height: '100%' }}>
                                        <Grid container classes={{ root: classes.gridEmForm }} xs>
                                            <Grid container direction="column" alignItems="flex-end">
                                                <p style={{ marginRight: 5 }} className="FonteDicas">{contReduzido}/40</p>
                                            </Grid>
                                            <TextField
                                                id="texTextoReduzido"
                                                label="Texto Reduzido*"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                value={textoReduzido}
                                                onChange={validaTextoReduzido}
                                            />
                                            <p className="FonteDicas">Texto reduzido do Anúncio visualizado abaixo do banner</p>
                                        </Grid>
                                        <Grid container classes={{ root: classes.gridEmForm }} xs>
                                            <Grid container direction="column" xs>
                                                <Grid container direction="column" alignItems="flex-end">
                                                    <p style={{ marginRight: 5 }} className="FonteDicas">{contExpandido}/300</p>
                                                </Grid>
                                                <TextField
                                                    id="texTextoExpandido"
                                                    label="Texto Expandido*"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    multiline
                                                    minRows={6}
                                                    value={textoExpandido}
                                                    onChange={validaTextoExpandido}
                                                />
                                                <p className="FonteDicas">Texto detalhado visualizado quando o usuário expande o Anúncio</p>
                                            </Grid>
                                        </Grid>
                                        <Grid container classes={{ root: classes.gridEmForm }} xs>
                                            <Paper style={{ flexDirection: 'column', width: '100%', minHeight: 80, borderColor: '#BEBEBE' }} variant="outlined">
                                                <p style={{ color: '#F8961B', margin: 0, marginLeft: 8, marginTop: -10, fontSize: 12.5, textAlign: 'center', backgroundColor: 'white', width: 110 }}>Trechos a destacar </p>
                                                <Grid style={{ margin: 5 }} container direction="row" xs alignContent="flex-start">
                                                    <Grid container direction="row">
                                                        {destaca2}
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField
                                                            id="texDestaca"
                                                            variant="standard"
                                                            size="small"
                                                            InputProps={{
                                                                disableUnderline: 'true'
                                                            }}
                                                            inputProps={{ autocapitalize: 'none' }}
                                                            onChange={(event) => {
                                                                if (event.target.value.substring(event.target.value.length - 1) === ";") {
                                                                    setDestaca(destaca => [...destaca, event.target.value.substring(0, event.target.value.length - 1)]);
                                                                    event.target.value = "";
                                                                }
                                                            }}
                                                            onBlur={(event) => {
                                                                if (event.target.value.length > 0) {
                                                                    setDestaca(destaca => [...destaca, event.target.value.substring(0, event.target.value.length)]);
                                                                    event.target.value = "";
                                                                }
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                            <p className="FonteDicas">Informe trechos a destacar no texto expandido do Anúncio, e use ";" para separar. (você pode copiar trechos do texto expandido e colar aqui)</p>
                                        </Grid>
                                        <Grid container classes={{ root: classes.gridEmForm }} xs>
                                            <Paper style={{ flexDirection: 'column', width: '100%', minHeight: 80, borderColor: '#BEBEBE' }} variant="outlined">
                                                <p style={{ color: '#F8961B', margin: 0, marginLeft: 8, marginTop: -10, fontSize: 12.5, textAlign: 'center', backgroundColor: 'white', width: 35 }}>Tags </p>
                                                <Grid style={{ margin: 5 }} container direction="row" xs alignContent="flex-start">
                                                    <Grid container direction="row">
                                                        {tags2}
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField
                                                            id="texTags"
                                                            variant="standard"
                                                            size="small"
                                                            InputProps={{
                                                                disableUnderline: 'true'
                                                            }}
                                                            inputProps={{ style: { textTransform: 'lowercase' }, autocapitalize: 'none' }}
                                                            onChange={(event) => {
                                                                if (event.target.value.substring(event.target.value.length - 1) === ";") {
                                                                    setTags(tags => [...tags, event.target.value.substring(0, event.target.value.length - 1)]);
                                                                    event.target.value = "";
                                                                }
                                                            }}
                                                            onBlur={(event) => {
                                                                if (event.target.value.length > 0) {
                                                                    setTags(tags => [...tags, event.target.value.substring(0, event.target.value.length)]);
                                                                    event.target.value = "";
                                                                }
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                            <p className="FonteDicas">Informe palavras associadas ao Anúncio, para que este seja localizado nas pesquisas por palavras chave, e use ";" para separar (Ex: jardinagem; lanches; beleza;)</p>
                                        </Grid>
                                        <Grid container classes={{ root: classes.gridEmForm }} xs>
                                            <Paper style={{ flexDirection: 'column', width: '100%', borderColor: '#BEBEBE' }} variant="outlined">
                                                <p style={{ color: '#F8961B', margin: 0, marginLeft: 8, marginTop: -10, fontSize: 12.5, textAlign: 'center', backgroundColor: 'white', width: 160 }}>Horário de Funcionamento </p>
                                                <Grid container direction="row" xs alignItems="center">
                                                    <FormControlLabel
                                                        style={{ margin: 5, marginLeft: 15 }}
                                                        value="SEG"
                                                        control={<Checkbox checked={vetDiaSem[0]} style={{ padding: 2 }} color="primary" size="small" onChange={() => { setDiaSem(0); setVetDiaSem(vetDiaSem => [!vetDiaSem[0], vetDiaSem[1], vetDiaSem[2], vetDiaSem[3], vetDiaSem[4], vetDiaSem[5], vetDiaSem[6]]); }} />}
                                                        label="Seg"
                                                        labelPlacement="bottom"
                                                    />
                                                    <FormControlLabel
                                                        style={{ margin: 5 }}
                                                        value="TER"
                                                        control={<Checkbox checked={vetDiaSem[1]} style={{ padding: 2 }} color="primary" size="small" onChange={() => { setDiaSem(1); setVetDiaSem(vetDiaSem => [vetDiaSem[0], !vetDiaSem[1], vetDiaSem[2], vetDiaSem[3], vetDiaSem[4], vetDiaSem[5], vetDiaSem[6]]); }} />}
                                                        label="Ter"
                                                        labelPlacement="bottom"
                                                    />
                                                    <FormControlLabel
                                                        style={{ margin: 5 }}
                                                        value="QUA"
                                                        control={<Checkbox checked={vetDiaSem[2]} style={{ padding: 2 }} color="primary" size="small" onChange={() => { setDiaSem(2); setVetDiaSem(vetDiaSem => [vetDiaSem[0], vetDiaSem[1], !vetDiaSem[2], vetDiaSem[3], vetDiaSem[4], vetDiaSem[5], vetDiaSem[6]]); }} />}
                                                        label="Qua"
                                                        labelPlacement="bottom"
                                                    />
                                                    <FormControlLabel
                                                        style={{ margin: 5 }}
                                                        value="QUI"
                                                        control={<Checkbox checked={vetDiaSem[3]} style={{ padding: 2 }} color="primary" size="small" onChange={() => { setDiaSem(3); setVetDiaSem(vetDiaSem => [vetDiaSem[0], vetDiaSem[1], vetDiaSem[2], !vetDiaSem[3], vetDiaSem[4], vetDiaSem[5], vetDiaSem[6]]); }} />}
                                                        label="Qui"
                                                        labelPlacement="bottom"
                                                    />
                                                    <FormControlLabel
                                                        style={{ margin: 5 }}
                                                        value="SEX"
                                                        control={<Checkbox checked={vetDiaSem[4]} style={{ padding: 2 }} color="primary" size="small" onChange={() => { setDiaSem(4); setVetDiaSem(vetDiaSem => [vetDiaSem[0], vetDiaSem[1], vetDiaSem[2], vetDiaSem[3], !vetDiaSem[4], vetDiaSem[5], vetDiaSem[6]]); }} />}
                                                        label="Sex"
                                                        labelPlacement="bottom"
                                                    />
                                                    <FormControlLabel
                                                        style={{ margin: 5 }}
                                                        value="SAB"
                                                        control={<Checkbox checked={vetDiaSem[5]} style={{ padding: 2 }} color="primary" size="small" onChange={() => { setDiaSem(5); setVetDiaSem(vetDiaSem => [vetDiaSem[0], vetDiaSem[1], vetDiaSem[2], vetDiaSem[3], vetDiaSem[4], !vetDiaSem[5], vetDiaSem[6]]); }} />}
                                                        label="Sáb"
                                                        labelPlacement="bottom"
                                                    />
                                                    <FormControlLabel
                                                        style={{ margin: 5 }}
                                                        value="DOM"
                                                        control={<Checkbox checked={vetDiaSem[6]} style={{ padding: 2 }} color="primary" size="small" onChange={() => { setDiaSem(6); setVetDiaSem(vetDiaSem => [vetDiaSem[0], vetDiaSem[1], vetDiaSem[2], vetDiaSem[3], vetDiaSem[4], vetDiaSem[5], !vetDiaSem[6]]); }} />}
                                                        label="Dom"
                                                        labelPlacement="bottom"
                                                    />
                                                </Grid>
                                                <p className="FonteLogoDirNegrito" style={{ marginLeft: 35 }}>Horário:</p>
                                                <Grid container spacing={2} style={{ marginBottom: 5 }}>
                                                    <Grid item container direction="row" lg={4} xs={12} alignItems="center" justifyContent="center">
                                                        <NumberFormat
                                                            customInput={TextField}
                                                            style={{ width: 65 }}
                                                            id="texHora1"
                                                            label="Início"
                                                            variant="outlined"
                                                            size="small"
                                                            value={hora1}
                                                            onValueChange={(values) => {
                                                                setHora1(values.formattedValue);
                                                            }}
                                                            mask="_"
                                                            format="##:##"
                                                            InputLabelProps={{
                                                                classes: {
                                                                    root: classes.fonteMenorInputLabel,
                                                                },
                                                            }}
                                                            InputProps={{
                                                                classes: {
                                                                    input: classes.fonteMenorTextField,
                                                                },
                                                            }}
                                                        />
                                                        <p className="FontePrompts" style={{ marginLeft: 5, marginRight: 5 }}>às</p>
                                                        <NumberFormat
                                                            customInput={TextField}
                                                            style={{ width: 65 }}
                                                            id="texHora2"
                                                            label="Final"
                                                            variant="outlined"
                                                            size="small"
                                                            value={hora2}
                                                            onValueChange={(values) => {
                                                                setHora2(values.formattedValue);
                                                            }}
                                                            mask="_"
                                                            format="##:##"
                                                            InputLabelProps={{
                                                                classes: {
                                                                    root: classes.fonteMenorInputLabel,
                                                                },
                                                            }}
                                                            InputProps={{
                                                                classes: {
                                                                    input: classes.fonteMenorTextField,
                                                                },
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item container direction="row" lg={4} xs={12} alignItems="center" justifyContent="center">
                                                        <NumberFormat
                                                            customInput={TextField}
                                                            style={{ width: 65 }}
                                                            id="texHora3"
                                                            label="Inicio"
                                                            variant="outlined"
                                                            size="small"
                                                            value={hora3}
                                                            onValueChange={(values) => {
                                                                setHora3(values.formattedValue);
                                                            }}
                                                            mask="_"
                                                            format="##:##"
                                                            InputLabelProps={{
                                                                classes: {
                                                                    root: classes.fonteMenorInputLabel,
                                                                },
                                                            }}
                                                            InputProps={{
                                                                classes: {
                                                                    input: classes.fonteMenorTextField,
                                                                },
                                                            }}
                                                        />
                                                        <p className="FontePrompts" style={{ marginLeft: 5, marginRight: 5 }}>às</p>
                                                        <NumberFormat
                                                            customInput={TextField}
                                                            style={{ width: 65 }}
                                                            id="texHora4"
                                                            label="Final"
                                                            variant="outlined"
                                                            size="small"
                                                            value={hora4}
                                                            onValueChange={(values) => {
                                                                setHora4(values.formattedValue);
                                                            }}
                                                            mask="_"
                                                            format="##:##"
                                                            InputLabelProps={{
                                                                classes: {
                                                                    root: classes.fonteMenorInputLabel,
                                                                },
                                                            }}
                                                            InputProps={{
                                                                classes: {
                                                                    input: classes.fonteMenorTextField,
                                                                },
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                            <p className="FonteDicas">Informe uma sequência de dias da semana (marque o 1º e o último) e/ou o horário de funcionamento do seu serviço ou estabelecimento. Preencha estes campos somente se você possui um horário regular de funcionamento, sem alternâncias de dias ou horários</p>
                                        </Grid>
                                        <Grid container classes={{ root: classes.gridEmForm }} xs={6}>
                                            <NumberFormat
                                                customInput={TextField}
                                                id="texTelefone"
                                                label="Telefone"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                value={telefone}
                                                onValueChange={(values) => {
                                                    setTelefone(values.formattedValue);
                                                    setAuxTelefone(values.value);
                                                }}
                                                mask="_"
                                                format={auxTelefone.toString().substring(2, 3) == "9" ? "(##) #####-####" : "(##) ####-####"}
                                            />
                                            <p className="FonteDicas">Informe o telefone que deve ser exibido no Anúncio</p>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="column" lg alignItems="center">
                                        <Divider orientation="vertical" variant="middle" />
                                    </Grid>
                                    <Grid container direction="column" lg={4} xs={12} justifyContent="space-between">
                                        <Grid container direction="column">
                                            <Grid item classes={{ root: classes.gridEmForm }} xs>
                                                <TextField
                                                    id="texWhatsapp"
                                                    label="Whatsapp"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    value={botaoWhatsapp}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start"><img className="IconeLista" src={whatsapp} alt="whatsapp" /></InputAdornment>,
                                                        classes: {
                                                            input: classes.fonteMenorTextField,
                                                        },
                                                    }}
                                                    onChange={(event) => setBotaoWhatsapp(event.target.value)}
                                                />
                                                <p className="FonteDicas">Número de Whatsapp vinculado ao Anúncio (Ex: 5551999998877)</p>
                                            </Grid>
                                            <Grid item classes={{ root: classes.gridEmForm }} xs>
                                                <TextField
                                                    id="texInstagram"
                                                    label="Instagram"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    value={botaoInstagram}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start"><img className="IconeLista" src={instagram} alt="isntagram" /></InputAdornment>,
                                                        classes: {
                                                            input: classes.fonteMenorTextField,
                                                        },
                                                    }}
                                                    onChange={(event) => setBotaoInstagram(event.target.value)}
                                                />
                                                <p className="FonteDicas">Perfil do Instagram vinculado ao Anúncio (Ex: meu_perfil)</p>
                                            </Grid>
                                            <Grid item classes={{ root: classes.gridEmForm }} xs>
                                                <TextField
                                                    id="texFacebook"
                                                    label="Facebook"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    value={botaoFacebook}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start"><img className="IconeLista" src={facebook} alt="facebook" /></InputAdornment>,
                                                        classes: {
                                                            input: classes.fonteMenorTextField,
                                                        },
                                                    }}
                                                    onChange={(event) => setBotaoFacebook(event.target.value)}
                                                />
                                                <p className="FonteDicas">Conta do Facebook vinculada ao Anúncio (Ex: minha.conta)</p>
                                            </Grid>
                                            <Grid item classes={{ root: classes.gridEmForm }} xs>
                                                <TextField
                                                    id="texYoutube"
                                                    label="Youtube"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    value={botaoYoutube}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start"><img className="IconeLista" src={youtube} alt="youtube" /></InputAdornment>,
                                                        classes: {
                                                            input: classes.fonteMenorTextField,
                                                        },
                                                    }}
                                                    onChange={(event) => setBotaoYoutube(event.target.value)}
                                                />
                                                <p className="FonteDicas">Chave do canal de Youtube vinculado ao Anúncio (Ex: UdmsTZ4L_EXvqzQ-fyiWMrTX)</p>
                                            </Grid>
                                            <Grid item classes={{ root: classes.gridEmForm }} xs>
                                                <TextField
                                                    id="texTwitter"
                                                    label="Twitter"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    value={botaoTwitter}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start"><img className="IconeLista" src={twitter} alt="twitter" /></InputAdornment>,
                                                        classes: {
                                                            input: classes.fonteMenorTextField,
                                                        },
                                                    }}
                                                    onChange={(event) => setBotaoTwitter(event.target.value)}
                                                />
                                                <p className="FonteDicas">Conta do Twitter vinculada ao Anúncio (Ex: minha.conta)</p>
                                            </Grid>
                                            <Grid item classes={{ root: classes.gridEmForm }} xs>
                                                <TextField
                                                    id="texLinkedIn"
                                                    label="LinkedIn"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    value={botaoLinkedIn}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start"><img className="IconeLista" src={linkedin} alt="linkedin" /></InputAdornment>,
                                                        classes: {
                                                            input: classes.fonteMenorTextField,
                                                        },
                                                    }}
                                                    onChange={(event) => setBotaoLinkedIn(event.target.value)}
                                                />
                                                <p className="FonteDicas">Conta do LinkedIn vinculada ao Anúncio (Ex: minha.conta)</p>
                                            </Grid>
                                            <Grid item classes={{ root: classes.gridEmForm }} xs>
                                                <TextField
                                                    id="texSite"
                                                    label="Site"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    value={botaoSite}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start"><img className="IconeLista" src={internet} alt="internet" /></InputAdornment>,
                                                        classes: {
                                                            input: classes.fonteMenorTextField,
                                                        },
                                                    }}
                                                    onChange={(event) => setBotaoSite(event.target.value)}
                                                />
                                                <p className="FonteDicas">Endereço do site vinculado ao Anúncio (Ex: https://www.meusite.com.br )</p>
                                            </Grid>
                                        </Grid>
                                        <Grid container style={{ marginBottom: 10, marginRight: 8 }} justifyContent="flex-end">
                                            <Button style={{ height: 40 }} onClick={avancaTela2} color="primary" variant="outlined" endIcon={<KeyboardArrowRight />}>Avançar</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            :
                                <>
                                    {telaAtual == 2 ?
                                        <Grid container spacing={2} style={{ minHeight: wAuxAltura }}>
                                            <Grid container direction="column" spacing={2} justifyContent="space-between">
                                                <Grid item container>
                                                    <Grid container direction="column" lg={4} xs={12}>
                                                        <Grid container direction="column" xs={10} style={{ marginTop: 10, marginLeft: 20 }}>
                                                            <p className="FonteInfosGray">- Adicione imagem ao seu Anúncio clicando no link <ImageSearch fontSize="small" style={{ height: 13 }} /> dentro da área reservada. Este mesmo link ficará disponível abaixo do Anúncio para o caso de necessitar substituir uma imagem.</p>
                                                            <p className="FonteInfosGray">- Se quiser adicionar mais de uma imagem ao Anúncio, utilize o link <AddPhotoAlternateOutlined fontSize="small" style={{ height: 13 }} />, que estará disponível após a primeira imagem ser adicionada.</p>
                                                            <p className="FonteInfosGray">- O tipo de arquivo de imagem a ser utilizado deve ser JPG, JPEG ou PNG.</p>
                                                            <p className="FonteInfosGray">- O tamanho do arquivo de imagem a ser utilizado deve ser de no máximo 128 Kb e 450 x 300 (L x A em px).</p>
                                                            <p className="FonteInfosGray">- Com o banner do seu Anúncio adicionado, utilize o duplo clique do mouse sobre o banner para visualizar mais informações do Anúncio.</p>
                                                            <p className="FonteInfosGray">- Utilize o botão <img className="IconeBotao" src={arrowdown} alt="arrowdown" /> para visualizar o Anúncio expandido.</p>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container direction="column" lg={5} xs={12}>
                                                        <p className="FonteDicas" style={{ marginTop: 10 }}>Pré-visualização do seu Anúncio</p>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={11}>
                                                                <Card variant="outlined"
                                                                    style={{
                                                                        width: window.innerWidth <= 1200 ? wRefLarguraAnuncio.current.clientWidth * 0.88 : '100%',
                                                                        height: window.innerWidth <= 1200 ? (expandido ? window.innerHeight * 0.616 : window.innerHeight * 0.44) : (expandido ? window.innerHeight * 0.70 : window.innerHeight * 0.50),
                                                                        padding: 10,
                                                                        paddingTop: 5,
                                                                        paddingBottom: 5
                                                                    }}>
                                                                    <Grid container direction="row" style={{ height: expandido ? '7.11%' : '10%' }} alignItems="center" justifyContent="space-between">
                                                                        <Grid container direction="row" xs={10} justifyContent="flex-start">
                                                                            {cidade != null ?
                                                                                <p className="FonteAnuncio">{cidade}</p>
                                                                            :
                                                                                <p className="FonteAnuncio">Cidade-UF</p>
                                                                            }
                                                                            <p className="FonteAnuncio" style={{ marginLeft: 15 }}>± 99 Km</p>
                                                                            <img className="IconeAnuncio" style={{ marginLeft: 5 }} src={googlemaps} alt="googlemaps" />
                                                                        </Grid>
                                                                        <Grid container direction="row" style={{ marginRight: 5 }} xs justifyContent="flex-end">
                                                                            <img className="IconeAnuncio" src={heart} alt="heart" />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Card style={{ width: '100%', height: expandido ? '48.80%' : '69%', borderRadius: 15 }} variant="outlined" onDoubleClick={mostraMaisInfo} onClick={() => setMaisInfo(false)}>
                                                                        <Grid container direction="column" xs style={{ height: '100%' }} alignItems="center" justifyContent="center">
                                                                            {imgBanner.length == 0 ?
                                                                                <Grid container direction="column" style={{ width: '100%', height: '100%', marginTop: '20%' }} alignItems="center">
                                                                                    <input id="myInput" type="file" accept="image/*" onChange={selectArquivo} ref={fileInput} style={{ display: 'none' }} />
                                                                                    <IconButton onClick={() => {
                                                                                        wAuxIndImg = -1;
                                                                                        fileInput.current.click();
                                                                                    }}>
                                                                                        <ImageSearch fontSize="small" color="primary" />
                                                                                    </IconButton>
                                                                                    <p className="FonteDicas">Adicione suas imagens</p>
                                                                                </Grid>
                                                                            :
                                                                                <Grid item container direction="column" style={{ width: '100%', height: '100%' }}>
                                                                                    <img width="100%" height="100%" src={imgBanner[indImgBanners]} alt="banner" />
                                                                                    {maisInfo ?
                                                                                        <Card style={{ marginTop: window.innerWidth <= 1200 ? -(window.innerHeight * 0.44 * 0.69 * 0.85) : -(window.innerHeight * 0.50 * 0.69 * 0.85) , marginLeft: '12%', width: '80%', height: '80%', borderRadius: 15 }} variant="elevation" elevation={4} onClick={() => setMaisInfo(false)}>
                                                                                            <Grid container direction="column" alignItems="center">
                                                                                                <p className="FonteTitulos" style={{ marginTop: 15 }}>Mais informações do Anúncio:</p>
                                                                                                {telefone ?
                                                                                                    <Grid container direction="row" style={{ marginTop: 10 }} alignItems="center" justifyContent="center">
                                                                                                        <img className="IconeAnuncio" src={fone} alt="fone" />
                                                                                                        <p className="FonteAnuncio" style={{ marginLeft: 10, marginTop: 5 }}>{telefone}</p>
                                                                                                    </Grid>
                                                                                                :
                                                                                                    null
                                                                                                }
                                                                                            </Grid>
                                                                                            {(wDiaSem1 && wDiaSem2) || (hora1 && hora2) ?
                                                                                                <Grid container direction="column" alignItems="center">
                                                                                                    <p className="FontePrompts" style={{ marginTop: 7 }}>Horário de Atendimento:</p>
                                                                                                    <Grid item>
                                                                                                        <Grid container direction="row" style={{ marginTop: 1 }} alignItems="center" >
                                                                                                            {diaSem1 !== 9 && diaSem2 !== 9 ?
                                                                                                                <Grid item style={{ marginRight: 15 }} >
                                                                                                                    <p className="FontePrompts">{wDiaSem1} a {wDiaSem2}</p>
                                                                                                                </Grid>
                                                                                                            :
                                                                                                                null
                                                                                                            }
                                                                                                            <Grid item>
                                                                                                                <Grid container direction="column" alignItems="center">
                                                                                                                    {hora1 && hora2 ?
                                                                                                                        <p className="FontePrompts">{hora1} às {hora2}</p>
                                                                                                                    :
                                                                                                                        null
                                                                                                                    }
                                                                                                                    {hora3 && hora4 ?
                                                                                                                        <p className="FontePrompts">{hora3} às {hora4}</p>
                                                                                                                    :
                                                                                                                        null
                                                                                                                    }
                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                        </Grid>
                                                                                                    </Grid>
                                                                                                </Grid>
                                                                                            :
                                                                                                null
                                                                                            }
                                                                                        </Card>
                                                                                    :
                                                                                        null
                                                                                    }
                                                                                </Grid>
                                                                            }
                                                                        </Grid>
                                                                    </Card>
                                                                    <Grid container direction="row" style={{ height: expandido ? '8.47%' : '12%' }} alignItems="center" justifyContent="flex-start">
                                                                        <Grid container direction="row" xs={10} justifyContent="center">
                                                                            <p className="FonteAnuncio" >{textoReduzido}</p>
                                                                        </Grid>
                                                                        <Grid container direction="row" xs={2} justifyContent="flex-end">
                                                                            <IconButton onClick={() => { setExpandido(previousState => !previousState) }}>
                                                                                {expandido ?
                                                                                    <img className="IconeAnuncio" src={arrowup} alt="arrowup" />
                                                                                :
                                                                                    <img className="IconeAnuncio" src={arrowdown} alt="arrowdown" />
                                                                                }
                                                                            </IconButton>
                                                                        </Grid>
                                                                    </Grid>
                                                                    {expandido ?
                                                                        <Grid container direction="column" style={{ height: '28.57%' }} justifyContent="center">
                                                                            <Typography variant="body2" style={{ lineHeight: 1.2, width: '90%', marginLeft: '5%', color: 'darkgray' }} align="left">{wVetDescricao}</Typography>
                                                                        </Grid>
                                                                    :
                                                                        null
                                                                    }
                                                                    <Grid container direction="row" style={{ height: expandido ? '7.14%' : '10%' }} alignItems="center" justifyContent="flex-start">
                                                                        <Grid container direction="row" xs={8} alignItems="center" justifyContent="flex-start">
                                                                            {botaoWhatsapp != null ?
                                                                                <img className="IconeAnuncio" src={whatsapp} alt="whatsapp" />
                                                                            :
                                                                                undefined
                                                                            }
                                                                            {botaoInstagram != null ?
                                                                                <img style={{ marginLeft: 5 }} className="IconeAnuncio" src={instagram} alt="instagram" />
                                                                            :
                                                                                undefined
                                                                            }
                                                                            {botaoFacebook != null ?
                                                                                <img style={{ marginLeft: 5 }} className="IconeAnuncio" src={facebook} alt="facebook" />
                                                                            :
                                                                                undefined
                                                                            }
                                                                            {botaoYoutube != null ?
                                                                                <img style={{ marginLeft: 5 }} className="IconeAnuncio" src={youtube} alt="youtube" />
                                                                            :
                                                                                undefined
                                                                            }
                                                                            {botaoTwitter != null ?
                                                                                <img style={{ marginLeft: 5 }} className="IconeAnuncio" src={twitter} alt="twitter" />
                                                                            :
                                                                                undefined
                                                                            }
                                                                            {botaoLinkedIn != null ?
                                                                                <img style={{ marginLeft: 5 }} className="IconeAnuncio" src={linkedin} alt="linkedin" />
                                                                            :
                                                                                undefined
                                                                            }
                                                                            {botaoSite != null ?
                                                                                <img style={{ marginLeft: 5 }} className="IconeAnuncio" src={internet} alt="site" />
                                                                            :
                                                                                undefined
                                                                            }
                                                                        </Grid>
                                                                        <Grid container direction="row" xs style={{ marginRight: 60 }} alignItems="center" justifyContent="flex-end">
                                                                            <img className="IconeAnuncio" src={share} alt="share" />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Card>
                                                            </Grid>
                                                            <Grid item container xs={11}>
                                                                {imgBanner.length > 0 ?
                                                                    <Grid item container direction="row" alignItems="center" justifyContent="space-between">
                                                                        <Grid item xs={2}>
                                                                            <input id="myInput" type="file" accept="image/*" onChange={selectArquivo} ref={fileInput} style={{ display: 'none' }} />
                                                                            <IconButton style={{ padding: 0 }}
                                                                                onClick={() => {
                                                                                    wAuxIndImg = -1;
                                                                                    fileInput.current.click()
                                                                                }}>
                                                                                <ImageSearch fontSize="small" color="primary" />
                                                                            </IconButton>
                                                                        </Grid>

                                                                        <Grid item container xs justifyContent="center">
                                                                            <IconButton style={{ padding: 0, paddingRight: 10 }}
                                                                                onClick={() => {
                                                                                    if (indImgBanners > 0) {
                                                                                        setIndImgBanners(indImgBanners - 1)
                                                                                    }
                                                                                }}>
                                                                                <KeyboardArrowLeft fontSize="large" color="primary" />
                                                                            </IconButton>

                                                                            <IconButton style={{ padding: 0 }}
                                                                                onClick={() => {
                                                                                    wAuxIndImg = imgBanner.length;
                                                                                    fileInput.current.click()
                                                                                }}>
                                                                                <AddPhotoAlternateOutlined fontSize="small" color="primary" />
                                                                            </IconButton>

                                                                            <IconButton style={{ padding: 0, paddingLeft: 10 }}
                                                                                onClick={() => {
                                                                                    if (indImgBanners < (imgBanner.length - 1)) {
                                                                                        setIndImgBanners(indImgBanners + 1)
                                                                                    }
                                                                                }}>
                                                                                <KeyboardArrowRight fontSize="large" color="primary" />
                                                                            </IconButton>
                                                                        </Grid>

                                                                        <Grid item xs={2}>
                                                                            <span className="FontaAnuncio">{imgBanner.length > 0 ? indImgBanners + 1 : 0}  de  {imgBanner.length}</span>
                                                                        </Grid>
                                                                    </Grid>
                                                                :
                                                                    null
                                                                }
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item container spacing={2}>
                                                    <Grid item container lg={4} xs={12} style={{ marginBottom: 10, marginLeft: 8 }} justifyContent="flex-start">
                                                        <Button style={{ height: 40 }} onClick={() => { window.scrollTo(0, 0); setTelaAtual(1); }} color="primary" variant="outlined" startIcon={<KeyboardArrowLeft />}>Voltar</Button>
                                                    </Grid>
                                                    <Grid item container lg xs={12} justifyContent="flex-end" style={{ marginBottom: 10, marginRight: 8 }}>
                                                        <Grid item>
                                                            <Button style={{ height: 40 }} onClick={gravaDados} color="primary" variant="outlined" endIcon={<KeyboardArrowRight />}>Salvar Anúncio</Button>
                                                        </Grid>
                                                        <Grid item style={{ height: 30, width: 30, marginLeft: 10 }}>
                                                            {gravandoDados ?
                                                                <CircularProgress color="secondary" style={{ margin: 0, padding: 0, marginBottom: 25 }} />
                                                            :
                                                                null
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    :
                                        <Grid container spacing={2} style={{ minHeight: wAuxAltura }}>
                                            <Grid container direction="row" xs style={{ height: '145mm' }}>
                                                <Grid container lg={4} xs={12}/>
                                                <Grid container lg={4} xs={12} alignItems="center" style={{ height: '60%', width: '100%' }}>
                                                    <Paper variant="outlined" style={{ borderRadius: 8, marginTop: 30, padding: 5, height: '100%', width: '100%' }}>
                                                        <Grid container direction="column" style={{ height: '100%' }} alignItems="center" justifyContent="space-between">
                                                            <Paper variant="outlined" style={{ borderRadius: 8, margin: 5, padding: 5, width: 60 }}>
                                                                <IconButton onClick={baixaTermo}>
                                                                    <PictureAsPdfOutlined fontSize="large" style={{ color: '#F8961B' }} />
                                                                </IconButton>
                                                            </Paper>
                                                            <Grid item>
                                                                <p className="FonteInfosGray">- Faça o download do Termo de Autorização no link acima</p>
                                                                <p className="FonteInfosGray">- Preencha o documento com seus dados, e assine</p>
                                                                <p className="FonteInfosGray">- Não esqueça de preencher o ID do seu Anúncio, mostrado abaixo</p>
                                                                <p className="FonteInfosGray">- Digitalize o documento, tirando uma foto ou usando um scanner</p>
                                                                <p className="FonteInfosGray">- Envie para o email contato@iqueest.com.br</p>
                                                            </Grid>
                                                            <h2>ID do seu Anúncio: {wIdAnuncio}</h2>
                                                        </Grid>
                                                    </Paper>
                                                </Grid>
                                                <Grid container lg={4} xs={12} />
                                            </Grid>
                                        </Grid>
                                    }
                                </>
                            }
                        </CardContent>
                    </Card> 
                </CardContent>
            </Card>

            <Dialog open={mensagem.length > 0} fullWidth={true} maxWidth="xs">
                <DialogContent>
                    <DialogContentText>{mensagem}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        if (mensagem === 'O Anúncio foi salvo com sucesso! Aguarde sua publicação no iQueest.') aposSalvarAnuncio();
                       setMensagem("");
                    }} color="primary" style={{ textTransform: 'none' }}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default NovoAnuncio;
                    
