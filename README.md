
# Instrucciones de instalación y ejecución de base de datos Mysql + Back Spring Boot + Front React

### Prerrequisitos Mínimos

- **Java 17+** verificar con `java -version` 
si no se cuenta con una versión superior a la 17 en la carpeta crud-app encuentras un instalador de JAVA 20 para windows: jdk-20.0.2_windows-x64_bin.exe

- **MySQL 8.0+** (ver guía en `MYSQL_SETUP.md`)

- **Node.js 16+** (verificar con `node --version`)

> **✅ NO necesitas Maven**: El proyecto incluye **Maven Wrapper** (`mvnw`/`mvnw.cmd`) 
que descarga automáticamente la versión correcta de Maven. Es como tener Maven "incluido" en el proyecto.

### 1. conectar la Base de Datos desde el proyecto Spring Boot: ver guía en `MYSQL_SETUP.md`

### 2. Ejecutar Backend Spring Boot Maven

> **💡 Nota importante**: El comando `mvnw.cmd` está dentro de la carpeta `crud-app`, no en el directorio raíz.
> es decir desde mi perspectiva: C:\...\Downloads\crud-app\crud-app

```bash
# IMPORTANTE: Ir al directorio del backend
cd ...\Downloads\crud-app\crud-app

# Windows: 
mvnw.cmd spring-boot:run
```
Este comando compila el proyecto (debes dejar corriendo esta consola) y verás algo como:

...
[INFO] --- spring-boot:3.5.5:run (default-cli) @ crud-app ---
[INFO] Attaching agents: []
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.5.5)
 ...


**✅ Verificar**: Abrir `http://localhost:8080/api/productos/health`
**Respuesta esperada**: "Producto API is running"

### 3. Validar Swagger que consiste en la documentación de los endpoints del proyecto:  http://localhost:8080/swagger-ui.html

### 4. Ejecutar Frontend React

```bash
cd crud-app/frontend
npm install  			(instala la carpeta node_modules para React)
npm start				(inicializa el front en el navegador)
```

**✅ Verificar**: Abrir `http://localhost:3000`

## En este punto por el navegador se tienen 4 URLs activas:

1. http://localhost:8080/api/productos/health  valída el Back api REST corriendo
2. http://localhost:8080/swagger-ui.html       Swagger endpoints Back
3. http://localhost:8080/v3/api-docs		       documentación api
4. http://localhost:3000					             aplicación React Front

