const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

function obtenerYEliminarPrimerCodigo(path) {
    try {
        const data = fs.readFileSync(path, 'utf-8');
        const codigos = data.split('\n').filter(c => c.trim() !== '');
        if (codigos.length === 0) return null;

        const primerCodigo = codigos.shift();
        fs.writeFileSync(path, codigos.join('\n'));
        return primerCodigo;
    } catch (err) {
        console.error('Error leyendo o escribiendo el archivo:', err);
        return null;
    }
}

app.get('/FKDJG28374HGKSLAJWUE', (req, res) => {
    const codigo = obtenerYEliminarPrimerCodigo('codigos.txt');
    if (!codigo) return res.status(404).send('No hay más códigos disponibles');
    res.send(codigo);
});

app.get('/FKDJG28374HGKSLAJWUF', (req, res) => {
    const codigo = obtenerYEliminarPrimerCodigo('codigosmenor.txt');
    if (!codigo) return res.status(404).send('No hay más códigos disponibles');
    res.send(codigo);
});

app.get('/FKDJG28374HGKSLAJWUG', (req, res) => {
    const codigo = obtenerYEliminarPrimerCodigo('codigosmonedas.txt');
    if (!codigo) return res.status(404).send('No hay más códigos disponibles');
    res.send(codigo);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
