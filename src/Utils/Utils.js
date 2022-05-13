function VerificaCPF(strCpf) {

    var soma;
    var resto;
    var i;
    soma = 0;
    if (strCpf == "00000000000") {
        return false;
    }

    for (i = 1; i <= 9; i++) {
        soma = soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    }

    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (i = 1; i <= 10; i++) {
        soma = soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    }
    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(10, 11))) {
        return false;
    }

    return true;
}

function VerificaCNPJ(strCNPJ){
    var b = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ];

    if(strCNPJ.length !== 14)
        return false

    if(/0{14}/.test(strCNPJ))
        return false

    for (var i = 0, n = 0; i < 12; n += strCNPJ[i] * b[++i]);
    if(strCNPJ[12] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false
    
    for (var i = 0, n = 0; i <= 12; n += strCNPJ[i] * b[i++]);
    if(strCNPJ[13] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false

    return true;
}

export { VerificaCPF, VerificaCNPJ };