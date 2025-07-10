import express from "express";
import fs from "fs/promises";

const app = express();
const port = process.env.PORT || 3000;

// Función para leer archivo y devolver arreglo de códigos
async function leerCodigosArchivo(path) {
  const contenido = await fs.readFile(path, "utf-8");
  return contenido.split("\n").filter(line => line.trim() !== "");
}

// Ruta raíz: redirige a uno de los links con código (ejemplo: el principal)
app.get("/", (req, res) => {
  // Cambia esta URL a la que quieras que redirija al entrar a /
  const redirectUrl = "https://codigos-api-bm3z.onrender.com/FKDJG28374HGKSLAJWUE";
  res.redirect(redirectUrl);
});

// Ruta para codigos.txt
app.get("/FKDJG28374HGKSLAJWUE", async (req, res) => {
  try {
    const codigos = await leerCodigosArchivo("codigos.txt");
    const codigo = codigos[Math.floor(Math.random() * codigos.length)];
    res.send(`
      <div style="font-family: Arial, sans-serif; text-align:center; margin-top:50px;">
        <p>Tu código es:</p>
        <p style="font-weight:bold; font-size:24px;">${codigo}</p>
      </div>
    `);
  } catch (error) {
    res.status(500).send("Error leyendo codigos.txt");
  }
});

// Ruta para codigosmenor.txt
app.get("/FKDJG28374HGKSLAJWUF", async (req, res) => {
  try {
    const codigos = await leerCodigosArchivo("codigosmenor.txt");
    const codigo = codigos[Math.floor(Math.random() * codigos.length)];
    res.send(`
      <div style="font-family: Arial, sans-serif; text-align:center; margin-top:50px;">
        <p>Tu código es:</p>
        <p style="font-weight:bold; font-size:24px;">${codigo}</p>
      </div>
    `);
  } catch (error) {
    res.status(500).send("Error leyendo codigosmenor.txt");
  }
});

// Ruta para codigosmonedas.txt
app.get("/FKDJG28374HGKSLAJWUG", async (req, res) => {
  try {
    const codigos = await leerCodigosArchivo("codigosmonedas.txt");
    const codigo = codigos[Math.floor(Math.random() * codigos.length)];
    res.send(`
      <div style="font-family: Arial, sans-serif; text-align:center; margin-top:50px;">
        <p>Tu código es:</p>
        <p style="font-weight:bold; font-size:24px;">${codigo}</p>
      </div>
    `);
  } catch (error) {
    res.status(500).send("Error leyendo codigosmonedas.txt");
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
