// **************** “El Centro de Autenticación” ****************
//Este espacio  contiene funciones para el registro y autenticación de usuarios en una aplicación web.
// Este espacio es ensencial para la seguridad y gestión de usuarios en una aplicación, actuando como el sistema de seguridad en un edificio que controla quién puede entrar y acceder a diferentes áreas.
// En resumen, este configura la infraestructura crítica para la operación segura y eficiente de una aplicación web.
//El proceso de registro actúa como la recepción, donde se verifica la identidad de los nuevos visitantes antes de otorgarles una credencial. La función de inicio de sesión es como un punto de control, donde se verifica la credencial antes de permitir el acceso a las áreas restringidas. La verificación del token es como un sistema de vigilancia que constantemente asegura que las credenciales de los visitantes sigan siendo válidas durante su estancia.
//Este “Centro de Autenticación” es fundamental para mantener la integridad y la seguridad de la aplicación, asegurando que solo los usuarios autorizados puedan acceder a las funcionalidades protegidas.

// Importa las bibliotecas necesarias para la encriptación y la autenticación
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Importa las funciones del modelo de usuario para interactuar con la base de datos
const { createUser, getUserByEmail } = require('../models/userModel');


// Registro: Crea un nuevo usuario después de verificar que el correo electrónico no esté ya en uso y encripta la contraseña antes de almacenarla en la base de datos.
// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    // Obtiene los datos del usuario desde el cuerpo de la solicitud
    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    let user = await getUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario  en la base de datos con la contraseña encriptada
    user = await createUser(username, email, hashedPassword);
    // Devuelve una respuesta exitosa con los datos del usuario
    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  } catch (err) {
    // Maneja cualquier error durante el registro
    console.error('Error en register:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Inicio de sesión: Autentíca a un usuario comparando la contraseña proporcionada con la almacenada en la base de datos y, si son iguales, genera un token JWT que permite al usuario acceder a áreas protegidas de la aplicación.
// Función para iniciar sesión de un usuario
exports.login = async (req, res) => {
  try {
    // Obtiene las credenciales del usuario desde el cuerpo de la solicitu
    const { email, password } = req.body;

    // Verificar si el usuario existe en la base de datos
    const user = await getUserByEmail(email);
    if (!user) {
      // Si el usuario no existe, devuelve un error
      return res.status(400).json({ message: 'Ese Usuario no existe' });
    }

    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // // Genera un token JWT para la sesión del usuario
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    // Devuelve el token y los datos del usuario
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    // Maneja cualquier error durante el inicio de sesión
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


// Verificación de Token: Comprueba la validez de un token JWT proporcionado, permitiendo o negando el acceso a ciertas funcionalidades basadas en su validez.
// Función para verificar la validez de un token JWT
exports.verifyToken = (req, res) => {
  // Obtiene el token de la cabecera de autorización
  const token = req.header('Authorization')?.split(' ')[1];
  // Si no hay token, devuelve un error
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado', valid: false });
  }

  try {
    // Verifica la validez del token
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true });
  } catch (err) {
    // Si el token es inválido, devuelve un error
    console.error('Error en verifyToken:', err);
    res.status(401).json({ message: 'Token inválido', valid: false });
  }
};
