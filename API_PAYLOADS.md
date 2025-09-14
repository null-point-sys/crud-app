
# Payloads JSON de la API crud-app

Este documento define explícitamente todos los payloads JSON utilizados en la comunicación entre el frontend React 
y el backend Spring Boot y que pueden ser testeados a través de Swagger: http://localhost:8080/swagger-ui.html

## Request Payloads

### 1. Crear Producto (POST /api/productos)

```json
{
  "nombre": "Laptop Dell Inspiron 15 3000",
  "descripcion": "Laptop Dell Inspiron 15 3000 con procesador Intel i5, 8GB RAM, 256GB SSD",
  "precio": 899.99,
  "cantidadStock": 10
}
```

**Validaciones:**
- `nombre`: String obligatorio, máximo 100 caracteres
- `descripcion`: String obligatorio, máximo 500 caracteres  
- `precio`: Number obligatorio, debe ser > 0
- `cantidadStock`: Integer obligatorio, debe ser >= 0

### 2. Actualizar Producto (PUT /api/productos/{id})

```json
{
  "nombre": "Laptop Dell Inspiron 15 3000 - Actualizada",
  "descripcion": "Laptop Dell Inspiron 15 3000 con procesador Intel i7, 16GB RAM, 512GB SSD",
  "precio": 1099.99,
  "cantidadStock": 15
}
```

**Validaciones:** Mismas que crear producto

### 3. Buscar Productos (GET /api/productos/search)

**Query Parameters:**
```
GET /api/productos/search?nombre=laptop
```

### 4. Filtrar por Rango de Precio (GET /api/productos/precio-range)

**Query Parameters:**
```
GET /api/productos/precio-range?precioMin=100&precioMax=500
```

### 5. Productos con Stock Bajo (GET /api/productos/low-stock)

**Query Parameters:**
```
GET /api/productos/low-stock?cantidad=10
```

### 6. Combinaciones de Productos (GET /api/productos/combinaciones)

**Query Parameters:**
```
GET /api/productos/combinaciones?valorMaximo=100.00
```

## Response Payloads

### 1. Producto Individual (GET /api/productos/{id})

```json
{
  "id": 1,
  "nombre": "Laptop Dell Inspiron 15 3000",
  "descripcion": "Laptop Dell Inspiron 15 3000 con procesador Intel i5, 8GB RAM, 256GB SSD",
  "precio": 899.99,
  "cantidadStock": 10,
  "valorInventario": 8999.90
}
```

### 2. Lista de Productos (GET /api/productos)

```json
[
  {
    "id": 1,
    "nombre": "Laptop Dell Inspiron 15 3000",
    "descripcion": "Laptop Dell Inspiron 15 3000 con procesador Intel i5, 8GB RAM, 256GB SSD",
    "precio": 899.99,
    "cantidadStock": 10,
    "valorInventario": 8999.90
  },
  {
    "id": 2,
    "nombre": "Mouse Logitech M705",
    "descripcion": "Mouse inalámbrico Logitech M705 con batería de larga duración",
    "precio": 49.99,
    "cantidadStock": 25,
    "valorInventario": 1249.75
  }
]
```

### 3. Información del Inventario (GET /api/productos/inventario)

```json
{
  "valorTotalInventario": 10249.65,
  "productoMayorValor": {
    "id": 1,
    "nombre": "Laptop Dell Inspiron 15 3000",
    "descripcion": "Laptop Dell Inspiron 15 3000 con procesador Intel i5, 8GB RAM, 256GB SSD",
    "precio": 899.99,
    "cantidadStock": 10,
    "valorInventario": 8999.90
  }
}
```

### 4. Combinaciones de Productos (GET /api/productos/combinaciones)

```json
[
  {
    "nombresProductos": ["Laptop Dell", "Mouse Logitech"],
    "sumaPrecios": 949.98
  },
  {
    "nombresProductos": ["Teclado Mecánico", "Monitor Samsung"],
    "sumaPrecios": 329.98
  },
  {
    "nombresProductos": ["Mouse Logitech", "Teclado Mecánico"],
    "sumaPrecios": 179.98
  }
]
```

## Error Payloads

### 1. Error de Validación (400 Bad Request)

```json
{
  "timestamp": "2024-01-15T10:30:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/productos",
  "details": [
    {
      "field": "nombre",
      "message": "El nombre es obligatorio"
    },
    {
      "field": "precio",
      "message": "El precio debe ser mayor a 0"
    }
  ]
}
```

### 2. Error de Recurso No Encontrado (404 Not Found)

```json
{
  "timestamp": "2024-01-15T10:30:00.000+00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Producto no encontrado con ID: 999",
  "path": "/api/productos/999"
}
```

### 3. Error del Servidor (500 Internal Server Error)

```json
{
  "timestamp": "2024-01-15T10:30:00.000+00:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Error interno del servidor",
  "path": "/api/productos"
}
```

## Estados HTTP Utilizados

| Método | Endpoint          			  | Código de Éxito | Códigos de Error |
|--------|--------------------------------|-----------------|------------------|
| GET 	 | `/api/productos` 			  | 200 			| 500 			   |
| GET    | `/api/productos/{id}` 		  | 200 			| 404, 500 		   |
| POST   | `/api/productos` 			  | 201 			| 400, 500 	 	   |
| PUT    | `/api/productos/{id}` 		  | 200 			| 400, 404, 500    |
| DELETE | `/api/productos/{id}` 		  | 204 			| 404, 500 	   	   |
| GET    | `/api/productos/inventario` 	  | 200 			| 500 			   |
| GET    | `/api/productos/combinaciones` | 200 			| 400, 500 		   |

## Notas de Diseño

### 1. Consistencia en Nombres

- Uso de `camelCase` para propiedades JSON
- Nombres descriptivos y claros
- Consistencia entre request y response

### 2. Tipos de Datos

- `id`: Long (entero de 64 bits)
- `precio`: BigDecimal (decimal con 2 decimales)
- `cantidadStock`: Integer
- `valorInventario`: BigDecimal (calculado automáticamente)

### 3. Validaciones

- Campos obligatorios claramente definidos
- Rangos de valores apropiados
- Mensajes de error descriptivos

### 4. Extensibilidad
- Estructura preparada para futuras extensiones
- Campos calculados separados de campos de entrada
- Respuestas modulares y reutilizables

## Ejemplos de Pruebas

### Crear Producto de Prueba
```bash
curl -X POST http://localhost:8080/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Producto de Prueba",
    "descripcion": "Descripción del producto de prueba",
    "precio": 10000,
    "cantidadStock": 5
  }'
```

### Obtener Combinaciones
```bash
curl "http://localhost:8080/api/productos/combinaciones?valorMaximo=200000"
```

### Obtener Inventario
```bash
curl http://localhost:8080/api/productos/inventario
```

---

**Nota:** Estos payloads fueron diseñados siguiendo las mejores prácticas de APIs REST y están optimizados para 
la comunicación eficiente entre el frontend React y el backend Spring Boot.
