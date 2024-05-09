project-root/
│
├── src/                      # Código fuente
│   ├── config/               # Configuración general (Base de datos, variables de entorno)
│   │   └── database.js       # "El Centro de Control de Datos"
│   ├── controllers/          # Controladores
│   │   └── authController.js # "El Centro de Autenticación"
│   ├── middlewares/          # Middlewares personalizados
│   │   └── authMiddleware.js # "El Punto de Control de Identidad"
│   ├── models/               # Modelos de base de datos
│   │   └── userModel.js      # "El Centro de Registro y Consulta"
│   ├── routes/               # Definición de rutas
│   │   └── authRoutes.js     # "El Panel de Navegación"
│   ├── services/             # Lógica adicional (Servicios externos, utilidades)
│   │   └── authService.js
│   ├── app.js                # Configuración y rutas de la aplicación # "El Vestíbulo de Conexiones"
│   └── server.js             # Inicio del servidor # "El Centro de Operaciones"
│
├── .env                      # Variables de entorno (como la URL de la base de datos)
├── .gitignore                # Archivos a ignorar por git
├── package.json              # Dependencias del proyecto
└── README.md                 # Documentación del proyecto
