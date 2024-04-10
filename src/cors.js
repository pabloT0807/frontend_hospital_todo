const cors_proxy = require('cors-anywhere');

const PORT = 8089; // Cambia este valor al puerto que desees

cors_proxy.createServer({
  originWhitelist: [], // Permitir todos los orígenes
}).listen(PORT, () => {
  console.log(`El servidor proxy de CORS Anywhere está ejecutándose en el puerto ${PORT}`);
});
