//**************“El Centro de Control de Datos”************** 
//Este espacio es responsable de establecer y gestionar la conexión con una base de datos PostgreSQL. Utiliza un pool para manejar múltiples conexiones de forma eficiente y segura, incluyendo la configuración de SSL para encriptar la comunicación con la base de datos. Es como el sistema de plomería de un edificio que asegura que el agua fluya correctamente y sin fugas.
//El uso de un pool para manejar múltiples conexiones de forma eficiente y segura es como tener un sistema de tuberías avanzado que puede manejar varios flujos de agua al mismo tiempo, asegurando que la presión y el flujo sean constantes y confiables. La configuración de SSL para encriptar la comunicación con la base de datos añade una capa adicional de seguridad, como un sistema de filtración que asegura que solo el agua limpia y segura se distribuya por el edificio.
// Es fundamental para el funcionamiento de cualquier aplicación que maneje datos sensibles o importantes, asegurando que la información se maneje de manera segura y eficiente.

// Importa el módulo 'pg' para poder interactuar con PostgreSQL
const { Pool } = require('pg');

// Verifica si la variable de entorno DATABASE_URL está definida
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está definida en el archivo .env');
}

// Extrae los parámetros adicionales de la URL para configurar correctamente SSL
// SSL es como un sistema de seguridad que encripta la información que fluye entre el edificio y el mundo exterior
const params = new URL(process.env.DATABASE_URL);

// Determina si se requiere SSL para la conexión con la base de datos
const ssl = params.searchParams.get('sslmode') === 'require';

// Crea un nuevo 'pool' de conexiones a la base de datos
// Un 'pool' es como un grupo de tuberías que manejan múltiples flujos de agua
const pool = new Pool({
  // Utiliza la URL de la base de datos para establecer la conexión
  connectionString: process.env.DATABASE_URL,
  // Configura SSL según sea necesario para proteger los datos
  ssl: ssl ? { rejectUnauthorized: false } : false,
});

// Exporta el 'pool' para que otras partes del edificio (el proyecto de software) puedan usarlo
module.exports = { pool };
