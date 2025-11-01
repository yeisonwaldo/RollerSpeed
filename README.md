# 🛼 RollerSpeed - Sistema de Gestión para Academia de Patinaje

![RollerSpeed Logo](./public/vite.svg)

## 📋 Descripción del Proyecto

**RollerSpeed** es una aplicación web moderna y completa diseñada para la gestión integral de una academia de patinaje. El sistema permite administrar estudiantes, instructores, clases, horarios, pagos y reportes a través de una interfaz intuitiva y responsive.

La plataforma está construida con tecnologías modernas de React y TypeScript, ofreciendo una experiencia de usuario fluida y un sistema de roles bien definido para diferentes tipos de usuarios.

## 🚀 Características Principales

### ✨ Sistema Multi-Rol
- **Estudiantes**: Gestión de perfil, horarios, pagos y progreso
- **Instructores**: Administración de clases, estudiantes y reportes
- **Administradores**: Control total del sistema, usuarios y finanzas

### 🎯 Funcionalidades Clave
- **Gestión de Usuarios**: Registro, autenticación y perfiles personalizados.
- **Administración de Clases**: Creación, edición y seguimiento de clases
- **Sistema de Horarios**: Visualización y gestión de horarios personalizados
- **Control de Pagos**: Seguimiento de pagos y estados financieros
- **Reportes y Estadísticas**: Análisis detallado de rendimiento y métricas
- **Notificaciones**: Sistema de alertas y comunicaciones
- **Responsive Design**: Adaptable a dispositivos móviles y desktop

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.1** - Biblioteca principal para la interfaz de usuario
- **TypeScript 5.9.3** - Tipado estático para mayor robustez
- **Vite 7.1.7** - Herramienta de construcción y desarrollo rápido
- **Tailwind CSS 4.1.16** - Framework de CSS utilitario
- **Framer Motion 12.23.24** - Animaciones y transiciones fluidas
- **React Router DOM 7.9.5** - Enrutamiento del lado del cliente

### Iconografía y UI
- **Heroicons 2.2.0** - Iconos SVG optimizados
- **PostCSS 8.5.6** - Procesamiento de CSS
- **Autoprefixer 10.4.21** - Compatibilidad de navegadores

### Herramientas de Desarrollo
- **ESLint 9.36.0** - Linting y calidad de código
- **TypeScript ESLint 8.45.0** - Reglas específicas para TypeScript
- **Vite Plugin React 5.0.4** - Integración de React con Vite

## 📁 Estructura del Proyecto

```
rollerspeed/
├── public/                     # Archivos estáticos
│   └── vite.svg               # Logo de Vite
├── src/                       # Código fuente principal
│   ├── assets/                # Recursos estáticos
│   │   ├── images/           # Imágenes del proyecto
│   │   └── react.svg         # Logo de React
│   ├── components/            # Componentes reutilizables
│   │   ├── modals/           # Modales del sistema
│   │   ├── AdminNavbar.tsx   # Navegación de administrador
│   │   ├── AuthenticatedNavbar.tsx # Navegación autenticada
│   │   ├── Button.tsx        # Componente de botón
│   │   ├── Card.tsx          # Componente de tarjeta
│   │   ├── Footer.tsx        # Pie de página
│   │   ├── Navbar.tsx        # Navegación principal
│   │   └── index.ts          # Exportaciones de componentes
│   ├── contexts/              # Contextos de React
│   │   └── AuthContext.tsx   # Contexto de autenticación
│   ├── pages/                 # Páginas principales
│   │   ├── student/          # Páginas específicas de estudiantes
│   │   ├── Contacto.tsx      # Página de contacto
│   │   ├── Dashboard.tsx     # Dashboard principal
│   │   ├── DashboardAdministrador.tsx # Dashboard de administrador
│   │   ├── DashboardEstudiante.tsx    # Dashboard de estudiante
│   │   ├── DashboardInstructor.tsx    # Dashboard de instructor
│   │   ├── Inicio.tsx        # Página de inicio
│   │   ├── Instructores.tsx  # Página de instructores
│   │   ├── Login.tsx         # Página de login
│   │   ├── Registro.tsx      # Página de registro
│   │   └── index.ts          # Exportaciones de páginas
│   ├── types/                 # Definiciones de tipos TypeScript
│   ├── App.tsx               # Componente principal
│   ├── App.css               # Estilos de la aplicación
│   ├── index.css             # Estilos globales
│   └── main.tsx              # Punto de entrada
├── .gitignore                # Archivos ignorados por Git
├── eslint.config.js          # Configuración de ESLint
├── index.html                # Archivo HTML principal
├── package.json              # Dependencias y scripts
├── postcss.config.js         # Configuración de PostCSS
├── tailwind.config.js        # Configuración de Tailwind CSS
├── tsconfig.json             # Configuración de TypeScript
├── tsconfig.app.json         # Configuración de TypeScript para la app
├── tsconfig.node.json        # Configuración de TypeScript para Node
└── vite.config.ts            # Configuración de Vite
```

## 👥 Sistema de Roles y Permisos

### 🎓 Estudiante
**Permisos y Funcionalidades:**
- ✅ Ver su perfil personal y editarlo
- ✅ Consultar horarios de clases asignadas
- ✅ Gestionar métodos de pago y ver estado de pagos
- ✅ Revisar progreso personal y estadísticas
- ✅ Ver historial de clases tomadas
- ✅ Recibir notificaciones del sistema
- ❌ No puede gestionar otros usuarios
- ❌ No puede crear o modificar clases

### 👨‍🏫 Instructor
**Permisos y Funcionalidades:**
- ✅ Todas las funcionalidades de estudiante
- ✅ Crear y gestionar nuevas clases
- ✅ Administrar lista de estudiantes asignados
- ✅ Ver progreso detallado de sus estudiantes
- ✅ Generar reportes de sus clases
- ✅ Gestionar horarios y disponibilidad
- ✅ Editar información de clases existentes
- ❌ No puede gestionar otros instructores
- ❌ No puede acceder a reportes financieros globales

### 👩‍💼 Administrador
**Permisos y Funcionalidades:**
- ✅ Control total del sistema
- ✅ Gestionar todos los usuarios (estudiantes e instructores)
- ✅ Administrar todas las clases del sistema
- ✅ Acceso completo a reportes financieros
- ✅ Configuración del sistema
- ✅ Monitoreo de actividad en tiempo real
- ✅ Gestión de pagos y facturación
- ✅ Análisis de métricas y KPIs

## 🔐 Sistema de Autenticación

### Usuarios de Prueba

#### Estudiantes
```
Email: estudiante1@rollerspeed.com
Password: estudiante123
Nombre: Ana García
Nivel: Principiante

Email: estudiante2@rollerspeed.com
Password: estudiante456
Nombre: Carlos Rodríguez
Nivel: Intermedio
```

#### Instructores
```
Email: instructor1@rollerspeed.com
Password: instructor123
Nombre: María López
Especialidad: Patinaje Artístico

Email: instructor2@rollerspeed.com
Password: instructor456
Nombre: Diego Martínez
Especialidad: Patinaje de Velocidad
```

#### Administradores
```
Email: admin@rollerspeed.com
Password: admin123
Nombre: Laura Fernández

Email: superadmin@rollerspeed.com
Password: superadmin123
Nombre: Roberto Silva
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **Git**

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/rollerspeed.git
cd rollerspeed
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno** (opcional)
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:5173
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Construcción
npm run build        # Construye la aplicación para producción

# Linting
npm run lint         # Ejecuta ESLint para revisar el código

# Vista previa
npm run preview      # Previsualiza la construcción de producción
```

## 🎨 Características de UI/UX

### Diseño Moderno
- **Interfaz limpia y minimalista** con Tailwind CSS
- **Animaciones fluidas** con Framer Motion
- **Iconografía consistente** con Heroicons
- **Responsive design** para todos los dispositivos

### Experiencia de Usuario
- **Navegación intuitiva** con rutas bien definidas
- **Feedback visual** en todas las interacciones
- **Carga rápida** optimizada con Vite
- **Accesibilidad** siguiendo estándares web

### Componentes Reutilizables
- **Modales dinámicos** para diferentes funcionalidades
- **Tarjetas informativas** con datos en tiempo real
- **Formularios validados** con feedback inmediato
- **Navegación contextual** según el rol del usuario

## 📊 Funcionalidades Detalladas

### Dashboard de Estudiante
- **Panel de bienvenida** personalizado
- **Acceso rápido** a horarios y pagos
- **Progreso visual** con gráficos y estadísticas
- **Notificaciones** importantes del sistema

### Dashboard de Instructor
- **Gestión de clases** con modal avanzado
- **Lista de estudiantes** con filtros y búsqueda
- **Estadísticas de rendimiento** de sus clases
- **Creación rápida** de nuevas clases

### Dashboard de Administrador
- **KPIs del sistema** en tiempo real
- **Gestión completa de usuarios** y permisos
- **Reportes financieros** detallados
- **Monitoreo de actividad** del sistema

## 🔧 Configuración Avanzada

### Tailwind CSS
El proyecto utiliza Tailwind CSS 4.x con configuración personalizada:
- **Colores personalizados** para la marca
- **Componentes reutilizables** definidos
- **Responsive breakpoints** optimizados

### TypeScript
Configuración estricta de TypeScript para:
- **Tipado fuerte** en toda la aplicación
- **Interfaces bien definidas** para datos
- **Detección temprana** de errores

### Vite
Optimizaciones de Vite para:
- **Hot Module Replacement** rápido
- **Construcción optimizada** para producción
- **Importaciones dinámicas** para code splitting

## 🤝 Contribución

### Guías de Contribución
1. **Fork** el repositorio
2. **Crear** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Crear** un Pull Request

### Estándares de Código
- **ESLint** para mantener calidad de código
- **TypeScript** para tipado estático
- **Prettier** para formateo consistente
- **Conventional Commits** para mensajes de commit

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto y Soporte

- **Email**: soporte@rollerspeed.com
- **Website**: https://rollerspeed.com
- **Documentación**: https://docs.rollerspeed.com

## 🔮 Roadmap Futuro

### Próximas Funcionalidades
- [ ] **Sistema de pagos** integrado con pasarelas
- [ ] **Chat en tiempo real** entre usuarios
- [ ] **Aplicación móvil** nativa
- [ ] **API REST** completa
- [ ] **Sistema de calificaciones** avanzado
- [ ] **Integración con calendarios** externos
- [ ] **Reportes PDF** automatizados
- [ ] **Notificaciones push** en tiempo real

### Mejoras Técnicas
- [ ] **Tests unitarios** con Jest
- [ ] **Tests E2E** con Cypress
- [ ] **CI/CD** con GitHub Actions
- [ ] **Docker** para containerización
- [ ] **Base de datos** real (PostgreSQL/MongoDB)
- [ ] **Autenticación JWT** robusta
- [ ] **Caching** con Redis
- [ ] **Monitoreo** con herramientas de observabilidad

---

**Desarrollado con ❤️ para la comunidad de patinaje**

*RollerSpeed - Donde la velocidad se encuentra con la tecnología* 🛼✨
