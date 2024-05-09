//Este espacio define un componente de escena de informes para una aplicación web, utilizando la API de Web Components. Aquí está la explicación detallada:

//Este espacio crea una “Escena de Informes” que actúa como un centro de análisis y presentación de datos, similar a una sala de conferencias en un edificio donde se comparten y discuten informes.

//Siguiendo con la analogía arquitectónica, este componente podría llamarse “Sala de Análisis Digital”, ya que es el espacio dedicado a la visualización y el manejo de informes dentro de la aplicación, similar a cómo una sala de análisis en un edificio se utiliza para estudiar datos y generar conocimiento. Este nombre refleja su papel como el área especializada en la presentación y el análisis de información en la aplicación web.

// Importamos los estilos CSS para la escena de informes.
import './reports.css';

// Verificamos si el elemento 'reports-scene' ya está registrado.
if(!customElements.get('reports-scene')) {
    // Creamos una clase para la escena de informes que extiende de HTMLElement.
    class ReportsScene extends HTMLElement {
        constructor() {
            super(); // Llamamos al constructor de la clase base.
            // Creamos un shadow DOM para encapsulamiento y aislamiento de estilos.
            const shadow = this.attachShadow({ mode: 'open' });
            // Creamos el contenedor principal para la escena de informes.
            const wrapper = document.createElement('div');
            // Creamos un enlace para los estilos.
            const style = document.createElement('link');
            style.rel = 'stylesheet';
            style.href = './reports.css';

            // Definimos la estructura HTML de la escena de informes.
            wrapper.innerHTML = `
                <h1>Reports</h1> // Título de la escena de informes.
                <p>Welcome to the Reports Scene</p> // Mensaje de bienvenida.
            `;
            // Añadimos el enlace de estilos y el contenedor al shadow DOM.
            shadow.appendChild(style);
            shadow.appendChild(wrapper);
        }
    }

    // Registramos el nuevo elemento personalizado 'reports-scene'.
    customElements.define('reports-scene', ReportsScene);
}
