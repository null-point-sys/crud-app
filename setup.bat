@echo off
echo ========================================
echo    CRUD App - Setup Script
echo ========================================
echo.

echo [1/4] Verificando estructura del proyecto...
if not exist "crud-app" (
    echo ERROR: Directorio crud-app no encontrado
    pause
    exit /b 1
)

if not exist "frontend" (
    echo ERROR: Directorio frontend no encontrado
    pause
    exit /b 1
)

echo ✓ Estructura del proyecto verificada
echo.

echo [2/4] Configurando backend (Spring Boot)...
cd crud-app
if exist "mvnw.cmd" (
    echo ✓ Maven Wrapper encontrado
) else (
    echo ERROR: Maven Wrapper no encontrado
    pause
    exit /b 1
)

echo.
echo [3/4] Configurando frontend (React)...
cd ..\frontend
if exist "package.json" (
    echo ✓ package.json encontrado
    echo Instalando dependencias de Node.js...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Error al instalar dependencias de Node.js
        pause
        exit /b 1
    )
    echo ✓ Dependencias de Node.js instaladas
) else (
    echo ERROR: package.json no encontrado
    pause
    exit /b 1
)

echo.
echo [4/4] Setup completado exitosamente!
echo.
echo ========================================
echo    INSTRUCCIONES DE EJECUCION
echo ========================================
echo.
echo 1. Configura la base de datos MySQL:
echo    - Crea una base de datos llamada "crud_app"
echo    - Actualiza las credenciales en crud-app/src/main/resources/application.properties
echo.
echo 2. Ejecuta el backend:
echo    cd crud-app
echo    mvnw.cmd spring-boot:run
echo.
echo 3. Ejecuta el frontend (en otra terminal):
echo    cd frontend
echo    npm start
echo.
echo 4. Abre tu navegador en: http://localhost:3000
echo.
echo ========================================
pause
