function getCountry(key) {
    switch(key) {
        case 'MX':
            return "Mexico"
        case 'UY':
            return "Uruguay"
        case 'ES':
            return "España"
        default:
            return ""
    }
}

function getGenre(key) {
    switch (key) {
        case 1:
            return "Mujer cis"
        case 2:
            return "Hombre cis"
        case 3:
            return "Mujer trans"
        case 4:
            return "Hombre trans"
        case 5:
            return "No binario"
        case 5:
            return "Otro"
        default:
            return ""
    }
}

function getTextAnswer(key) {
    switch (key) {
        case 1:
            return "Nada"
        case 2:
            return "Algo"
        case 3:
            return "Bastante"
        case 4:
            return "Mucho"
        case 5:
            return "No corresponde en este caso"
        default:
            return ""
    }
}


module.exports = {getCountry, getGenre, getTextAnswer}
