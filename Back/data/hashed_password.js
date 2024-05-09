//*************“La Cámara de Encriptación”*****************

//Este espacio es como la sala de seguridad del edificio, donde se generan y almacenan las claves de acceso (contraseñas) de forma segura.
//En este espacio, o sala de seguridad, se toma una contraseña simple y se transforma en una versión encriptada, mucho más segura y difícil de descifrar. Esto es similar a cómo un sistema de seguridad en un edificio toma la identidad de una persona y la verifica a través de un pase seguro o una clave de acceso antes de permitirle la entrada. El proceso de encriptación asegura que, incluso si alguien obtiene la contraseña encriptada, no podrá entenderla ni usarla sin la clave correcta.

// Importa la biblioteca bcryptjs para la encriptación de contraseñas
const bcrypt = require('bcryptjs');

// Función para generar una contraseña encriptada
const generateHashedPassword = async (password) => {
  // Genera un 'salt', que es como un código único para añadir complejidad a la encriptación
  const salt = await bcrypt.genSalt(10);
  // Crea la contraseña encriptada usando el 'salt'
  const hashedPassword = await bcrypt.hash(password, salt);
  // Muestra la contraseña encriptada en la consola
  console.log('Hashed Password:', hashedPassword);
};

// Ejecuta la función con una contraseña de ejemplo
generateHashedPassword('password123');