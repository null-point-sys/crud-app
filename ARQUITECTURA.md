
## Arquitectura de la solución:

## Estructura del Proyecto

```
crud-app/
├── crud-app/                    # Backend (Spring Boot)
│   ├── src/main/java/com/example/crudapp/
│   │   ├── entity/              # Entidades JPA
│   │   ├── repository/          # Repositorios Spring Data
│   │   ├── service/             # Lógica de negocio
│   │   ├── controller/          # Controladores REST
│   │   ├── dto/                 # DTOs para requests/responses
│   │   └── config/              # Configuraciones
│   ├── src/main/resources/
│   │   └── application.properties
│   └── database/                # Scripts SQL
└── frontend/                    # Frontend (React)
    ├── src/
    │   ├── components/          # Componentes React
    │   ├── App.js               # Componente principal
    │   └── index.js             # Punto de entrada
    └── public/                  # Archivos estáticos

```

### Backend (Spring Boot)

- **Entidad JPA**: 			`Producto.java`
- **Repositorio**: 			`ProductoRepository.java` 	extiende JpaRepository
- **Servicio**: 			`ProductoService.java` 		con lógica de negocio
- **Controlador**: 			`ProductoController.java` 	con endpoints REST
- **DTOs**: 				Separación clara entre entidad y DTOs
- **Validaciones**: 		Bean Validation implementada
- **Swagger**: 				Documentación automática en `/swagger-ui.html`
- **Función especial**: 	Combinaciones de productos implementada
- **Cálculo inventario**: 	Valor total del inventario

### Frontend (React)

- **Componentes**: 		 	Estructura modular y reutilizable
- **CRUD completo**: 	 	Crear, leer, actualizar, eliminar
- **Búsqueda**: 		 	Filtrado en tiempo real
- **Ordenamiento**: 	 	Sin llamadas al backend
- **Responsive**: 		 	Funciona en móviles
- **APIs externas**: 	 	Gatos y datos inútiles integrados según requerimiento 
							desde https://github.com/wh-iterabb-it/meowfacts y https://uselessfacts.jsph.pl/
- **Manejo de errores**: 	Interfaz de usuario apropiada

### Base de Datos

- **Hibernate DDL**: 		Tablas creadas automáticamente
- **Conexión**: 			MySQL configurado correctamente
- **Persistencia**: 		Datos se guardan y recuperan

## Pruebas de Funcionalidad

### 1. CRUD Básico

1. **Crear producto**: 		Formulario funcional
2. **Listar productos**: 	Tabla con datos
3. **Editar producto**: 	Modal de edición
4. **Eliminar producto**: 	Confirmación y eliminación

### 2. Funcionalidades Avanzadas

1. **Búsqueda**: 			Buscar por nombre/descripción
2. **Ordenamiento**: 		Click en columnas para ordenar
3. **Estadísticas**: 		Valor total del inventario
4. **Combinaciones**: 		Función especial con valor máximo

### 3. APIs Externas

1. **Datos de gatos**: 		Modal al cargar página
2. **Dato inútil**: 		Footer con información del día


## Solución de Problemas Comunes:

### Error: "Maven not found"

**Solución**: Usar Maven Wrapper incluido
```bash
# En lugar de: mvn spring-boot:run
# Usar: ./mvnw spring-boot:run (Linux/macOS)
# O: mvnw.cmd spring-boot:run (Windows)
```

## 🔧 ¿Qué es Maven Wrapper?

**Maven Wrapper** es una herramienta que:
- **Incluye Maven** dentro del proyecto
- **Descarga automáticamente** la versión correcta de Maven
- **NO requiere** que Maven esté instalado en el sistema
- **Garantiza** que todos usen la misma versión

### Archivos del Maven Wrapper:
```
crud-app/
├── mvnw                 # Script para Linux/macOS
├── mvnw.cmd             # Script para Windows
├── .mvn/wrapper/        # Configuración y Maven incluido
└── pom.xml              # Dependencias del proyecto
```

### ¿Por qué NO es una dependencia del pom.xml?
- Es una **herramienta de construcción**, no una librería
- Se **incluye físicamente** en el proyecto
- **Antes** de que Maven se ejecute
- **Independiente** de las dependencias del proyecto

### Error: "Database connection failed"
**Solución**: Verificar MySQL y credenciales
```bash
# Verificar MySQL ejecutándose
mysql -u root -p
# Crear base de datos si no existe
CREATE DATABASE crud_app;
```
### Error: "Port already in use"
**Solución**: Cambiar puerto en `application.properties`
```properties
server.port=8081
```
### Error: "Node modules not found"
**Solución**: Instalar dependencias
```bash
cd frontend
npm install
```
