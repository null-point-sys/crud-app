package com.example.crudapp.repository;

import com.example.crudapp.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
    // Buscar productos por nombre (búsqueda parcial, case insensitive)
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
    
    // Buscar productos por rango de precio
    List<Producto> findByPrecioBetween(BigDecimal precioMin, BigDecimal precioMax);
    
    // Buscar productos con stock bajo (menos de 10 unidades)
    List<Producto> findByCantidadStockLessThan(Integer cantidad);
    
    // Obtener el producto con mayor valor de inventario
    @Query("SELECT p FROM Producto p ORDER BY (p.precio * p.cantidadStock) DESC")
    List<Producto> findProductosOrderByValorInventarioDesc();
    
    // Obtener el valor total del inventario
    @Query("SELECT SUM(p.precio * p.cantidadStock) FROM Producto p")
    BigDecimal getValorTotalInventario();
    
    // Obtener productos ordenados por precio ascendente
    List<Producto> findAllByOrderByPrecioAsc();
    
    // Obtener productos ordenados por precio descendente
    List<Producto> findAllByOrderByPrecioDesc();
    
    // Obtener productos ordenados por nombre
    List<Producto> findAllByOrderByNombreAsc();
}
