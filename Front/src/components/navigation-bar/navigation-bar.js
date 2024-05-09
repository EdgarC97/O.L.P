//Este espacio define un componente de barra de navegación para una aplicación web, utilizando la API de Web Components.
//Este espacio crea un “Menú de Navegación Superior” que actúa como un sistema de señalización digital, similar a las señales en un edificio que guían a los visitantes a través de diferentes secciones.
//Siguiendo con la analogía arquitectónica, este componente podría llamarse “Guía de Ruta Digital”, ya que proporciona una forma clara y accesible de navegar por la aplicación, similar a cómo un mapa de rutas en un edificio ayuda a las personas a encontrar su destino. Este nombre refleja su papel como facilitador de la navegación y el acceso a las diferentes áreas de la aplicación web.

// Importamos los estilos CSS para la barra de navegación.
import './navigation-bar.css';

// Verificamos si el elemento 'navigation-bar' ya está registrado.
if (!customElements.get('navigation-bar')) {
  // Creamos una clase para la barra de navegación que extiende de HTMLElement.
  class NavigationBar extends HTMLElement {
    constructor() {
      super(); // Llamamos al constructor de la clase base.
      // Creamos un shadow DOM para encapsulamiento y aislamiento de estilos.
      const shadow = this.attachShadow({ mode: 'open' });
      // Creamos el elemento 'nav' que contendrá la barra de navegación.
      const nav = document.createElement('nav');

      // Definimos la estructura HTML de la barra de navegación.
      nav.innerHTML = `
        <ul>
          <li><a href="#home">Home</a></li> // Enlace a la sección de inicio.
          <li><a href="#reports">Reports</a></li> // Enlace a la sección de informes.
          <li><a href="#settings">Settings</a></li> // Enlace a la sección de ajustes.
          <li><a href="#logout">Logout</a></li> // Enlace para cerrar sesión.
        </ul>
      `;
      // Añadimos la barra de navegación al shadow DOM.
      shadow.appendChild(nav);
    }
  }

  // Registramos el nuevo elemento personalizado 'navigation-bar'.
  customElements.define('navigation-bar', NavigationBar);
}


/**
 * Que es un shadow root?
 * 
 * Un shadow root es un DOM independiente que se puede adjuntar a un elemento. Esto me sirve
 * para encapsular la lógica de mi componente y que no afecte al resto de la página.
 * 
 */