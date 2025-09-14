# Configuración de MySQL Local para crud-app en Windows:

  Esta guía te ayudará a configurar MySQL local para que funcione con la aplicación crud-app.

# Descargar e Instalar MySQL en Windows:

1. Descargar MySQL: Ve a [mysql.com/downloads](https://downloads.mysql.com/archives/community/)

2. Buscar y Descargar MySQL 8.0.11 ZIP

   Ventajas del formato ZIP:
   ✅ No requiere instalador
   ✅ No necesita Visual Studio Redistributable
   ✅ Más fácil de configurar
   ✅ Perfecto para desarrollo

3. **Instalar**: descomprimir el .zip  

# Ir al directorio de MySQL: 
```bash
   cd C:\...\Downloads\mysql-8.0.11-winx64\mysql-8.0.11-winx64\bin
```
# Inicializar la base de datos:
```bash 
    mysqld --initialize --console
```  
# Iniciar MySQL
```bash  
   mysqld --console 
```
# MySQL está ejecutándose correctamente y está escuchando en el puerto 3306, en esta consola verás un mensaje semejante a este: 
```bash
    ... A temporary password is generated for root@localhost: %4kX=l&d*5i. 
```    
# es tu password para acceder como usuario root, copialo porque se necesita en la siguiente consola.

# Para continuar, necesitas abrir OTRA consola en:
```bash 
   C:\...\Downloads\mysql-8.0.11-winx64\mysql-8.0.11-winx64\bin 
``` 

4. **Configurar root password**: 

### 2. Verificar Instalación MySQL

# Para continuar, en la segunda consola abierta en:
```bash 
    C:\...\Downloads\mysql-8.0.11-winx64\mysql-8.0.11-winx64\bin
``` 
# Verificar que MySQL esté ejecutándose
```bash 
    mysql --version
    mysql  Ver 8.0.11 for Win64 on x86_64 (MySQL Community Server - GPL)
``` 
# Conectar a MySQL
```bash 
    mysql -u root -p
    Enter password: <aqui colocas la temporary password de la consola que aún esta abierta, en mi caso particular:  %4kX=l&d*5i.>
``` 
# A continuación verás la consola:  
```bash
    mysql>  
``` 
# MySQL 8.0. MySQL requiere que cambies la contraseña temporal antes de poder ejecutar comandos, es una medida de seguridad.
```bash
    mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
    Query OK, 0 rows affected (0.04 sec)
```
# verfica que el cambio funcionó:
```bash
    mysql> SELECT 1;
    +---+
    | 1 |
    +---+
    | 1 |
    +---+
    1 row in set (0.00 sec)
```
# Crear Base de Datos
```bash
    mysql > CREATE DATABASE crud_app;
    Query OK, 1 row affected (0.05 sec)
```
# Verificar que se creó
```bash
    SHOW DATABASES;
    +--------------------+
    | Database           |
    +--------------------+
    | crud_app           | <-- aqui está la base de datos creada
    | information_schema |
    | mysql              |
    | performance_schema |
    | sys                |
    +--------------------+
    5 rows in set (0.03 sec)
```
# Salir de MySQL
```bash
    EXIT;
```

# Configuración de la BD MySQL en el proyecto JAVA Maven:

## 1. Actualizar application.properties en caso de que exista una instalación previa de MySQL en el equipo

### Edita el archivo `crud-app/src/main/resources/application.properties` con tu contraseña de MySQL en caso de que sea diferente de 123456

```properties
# Database Configuration - MySQL Local
spring.datasource.url=jdbc:mysql://localhost:3306/crud_app?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Server Configuration
server.port=8080

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

### 2. ¿Qué hace Hibernate automáticamente al compilar el proyecto?

Con `spring.jpa.hibernate.ddl-auto=update`, Hibernate:

✅ **Crea automáticamente la tabla** `productos` si no existe
✅ **Actualiza la estructura** si cambias la entidad
✅ **NO elimina datos** existentes
✅ **Maneja las relaciones** entre tablas

## Estructura de Tabla Creada por Hibernate desde el proyecto JAVA Maven

Hibernate creará automáticamente esta tabla a partir de la entidad Producto.java

```sql
CREATE TABLE productos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    cantidad_stock INT NOT NULL
);
```

## Probar la Configuración de MySQL en el proyecto JAVA Maven Spring Boot

### 1. Ejecutar la Aplicación equivale a compilar el back es decir el proyecto JAVA Maven Spring Boot que habilitará los endpoints REST

```bash
# en Windows:
mvnw.cmd spring-boot:run
```

### 2. Verificar en la Consola

Deberías ver logs como:
```
Hibernate: create table productos (id bigint not null auto_increment, cantidad_stock integer not null, descripcion varchar(500) not null, nombre varchar(100) not null, precio decimal(10,2) not null, primary key (id))
```

## Ahora para verificar que el Back JAVA Maven Spring Boot + BD Mysql funcionan:

### 1. Health Check: en el navegador http://localhost:8080/api/productos/health

    Debería responder: "Producto API is running"

### 2. Crear un Producto de Prueba a través de Swagger en http://localhost:8080/swagger-ui/index.html

    Busca el endpoint POST api/products y ejecuta la inserción de un producto

    {
        "nombre": "Producto de Prueba",
        "descripcion": "Descripción del producto de prueba",
        "precio": 1000,
        "cantidadStock": 5
    }

### 3. Verificar inserción en la Base de Datos a través de Swagger

    GET api/products Obtener todos los productos 
