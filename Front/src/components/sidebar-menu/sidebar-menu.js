//Este espacio define un componente de menú lateral para una aplicación web, utilizando la API de Web Components. 

//Este espacio crea un “Menú de Navegación Lateral” que actúa como un panel de control interactivo, similar a un panel de navegación en un edificio que guía a los visitantes a diferentes secciones.
// El componente podría llamarse “Panel de Dirección Digital”, ya que proporciona una forma intuitiva y organizada de navegar por la aplicación, similar a cómo un directorio en un edificio ayuda a las personas a encontrar su camino.

// Importamos los estilos CSS para el menú lateral.
import './sidebar-menu.css';

// Verificamos si el elemento 'sidebar-menu' ya está registrado.
if (!customElements.get('sidebar-menu')) {
  // Creamos una clase para el menú lateral que extiende de HTMLElement.
  class SidebarMenu extends HTMLElement {
    constructor() {
      super(); // Llamamos al constructor de la clase base.
      // Creamos un shadow DOM para encapsulamiento y aislamiento de estilos.
      const shadow = this.attachShadow({ mode: 'open' });
      // Creamos el elemento 'aside' que contendrá el menú lateral.
      const sidebar = document.createElement('aside');

      // Definimos la estructura HTML del menú lateral.
      sidebar.innerHTML = `
        <ul>
          <li><a href="#home">Home</a></li> // Enlace a la sección de inicio.
          <li><a href="#reports">Reports</a></li> // Enlace a la sección de informes.
          <li><a href="#settings">Settings</a></li> // Enlace a la sección de ajustes.
        </ul>
      `;
      // Añadimos el menú lateral al shadow DOM.
      shadow.appendChild(sidebar);
    }
  }

  // Registramos el nuevo elemento personalizado 'sidebar-menu'.
  customElements.define('sidebar-menu', SidebarMenu);
}
