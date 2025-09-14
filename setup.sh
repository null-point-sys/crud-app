#!/bin/bash

echo "========================================"
echo "    CRUD App - Setup Script"
echo "========================================"
echo

echo "[1/4] Verificando estructura del proyecto..."
if [ ! -d "crud-app" ]; then
    echo "ERROR: Directorio crud-app no encontrado"
    exit 1
fi

if [ ! -d "frontend" ]; then
    echo "ERROR: Directorio frontend no encontrado"
    exit 1
fi

echo "✓ Estructura del proyecto verificada"
echo

echo "[2/4] Configurando backend (Spring Boot)..."
cd crud-app
if [ -f "mvnw" ]; then
    echo "✓ Maven Wrapper encontrado"
    chmod +x mvnw
else
    echo "ERROR: Maven Wrapper no encontrado"
    exit 1
fi

echo
echo "[3/4] Configurando frontend (React)..."
cd ../frontend
if [ -f "package.json" ]; then
    echo "✓ package.json encontrado"
    echo "Instalando dependencias de Node.js..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Error al instalar dependencias de Node.js"
        exit 1
    fi
    echo "✓ Dependencias de Node.js instaladas"
else
    echo "ERROR: package.json no encontrado"
    exit 1
fi

echo
echo "[4/4] Setup completado exitosamente!"
echo
echo "========================================"
echo "    INSTRUCCIONES DE EJECUCION"
echo "========================================"
echo
echo "1. Configura la base de datos MySQL:"
echo "   - Crea una base de datos llamada 'crud_app'"
echo "   - Actualiza las credenciales en crud-app/src/main/resources/application.properties"
echo
echo "2. Ejecuta el backend:"
echo "   cd crud-app"
echo "   ./mvnw spring-boot:run"
echo
echo "3. Ejecuta el frontend (en otra terminal):"
echo "   cd frontend"
echo "   npm start"
echo
echo "4. Abre tu navegador en: http://localhost:3000"
echo
echo "========================================"
