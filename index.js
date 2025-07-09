const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Ruta secreta para activar la entrega de código
const RUTA_SECRETA = 'FKDJG28374HGKSLAJWUE';

// Función para obtener el primer código de codigos.txt
function obtenerYEliminarPrimerCodigo() {
  const rutaCodigos = 'codigos.txt';
  const rutaUsados = 'usados.txt';

  // Leer todos los códigos
  let codigos = fs.readFileSync(rutaCodigos, 'utf-8').split('\n').filter(Boolean);

  if (codigos.length === 0) {
    return null; // No hay más códigos
  }

  // Tomar el primero
  const primerCodigo = codigos.shift();

  // Guardar el código como usado
  fs.appendFileSync(rutaUsados, primerCodigo + '\n');

  // Escribir el resto de los códigos de nuevo en codigos.txt
  fs.writeFileSync(rutaCodigos, codigos.join('\n'));

  return primerCodigo;
}

// Ruta secreta que entrega un código y redirige
app.get(`/${RUTA_SECRETA}`, (req, res) => {
  const codigo = obtenerYEliminarPrimerCodigo();

  if (!codigo) {
    res.send('No hay más códigos disponibles.');
    return;
  }

  res.redirect(`/${codigo}`);
});

// Ruta que muestra el código entregado
app.get('/:codigo', (req, res) => {
  const codigo = req.params.codigo;
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Código generado</title>
      </head>
      <body style="font-family: sans-serif; text-align: center; padding-top: 100px;">
        <h1>Tu código es:</h1>
        <div style="font-size: 48px; margin-top: 20px; color: #333;">${codigo}</div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/${RUTA_SECRETA}`);
});
