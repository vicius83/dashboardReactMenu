import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';

function BuscaAnunciosCliente(idcliente) {
    return new Promise(async (resolve, reject) => {
        const requestOptions = { method: 'GET' };
        const response = await fetch('https://www.iqueest.com.br/ws_iqueest/estatisticas/anuncioscliente?idcliente=' + idcliente, requestOptions);
        if (response.ok == true) {
            resolve(await response.json());
        }
        else {
            window.alert('Erro de Requisição: ' + response.status.toString());
            reject(response.status.toString());
        }
    })
}

function BuscaMeusAnuncios(idcliente) {
    return new Promise(async (resolve, reject) => {
        const requestOptions = { method: 'GET' };
        const response = await fetch('https://www.iqueest.com.br/ws_iqueest/anuncios/anuncioscliente?idcliente=' + idcliente, requestOptions);
        if (response.ok == true) {
            resolve(await response.json());
        }
        else {
            window.alert('Erro de Requisição: ' + response.status.toString());
            reject(response.status.toString());
        }
    })
}

function BuscaAnuncio(idanuncio, tipo) {
    return new Promise(async (resolve, reject) => {
        const requestOptions = { method: 'GET' };
        const response = await fetch('https://www.iqueest.com.br/ws_iqueest/anuncios/editaanuncio?idanuncio=' + idanuncio + '&tipo=' + tipo, requestOptions);
        if (response.ok == true) {
            resolve(await response.json());
        }
        else {
            window.alert('Erro de Requisição: ' + response.status.toString());
            reject(response.status.toString());
        }
    })
}



function GravaPreAnuncio(dadosPreAnuncio) {
    return new Promise(async (resolve, reject) => {
        const requestOptions = {
            method: 'POST',
            headers: { Accepted: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosPreAnuncio)
        };

        var wAuxUrl = 'https://www.iqueest.com.br/ws_iqueest/anuncios/gravapreanuncio'
        const response = await fetch(wAuxUrl, requestOptions);
        if (response.ok == true) {
            response.text().then((resposta) => {
                resolve(resposta);
            });
        }
        else {
            // VISUALIZA DESCRICAO DO ERRO
            //response.text().then((resposta) => {
            //    window.alert('Erro de Requisição: ' + response.status.toString() + ' - ' + resposta);
            //});

            window.alert('Erro de Requisição: ' + response.status.toString());
            reject(response.status.toString());
        }
    })
}



export { BuscaAnunciosCliente,          
         GravaPreAnuncio, 
         BuscaMeusAnuncios, 
         BuscaAnuncio
        
        }