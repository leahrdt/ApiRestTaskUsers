module.exports = {
    entry: './app/index.js', //ruta donde voy a agarrar el codigo. lo convierto y lo voy a dejar en..
    output: {
        path: __dirname + '/public', //Lo dejo en esta carpeta.. como html
        filename: 'bundle.js' //el nombre, siempre va este.

    }
}