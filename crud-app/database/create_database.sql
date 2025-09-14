-- Script para crear la base de datos crud_app
-- Ejecutar este script en MySQL antes de ejecutar la aplicación

CREATE DATABASE IF NOT EXISTS crud_app;
USE crud_app;

-- La tabla productos se creará automáticamente por Hibernate
-- con la configuración spring.jpa.hibernate.ddl-auto=update

-- Datos de ejemplo (opcional)
-- INSERT INTO productos (nombre, descripcion, precio, cantidad_stock) VALUES
-- ('Laptop Dell', 'Laptop Dell Inspiron 15 3000', 899.99, 10),
-- ('Mouse Logitech', 'Mouse inalámbrico Logitech M705', 49.99, 25),
-- ('Teclado Mecánico', 'Teclado mecánico RGB', 129.99, 15),
-- ('Monitor Samsung', 'Monitor Samsung 24 pulgadas', 199.99, 8),
-- ('Auriculares Sony', 'Auriculares inalámbricos Sony WH-1000XM4', 349.99, 5);
