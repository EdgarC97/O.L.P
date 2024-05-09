//Este espacio define un componente de vista de tablero de instrumentos para una aplicación web, utilizando la API de Web Components. Aquí está la explicación detallada:

//Este espacio crea un “Tablero de Control Central” que actúa como el centro operativo de la aplicación, similar a un centro de comando en un edificio desde donde se monitorean y controlan todas las operaciones.

//Siguiendo con la analogía arquitectónica, este componente podría llamarse “Centro de Operaciones Digitales”, ya que es el lugar donde se centraliza la gestión y navegación de la aplicación, similar a un centro de operaciones en un edificio que coordina diversas actividades y flujos de trabajo. Este nombre refleja su papel como el núcleo desde donde se accede a todas las funciones principales de la aplicación web.

// Importamos los estilos CSS para el tablero de control.
import './dashboard.css';
// Importamos los componentes de las escenas individuales.
import '../home/home.js';
import '../reports/reports.js';

// Verificamos si el elemento 'dashboard-view' ya está registrado.
if (!customElements.get('dashboard-view')) {
  // Creamos una clase para la vista del tablero que extiende de HTMLElement.
  class DashboardView extends HTMLElement {
    constructor() {
      super(); // Llamamos al constructor de la clase base.
      // Creamos un shadow DOM para encapsulamiento y aislamiento de estilos.
      const shadow = this.attachShadow({ mode: 'open' });
      // Creamos el contenedor principal para la vista del tablero.
      const wrapper = document.createElement('div');

      // Definimos la estructura HTML de la vista del tablero.
      wrapper.innerHTML = `
        <navigation-bar></navigation-bar> // Barra de navegación superior.
        <sidebar-menu></sidebar-menu> // Menú lateral de navegación.
        <main id="content">
          <home-scene></home-scene> // Escena de inicio por defecto.
        </main>
      `;
      // Añadimos el contenedor al shadow DOM.
      shadow.appendChild(wrapper);

      // Manejamos la navegación entre escenas al hacer clic en enlaces.
      shadow.addEventListener('click', (event) => {
        if (event.target.tagName === 'A' && event.target.getAttribute('href').startsWith('#')) {
          event.preventDefault(); // Prevenimos la navegación por defecto.
          // Obtenemos la escena a la que se quiere navegar.
          const scene = event.target.getAttribute('href').substring(1);
          // Cargamos la escena correspondiente.
          this.loadScene(scene);
        }
      });
    }

    // Función para cargar la escena solicitada.
    loadScene(scene) {
      // Referenciamos el contenedor principal de contenido.
      const content = this.shadowRoot.getElementById('content');
      // Cambiamos el contenido según la escena seleccionada.
      switch (scene) {
        case 'home':
          content.innerHTML = `<home-scene></home-scene>`;
          break;
        case 'reports':
          content.innerHTML = `<reports-scene></reports-scene>`;
          break;
        case 'settings':
          content.innerHTML = `<settings-scene></settings-scene>`;
          break;
        case 'logout':
          // Emitimos un evento personalizado para manejar el cierre de sesión.
          this.dispatchEvent(new CustomEvent('logout', { bubbles: true }));
          break;
        default:
          // Por defecto, volvemos a la escena de inicio.
          content.innerHTML = `<home-scene></home-scene>`;
          break;
      }
    }

    // Función que se llama cuando el elemento se conecta al DOM.
    connectedCallback() {
      // Escuchamos el evento de cierre de sesión para actualizar la interfaz.
      this.addEventListener('logout', () => {
        // Mostramos el formulario de inicio de sesión y ocultamos el tablero.
        document.querySelector('login-form').style.display = 'block';
        document.querySelector('dashboard-view').style.display = 'none';
      });
    }
  }

  // Registramos el nuevo elemento personalizado 'dashboard-view'.
  customElements.define('dashboard-view', DashboardView);
}
