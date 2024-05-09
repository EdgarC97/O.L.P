//Este espacio es como el plano de un sistema de construcción y distribución para un proyecto de desarrollo web. Imagínalo como el diseño de un complejo sistema de tuberías y cables que conectan diferentes partes de un edificio, asegurando que todo funcione de manera eficiente y esté accesible.

// ***** “Centro de Distribución Digital”. ******* Su función es organizar y preparar todos los recursos de la aplicación web (código, estilos, imágenes) para que sean fácilmente accesibles y utilizables por los usuarios finales, similar a cómo un centro de distribución maneja productos y los prepara para el envío.
// Requerimos los módulos necesarios para el funcionamiento del espacio.
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Punto de entrada del proyecto, como la puerta principal del centro.
  entry: './src/index.js',
  output: {
    // Configuramos la salida de los archivos, como la zona de carga del centro.
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // El paquete final, como un paquete listo para enviar.
    clean: true // Limpieza automática, como el mantenimiento del centro.
  },
  module: {
    // Reglas para procesar diferentes tipos de archivos, como las normas de manejo.
    rules: [
      {
        test: /\.js$/, // Para archivos JavaScript.
        exclude: /node_modules/, // Excluimos las dependencias externas.
        use: {
          loader: 'babel-loader' // Usamos Babel para transpilar el código.
        }
      },
      {
        test: /\.css$/, // Para archivos CSS.
        use: [
          'style-loader', // Inyecta estilos en el DOM.
          'css-loader' // Procesa los archivos CSS.
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Para imágenes.
        type: 'asset/resource', // Manejo de recursos multimedia.
        generator: {
          filename: 'assets/images/[hash][ext][query]' // Nomenclatura de archivos.
        }
      }
    ]
  },
  plugins: [
    // Plugins utilizados, como las herramientas especializadas del centro.
    new HtmlWebpackPlugin({
      template: './src/index.html', // Plantilla HTML base.
      filename: 'index.html' // Nombre del archivo de salida.
    })
  ],
  devServer: {
    // Configuración del servidor de desarrollo, como la oficina de administración.
    static: {
      directory: path.join(__dirname, 'dist') // Directorio estático para servir.
    },
    compress: true, // Compresión de archivos para una carga más rápida.
    port: 9000 // Puerto de acceso al servidor.
  }
};
