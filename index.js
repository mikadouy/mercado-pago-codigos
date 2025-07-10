import express from "express";
import fs from "fs/promises";

const app = express();
const port = process.env.PORT || 3000;

// Leer códigos del archivo
async function leerCodigosArchivo(path) {
  const contenido = await fs.readFile(path, "utf-8");
  return contenido.split("\n").filter(line => line.trim() !== "");
}

// Mapear el "token secreto" al nombre del archivo correspondiente
const archivos = {
  FKDJG28374HGKSLAJWUE: "codigos.txt",
  FKDJG28374HGKSLAJWUF: "codigosmenor.txt",
  FKDJG28374HGKSLAJWUG: "codigosmonedas.txt",
};

// Ruta principal secreta que elige un código y redirige a /CODIGO
app.get("/:secretCode", async (req, res, next) => {
  const secretCode = req.params.secretCode;

  // Si la URL es uno de los tokens secretos
  if (archivos[secretCode]) {
    try {
      const codigos = await leerCodigosArchivo(archivos[secretCode]);
      const codigo = codigos[Math.floor(Math.random() * codigos.length)];

      // Redirigir a /CODIGO para que cambie la URL en el navegador
      return res.redirect(`/${codigo}`);
    } catch (error) {
      return res.status(500).send("Error leyendo el archivo de códigos.");
    }
  }

  next(); // sigue al siguiente middleware si no es token secreto
});

// Ruta para mostrar el código en formato HTML con texto y negrita
app.get("/:codigo", (req, res) => {
  const codigo = req.params.codigo;

  // Opcional: validar que el código tenga formato esperado (ejemplo: longitud, caracteres)
  // Si querés validar, hacerlo acá. Por ahora asumimos que es válido.

  res.send(`
    <div style="font-family: Arial, sans-serif; font-size:48px; text-align:center; margin-top:50px;">
      <p>Tu código es:</p>
      <p style="font-weight:bold; font-size:48px;">${codigo}</p>
    </div>
  `);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
