// ********** “El Centro de Operaciones” ******************
//Este espacio es como la sala de máquinas de un edificio, donde se enciende y se asegura que todos los sistemas estén funcionando correctamente antes de abrir las puertas al público.

//Es el lugar donde se inicia la aplicación y se verifica que todos los servicios esenciales, como la base de datos, estén en línea y funcionando antes de que la aplicación comience a aceptar solicitudes de los usuarios. Es el último paso antes de que el edificio esté abierto y operativo, asegurando que todo esté en orden para un funcionamiento sin problemas.

//Este espacio es crucial para el lanzamiento de la aplicación, asegurando que la base de datos esté accesible y que el servidor esté listo para manejar el tráfico de los usuarios.

// Carga las variables de entorno desde el archivo .env
require('dotenv').config();
// Importa el 'pool' de conexiones a la base de datos
const { pool } = require('./config/database');
// Importa la aplicación express configurada previamente
const app = require('./app');

// Define el puerto en el que se ejecutará el servidor, usando una variable de entorno o un valor por defecto
const port = process.env.PORT || 4000;

// Prueba la conexión a la base de datos ejecutando una consulta simple
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
     // Si hay un error en la conexión, lo registra y detiene el proceso
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  } else {
    // Si la conexión es exitosa, registra el éxito y comienza a escuchar en el puerto definido
    console.log('Conexión a la base de datos exitosa:', res.rows);
    app.listen(port, () => {
      // Registra que el servidor está en funcionamiento y listo para recibir solicitudes
      console.log(`Servidor ejecutándose en http://localhost:${port}`);
    });
  }
});
