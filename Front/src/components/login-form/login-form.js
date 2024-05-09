//Nombre del Espacio: Podríamos llamar a este componente ********“Portal de Identificación”**********, ya que actúa como un punto de control para la identificación y autenticación de los usuarios antes de permitirles el acceso al resto de la aplicación, similar a un vestíbulo de seguridad en un edificio
//Descripción General del Espacio: Este script crea un “espacio” interactivo llamado “Área de Acceso”. Es como diseñar una entrada principal a un edificio que controla quién puede entrar. En términos de funcionalidad, este espacio permite a los usuarios identificarse con sus credenciales para acceder a áreas restringidas de la aplicación.

// Importamos los estilos CSS para el formulario de inicio de sesión.
import './login-form.css';

// Verificamos si el componente 'login-form' ya está definido para evitar duplicados.
if (!customElements.get('login-form')) {
  // Definimos una clase para nuestro formulario de inicio de sesión que extiende de HTMLElement.
  class LoginForm extends HTMLElement {
    constructor() {
      super(); // Llamamos al constructor de la clase padre.
      // Creamos un 'shadow DOM' para encapsulamiento de estilos y estructura.
      const shadow = this.attachShadow({ mode: 'open' });
      // Creamos el formulario y lo añadimos al shadow DOM.
      const form = document.createElement('form');
      
      // Definimos la estructura HTML interna del formulario.
      form.innerHTML = `
        <h2>Login hola</h2>
        <input type="text" id="username" placeholder="Username">
        <input type="password" id="password" placeholder="Password">
        <button type="submit">Login</button>
      `;
      // Añadimos un evento para manejar el envío del formulario.
      form.addEventListener('submit', async (event) => {
        event.preventDefault();// Prevenimos el comportamiento por defecto.
        // Obtenemos los valores ingresados por el usuario.
        const username = shadow.getElementById('username').value;
        const password = shadow.getElementById('password').value;
        // Llamamos a la función de inicio de sesión y manejamos la respuesta.
        const success = await this.login(username, password);
        if (success[0]) {
          // Si el inicio de sesión es exitoso, emitimos un evento personalizado.
          this.dispatchEvent(new CustomEvent('login-success', { bubbles: true }));
        } else {
          // Si hay un error, mostramos una alerta con el mensaje.
          alert(success[1]);
        }
      });
      // Añadimos el formulario al shadow DOM.
      shadow.appendChild(form);
    }
    
    // Definimos la función de inicio de sesión que se comunica con el servidor.
    async login(email, password) {
      try {
        // Realizamos una petición POST al servidor para autenticar al usuario.
        const response = await fetch('http://localhost:4000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          // Si la respuesta es exitosa, guardamos el token en el almacenamiento local.
          localStorage.setItem('token', data.token);
          return true;
        } else {
          // Si hay un error de autenticación, mostramos un mensaje en la consola.
          console.error('Error de autenticación:', data.message);
          return [false, `Error de autenticación: ${data.message}`]
        }
      } catch (err) {
        // Si hay un error en la petición, mostramos un mensaje en la consola.
        console.error('Error en la solicitud de inicio de sesión:', err);
        return [false, `Error de autenticación: ${err?.message}`];
      }
    }
  }
  // Definimos el nuevo elemento personalizado 'login-form'.
  customElements.define('login-form', LoginForm);
}