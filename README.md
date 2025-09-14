## Arquitectura de la solución:

### Estructura del Proyecto

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
│   └── database/                # Scripts SQL (solo requiere crearse la BD local Hibernate crea tablas)
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

### Base de Datos (MySQL)

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

# Instrucciones de instalación y ejecución de base de datos Mysql + Back Spring Boot + Front React

### Prerrequisitos Mínimos

- **Java 17+** verificar con `java -version` 
si no se cuenta con una versión superior a la 17 instalada en el equipo se puede descargar JAVA 20 de este link para windows: https://www.oracle.com/java/technologies/javase/jdk20-archive-downloads.html descargar: jdk-20.0.2_windows-x64_bin.exe

- **MySQL 8.0+** (ver guía en `MYSQL_SETUP.md`)

- **Node.js 16+** (verificar con `node --version`) si no se cuenta con Node JS en el equipo puede descargarse desde: https://nodejs.org/en

> **✅ NO necesitas Maven**: El proyecto incluye **Maven Wrapper** (`mvnw`/`mvnw.cmd`) 
que descarga automáticamente la versión correcta de Maven. Es como tener Maven "incluido" en el proyecto.
----
### 1. conectar la Base de Datos desde el proyecto Spring Boot: 

ver guía en `MYSQL_SETUP.md`

----
### 2. Ejecutar Backend Spring Boot Maven (No requiere MAVEN o Spring Boot IDE instalados en el equipo) 

> **💡 Nota importante**: El comando `mvnw.cmd` está dentro de la carpeta `crud-app`, no en el directorio raíz.
> es decir desde mi perspectiva: C:\...\Downloads\crud-app\crud-app

```bash
# IMPORTANTE: Ir al directorio del backend
cd ...\Downloads\crud-app\crud-app

# Windows: 
mvnw.cmd spring-boot:run
```
Este comando compila el proyecto (debes dejar corriendo esta consola) y verás algo como:

<img width="552" height="242" alt="image" src="https://github.com/user-attachments/assets/40110dbc-03a2-4abe-9bc7-0d0f1ff155ed" />

**✅ Verificar**: Abrir http://localhost:8080/api/productos/health
**Respuesta esperada**: "Producto API is running"

----

### 3. Validar Swagger que consiste en la documentación de los endpoints del proyecto:  

**✅ Verificar**: Abrir http://localhost:8080/swagger-ui.html

----

### 4. Ejecutar Frontend React

```bash
cd crud-app/frontend
npm install  			(instala la carpeta node_modules para React)
npm start				(inicializa el front en el navegador)
```

**✅ Verificar**: Abrir http://localhost:3000

----

## En este punto por el navegador se tienen 4 URLs activas:

1. http://localhost:8080/api/productos/health  valída el Back api REST corriendo
2. http://localhost:8080/swagger-ui.html       Swagger endpoints Back
3. http://localhost:8080/v3/api-docs		   documentación api
4. http://localhost:3000					   aplicación React Front



