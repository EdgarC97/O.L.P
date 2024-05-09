//***************“El Punto de Control de Identidad”*****************

//Este espacio actúa como el sistema de control de acceso de un edificio, donde se verifica la identidad de las personas antes de permitirles el paso a áreas restringidas.

//Verifica la autenticidad de los tokens de los usuarios, asegurando que solo aquellos con permiso puedan acceder a las funciones protegidas de la aplicación. Es similar a un sistema de tarjetas de acceso en un edificio que permite la entrada solo a personas autorizadas.

//Este middleware es crucial para mantener la seguridad y la integridad de la aplicación, al igual que un sistema de control de acceso es vital para la seguridad de un edificio.

// Importa la biblioteca jsonwebtoken para trabajar con tokens JWT
const jwt = require('jsonwebtoken');

// Middleware de autenticación que verifica los tokens de los usuarios
const authMiddleware = (req, res, next) => {
  // Intenta obtener el token del header de autorización de la solicitud
  const token = req.header('Authorization')?.split(' ')[1];

  // Si no hay token, rechaza la solicitud y devuelve un mensaje de error
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  try {
    // Verifica el token usando la clave secreta del entorno
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // Si hay un error, como un token inválido, registra el error y devuelve un mensaje de error
    console.error('Error en authMiddleware:', err);
    res.status(401).json({ message: 'Token inválido' });
  }
};

// Exporta el middleware para usarlo en otras partes de la aplicación
module.exports = authMiddleware;
