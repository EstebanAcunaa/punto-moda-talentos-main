# 🛍️ Punto Moda Talentos

E-commerce moderno de moda desarrollado con React + Vite y Node.js + Express + PostgreSQL.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Mejoras Implementadas](#-mejoras-implementadas)
- [Optimizaciones Recomendadas](#-optimizaciones-recomendadas)

---

## ✨ Características

### Frontend
- ✅ Diseño moderno y responsive (mobile-first)
- ✅ Modo oscuro/claro
- ✅ Sistema de filtros avanzados (categoría, talle, color, precio)
- ✅ Carrito de compras persistente
- ✅ Lista de deseos (wishlist)
- ✅ Sistema de reseñas y ratings
- ✅ Gestión de estado global con Context API
- ✅ Fallback a datos locales si la API no está disponible

### Backend
- ✅ API REST completa con Express.js
- ✅ Base de datos PostgreSQL con Sequelize ORM
- ✅ Gestión de productos con variantes (talle, color)
- ✅ Sistema de carrito de compras
- ✅ Gestión de órdenes con transacciones
- ✅ Control de inventario (stock)
- ✅ Variables de entorno para configuración segura

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.2.0 | Framework UI |
| Vite | 7.2.4 | Build tool & dev server |
| React Router | 7.9.6 | Enrutamiento SPA |
| Tailwind CSS | 4.1.17 | Framework CSS |
| Flowbite | 4.0.1 | Componentes UI |
| Tabler Icons | 3.35.0 | Iconos |

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | - | Runtime JavaScript |
| Express | 5.1.0 | Framework web |
| Sequelize | 6.37.7 | ORM PostgreSQL |
| PostgreSQL | - | Base de datos |
| CORS | 2.8.5 | Cross-Origin Resource Sharing |
| dotenv | 17.2.3 | Variables de entorno |

---

## 📁 Estructura del Proyecto

```
punto-moda-talentos-main/
├── public/                      # Archivos estáticos
│   └── image/
│       ├── productos/           # Imágenes de productos
│       └── marcas/              # Logos de marcas
├── src/
│   ├── backend/                 # Backend (API REST)
│   │   ├── controllers/         # Lógica de negocio
│   │   │   ├── productController.js
│   │   │   ├── userController.js
│   │   │   ├── cartController.js
│   │   │   └── orderController.js
│   │   ├── routes/              # Rutas de la API
│   │   │   ├── productRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── models/              # Modelos Sequelize
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── ProductVariant.js
│   │   │   ├── Cart.js
│   │   │   ├── Order.js
│   │   │   └── asociaciones.js
│   │   ├── db/
│   │   │   └── crearDB.sql     # Schema SQL
│   │   ├── scripts/
│   │   │   └── seed.js         # Datos de prueba
│   │   ├── index.js            # Conexión Sequelize
│   │   └── server.js           # Servidor Express
│   ├── components/              # Componentes React
│   ├── pages/                   # Páginas/Vistas
│   ├── section/                 # Secciones complejas
│   ├── services/                # Servicios de API
│   │   └── api.js              # Cliente API
│   ├── context/                 # Context API
│   │   ├── UserContext.jsx
│   │   └── CartContext.jsx
│   ├── data/
│   │   └── productos.json      # Datos locales (fallback)
│   ├── App.jsx
│   └── main.jsx
├── .env                         # Variables de entorno (NO commitear)
├── .env.example                 # Ejemplo de variables
├── .env.development             # Variables de desarrollo
├── package.json
└── vite.config.js
```

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd punto-moda-talentos-main
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar PostgreSQL

Asegúrate de tener PostgreSQL instalado y ejecutándose.

```bash
# Crear la base de datos
createdb punto-moda

# O usando psql
psql -U postgres
CREATE DATABASE "punto-moda";
\q
```

### 4. Ejecutar el schema SQL

```bash
psql -U postgres -d punto-moda -f src/backend/db/crearDB.sql
```

---

## ⚙️ Configuración

### Variables de Entorno

Copia el archivo `.env.example` a `.env` y configura las variables:

```bash
cp .env.example .env
```

Edita el archivo `.env`:

```env
# Database Configuration
DB_NAME=punto-moda
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres

# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.development)

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 🎮 Uso

### Modo Desarrollo

Necesitarás **dos terminales**:

#### Terminal 1 - Backend (API)

```bash
npm run server:dev
```

El servidor se ejecutará en `http://localhost:3000`

#### Terminal 2 - Frontend (React)

```bash
npm run dev
```

La aplicación se ejecutará en `http://localhost:5173`

### Poblar la Base de Datos (Opcional)

```bash
npm run db:seed
```

### Producción

```bash
# Build del frontend
npm run build

# Ejecutar servidor
npm run server
```

---

## 📡 API Endpoints

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos (con filtros) |
| GET | `/api/products/:id` | Obtener producto por ID |
| GET | `/api/products/categories` | Obtener categorías |
| POST | `/api/products` | Crear producto (Admin) |
| PUT | `/api/products/:id` | Actualizar producto (Admin) |
| DELETE | `/api/products/:id` | Eliminar producto (Admin) |

**Filtros disponibles:**
- `?category=remeras`
- `?minPrice=1000&maxPrice=50000`
- `?search=nike`

### Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users/:id` | Obtener usuario por ID |
| POST | `/api/users` | Crear usuario (Registro) |
| PUT | `/api/users/:id` | Actualizar usuario |

### Carrito

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/cart/:userId` | Obtener carrito del usuario |
| POST | `/api/cart/:userId/items` | Agregar item al carrito |
| PUT | `/api/cart/:userId/items/:itemId` | Actualizar cantidad |
| DELETE | `/api/cart/:userId/items/:itemId` | Eliminar item |
| DELETE | `/api/cart/:userId` | Vaciar carrito |

### Órdenes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/orders` | Crear orden desde carrito |
| GET | `/api/orders/user/:userId` | Obtener órdenes de usuario |
| GET | `/api/orders/:id` | Obtener orden específica |

---

## 🎯 Mejoras Implementadas

### ✅ Seguridad
1. **Variables de entorno** - Credenciales de BD movidas a `.env`
2. **CORS configurado** - Solo permite origen del frontend
3. **Validación de datos** - Validación básica en controladores

### ✅ Arquitectura
1. **API REST completa** - Servidor Express.js con arquitectura MVC
2. **Separación de responsabilidades** - Controllers, Routes, Models
3. **Context API** - Estado global para usuario y carrito
4. **Servicio de API centralizado** - Cliente HTTP reutilizable

### ✅ Experiencia de Usuario
1. **Loading states** - Indicadores de carga durante peticiones
2. **Error handling** - Manejo de errores con mensajes claros
3. **Fallback offline** - Datos locales si la API no responde
4. **Optimistic UI** - Actualizaciones inmediatas del carrito

### ✅ Base de Datos
1. **Modelo robusto** - 11 tablas con relaciones bien definidas
2. **Transacciones** - Operaciones atómicas para órdenes
3. **Control de stock** - Validación de inventario en tiempo real

### ✅ Developer Experience
1. **Scripts NPM** - Comandos para dev, build, server
2. **Hot reload** - Actualización automática en desarrollo
3. **Documentación** - README completo con ejemplos

---

## 🔧 Optimizaciones Recomendadas

### 🔴 Alta Prioridad

1. **Autenticación JWT**
   - Implementar sistema de login con tokens
   - Proteger rutas privadas con middleware
   - Usar bcrypt para hashear contraseñas

2. **Validación de Datos**
   - Implementar validación con Zod o Joi
   - Sanitización de inputs
   - Validación de tipos en frontend

3. **Manejo de Errores Mejorado**
   - Logger centralizado (Winston, Pino)
   - Códigos de error consistentes
   - Mensajes de error i18n

4. **Testing**
   - Tests unitarios (Vitest)
   - Tests de integración para API
   - Tests E2E (Playwright)

### 🟡 Media Prioridad

5. **Optimización de Imágenes**
   - Implementar lazy loading
   - Usar CDN (Cloudinary, AWS S3)
   - Generar múltiples tamaños

6. **Caché**
   - Redis para sesiones y caché
   - Cache de consultas frecuentes
   - Service Worker para PWA

7. **Performance**
   - Code splitting
   - Lazy loading de componentes
   - Optimización de bundle size

8. **SEO**
   - Meta tags dinámicos
   - Server-Side Rendering (SSR) con Next.js
   - Sitemap.xml

### 🟢 Baja Prioridad

9. **Monitoreo**
   - Sentry para error tracking
   - Analytics (Google Analytics, Mixpanel)
   - Performance monitoring

10. **CI/CD**
    - GitHub Actions para tests
    - Deploy automático
    - Linting en pre-commit

---

## 📝 Notas Importantes

### Limitaciones Actuales

1. **Sin autenticación real** - El login es simulado
2. **Contraseñas sin hashear** - Se guardan en texto plano (usar bcrypt en producción)
3. **Sin paginación** - Todos los productos se cargan de una vez
4. **Sin rate limiting** - La API no tiene protección contra abuso
5. **Sin tests** - No hay cobertura de testing

### Datos de Prueba

El proyecto incluye un archivo JSON con 30 productos de ejemplo que se usa como fallback si la API no está disponible.

Para poblar la base de datos con datos reales, ejecuta:

```bash
npm run db:seed
```

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es privado y está desarrollado para Punto Moda Talentos.

---

## 👥 Autores

- **Frontend & Backend Integration** - Claude AI
- **Original Design** - Punto Moda Talentos Team

---

## 🆘 Soporte

Si tienes problemas:

1. Verifica que PostgreSQL esté corriendo
2. Revisa las variables de entorno en `.env`
3. Verifica los logs del servidor
4. Asegúrate de que los puertos 3000 y 5173 estén disponibles

Para reportar bugs o solicitar features, abre un issue en el repositorio.
