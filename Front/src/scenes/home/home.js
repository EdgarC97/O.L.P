//Este espacio define un componente de escena de inicio para una aplicación web, utilizando la API de Web Components. Aquí está la explicación detallada:

//Este espacio crea una “Escena de Inicio” que actúa como la página de bienvenida de la aplicación, similar a un vestíbulo de entrada en un edificio donde los visitantes son recibidos.
//Siguiendo con la analogía arquitectónica, este componente podría llamarse “Sala de Recepción Digital”, ya que es el primer punto de contacto y bienvenida para los usuarios en la aplicación, similar a cómo una sala de recepción en un edificio recibe a los visitantes y les ofrece una introducción al lugar. Este nombre refleja su papel como el espacio introductorio y acogedor de la aplicación web.

// Importamos los estilos CSS para la escena de inicio.
import './home.css';

// Verificamos si el elemento 'home-scene' ya está registrado.
if (!customElements.get('home-scene')) {
  // Creamos una clase para la escena de inicio que extiende de HTMLElement.
  class HomeScene extends HTMLElement {
    constructor() {
      super(); // Llamamos al constructor de la clase base.
      // Creamos un shadow DOM para encapsulamiento y aislamiento de estilos.
      const shadow = this.attachShadow({ mode: 'open' });
      // Creamos el contenedor principal para la escena de inicio.
      const wrapper = document.createElement('div');

      // Definimos la estructura HTML de la escena de inicio.
      wrapper.innerHTML = `
        <h1>Home</h1> // Título de la escena de inicio.
        <p>Welcome to the Home Scene</p> // Mensaje de bienvenida.
      `;
      // Añadimos el contenedor al shadow DOM.
      shadow.appendChild(wrapper);
    }
  }

  // Registramos el nuevo elemento personalizado 'home-scene'.
  customElements.define('home-scene', HomeScene);
}
