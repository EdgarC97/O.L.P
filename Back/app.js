// ************** “El Vestíbulo de Conexiones” **************
//Este espacio es como el vestíbulo principal de un edificio, donde se establecen las normas generales de acceso y se dirige a los visitantes a sus destinos específicos. 

//Es el punto de entrada a la aplicación y establece las conexiones iniciales y las rutas hacia los servicios específicos, como el registro y el inicio de sesión. Es el lugar donde se reciben a los visitantes (solicitudes) y se les guía a través de los diferentes servicios que ofrece el edificio (aplicación).

//Este espacio configura la aplicación para que esté lista para recibir y manejar solicitudes, aplicando las políticas de seguridad y enrutamiento necesarias, de la misma manera que un vestíbulo da la bienvenida y orienta a los visitantes en un edificio.

// Configura el entorno de la aplicación cargando las variables de entorno
require('dotenv').config();
// Importa el módulo express para crear la aplicación
const express = require('express');
// Importa el módulo cors para permitir solicitudes de diferentes orígenes
const cors = require('cors');
// Importa las rutas de autenticación definidas en otro archivo
const authRoutes = require('./routes/authRoutes');

// Crea una instancia de la aplicación express
const app = express();

// Middlewares
app.use(cors()); // Habilita CORS para manejar solicitudes de diferentes dominios
app.use(express.json()); // Permite a la aplicación entender y procesar JSON

// Rutas
app.use('/api/auth', authRoutes);// Define un prefijo para las rutas de autenticación

//// Exporta la aplicación para que pueda ser utilizada por otras partes del código
module.exports = app;
