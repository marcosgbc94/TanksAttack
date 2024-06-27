const express = require('express');
const path = require('path');

const app = express();

// Middleware para servir archivos est�ticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para servir archivos est�ticos desde la carpeta src
app.use('/src', express.static(path.join(__dirname, 'src')));

// Ruta principal que sirve el archivo index.html desde public
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Puerto en el que se ejecutar� el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});