//***********“El Panel de Navegación”**********

//Este espacio es como el sistema de señalización y directorio de un edificio, que guía a las personas a los diferentes servicios y oficinas dentro del complejo.

//En este sistema de señalización y directorio, cada ruta actúa como un letrero que indica a los usuarios dónde ir para registrar una nueva cuenta, iniciar sesión en una existente o verificar la validez de su token de acceso. Es similar a cómo un directorio en un edificio dirige a las personas a la recepción, la oficina de seguridad o la sala de conferencias.

// Importa el módulo express para crear un enrutador
const express = require('express');
// Importa las funciones de controlador de autenticación
const { register, login, verifyToken } = require('../controllers/authController');

// Crea un nuevo enrutador de express
const router = express.Router();

// Define las rutas para el registro, inicio de sesión y verificación de token y les asigna las funciones correspondientes del controlador de autenticación
router.post('/register', register);
router.post('/login', login);
router.post('/verify-token', verifyToken)


// Exporta el enrutador para que pueda ser utilizado por otras partes de la aplicación
module.exports = router;
