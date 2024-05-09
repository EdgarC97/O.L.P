//Este espacio actúa como el sistema de control central de un edificio, asegurando que solo las personas autorizadas puedan acceder a ciertas áreas. En este caso, el edificio es la aplicación web y las áreas son las diferentes vistas o “escenas” que el usuario puede ver.

// Podría considerarse como el “Sistema de Seguridad Digital” de la aplicación. Es responsable de verificar la identidad de los usuarios antes de permitirles el acceso al “Dashboard”, que sería el equivalente a un área restringida de un edificio.

// Importamos los estilos y componentes necesarios para la interfaz de usuario.
import './styles/global.css';
import './components/navigation-bar/navigation-bar.js';
import './components/sidebar-menu/sidebar-menu.js';
import './components/login-form/login-form.js';
import './scenes/dashboard/dashboard.js';

// Referenciamos el contenedor principal de la aplicación.
const appContainer = document.getElementById('app');

// Función para verificar la autenticación del usuario.
const checkAuth = async () => {
  // Obtenemos el token de autenticación del almacenamiento local.
  const token = localStorage.getItem('token');
  if (token) {
    // Verificamos la validez del token con el servidor.
    const isValid = await verifyToken(token);
    if (isValid) {
      // Si el token es válido, mostramos el Dashboard.
      showDashboard();
    } else {
      // Si no es válido, mostramos el formulario de inicio de sesión.
      showLoginForm();
    }
  } else {
    // Si no hay token, mostramos el formulario de inicio de sesión.
    showLoginForm();
  }
};

// Función para mostrar el formulario de inicio de sesión.
const showLoginForm = () => {
  // Configuramos el HTML del contenedor con el formulario de inicio de sesión.
  appContainer.innerHTML = `
    <login-form></login-form>
    <dashboard-view style="display: none;"></dashboard-view>
  `;

  // Escuchamos el evento de éxito de inicio de sesión para mostrar el Dashboard.
  document.addEventListener('login-success', () => {
    showDashboard();
  });
};

// Función para mostrar el Dashboard.
const showDashboard = () => {
  // Ocultamos el formulario de inicio de sesión y mostramos el Dashboard.
  const loginForm = document.querySelector('login-form');
  const dashboardView = document.querySelector('dashboard-view');
  if (loginForm) loginForm.style.display = 'none';
  if (dashboardView) dashboardView.style.display = 'block';
};

// Función para verificar la validez del token de autenticación.
const verifyToken = async (token) => {
  try {
    // Realizamos una petición al servidor para verificar el token.
    const response = await fetch('http://localhost:4000/api/auth/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // Procesamos la respuesta y devolvemos si el token es válido.
    const data = await response.json();
    return response.ok && data.valid;
  } catch (err) {
    // En caso de error, mostramos un mensaje en la consola.
    console.error('Error al verificar el token:', err);
    return false;
  }
};

// Iniciamos la verificación de autenticación al cargar la aplicación.
checkAuth();
