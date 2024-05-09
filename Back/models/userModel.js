// **************“El Centro de Registro y Consulta”****************

//Este espacio puede ser comparado con la oficina de administración de un edificio, donde se manejan los registros de los residentes y se proporciona información sobre ellos cuando se solicita.

//En la oficina de administración, se lleva a cabo el proceso de añadir nuevos residentes al sistema y proporcionar información sobre los residentes existentes cuando se necesita. De manera similar, este espacio añade nuevos usuarios a la base de datos y recupera la información de un usuario existente basándose en su correo electrónico.

// Importa el 'pool' de conexiones a la base de datos desde la configuración
const { pool } = require('../config/database');

// Función para crear un nuevo usuario en la base de datos
exports.createUser = async (username, email, hashedPassword) => {
  // Define la consulta SQL para insertar un nuevo usuario
  const query = `INSERT INTO users (username, email, password)
                 VALUES ($1, $2, $3)
                 RETURNING id, username, email`;
  // Establece los valores para la consulta SQL              
  const values = [username, email, hashedPassword];
  // Ejecuta la consulta y espera los resultados
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Función para obtener un usuario por su correo electrónico
exports.getUserByEmail = async (email) => {
  // Define la consulta SQL para buscar un usuario por correo electrónico
  const query = `SELECT * FROM users WHERE email = $1`;
  // Ejecuta la consulta con el correo electrónico proporcionado
  const { rows } = await pool.query(query, [email]);
  // Devuelve el primer resultado (el usuario encontrado)
  return rows[0];
};
