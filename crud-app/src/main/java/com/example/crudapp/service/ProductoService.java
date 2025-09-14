package com.example.crudapp.service;

import com.example.crudapp.dto.*;
import com.example.crudapp.entity.Producto;
import com.example.crudapp.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;
    
    // CRUD Operations
    
    public List<ProductoResponse> getAllProductos() {
        return productoRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public ProductoResponse getProductoById(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));
        return convertToResponse(producto);
    }
    
    public ProductoResponse createProducto(ProductoRequest request) {
        Producto producto = new Producto(
                request.getNombre(),
                request.getDescripcion(),
                request.getPrecio(),
                request.getCantidadStock()
        );
        Producto savedProducto = productoRepository.save(producto);
        return convertToResponse(savedProducto);
    }
    
    public ProductoResponse updateProducto(Long id, ProductoRequest request) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));
        
        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecio(request.getPrecio());
        producto.setCantidadStock(request.getCantidadStock());
        
        Producto updatedProducto = productoRepository.save(producto);
        return convertToResponse(updatedProducto);
    }
    
    public void deleteProducto(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new RuntimeException("Producto no encontrado con ID: " + id);
        }
        productoRepository.deleteById(id);
    }
    
    // Búsquedas y filtros
    
    public List<ProductoResponse> searchProductos(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public List<ProductoResponse> getProductosByPrecioRange(BigDecimal precioMin, BigDecimal precioMax) {
        return productoRepository.findByPrecioBetween(precioMin, precioMax).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public List<ProductoResponse> getProductosLowStock(Integer cantidad) {
        return productoRepository.findByCantidadStockLessThan(cantidad).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    // Funciones de inventario
    
    public InventarioResponse getInventarioInfo() {
        BigDecimal valorTotal = productoRepository.getValorTotalInventario();
        if (valorTotal == null) {
            valorTotal = BigDecimal.ZERO;
        }
        
        List<Producto> productos = productoRepository.findProductosOrderByValorInventarioDesc();
        ProductoResponse productoMayorValor = null;
        if (!productos.isEmpty()) {
            productoMayorValor = convertToResponse(productos.get(0));
        }
        
        return new InventarioResponse(valorTotal, productoMayorValor);
    }
    
    // Función compleja: Combinaciones de productos
    public List<CombinacionProductosResponse> getCombinacionesProductos(BigDecimal valorMaximo) {
        List<Producto> productos = productoRepository.findAll();
        List<CombinacionProductosResponse> combinaciones = new ArrayList<>();
        
        // Generar todas las combinaciones de 2 y 3 productos
        List<List<Producto>> combinaciones2 = generarCombinaciones(productos, 2);
        List<List<Producto>> combinaciones3 = generarCombinaciones(productos, 3);
        
        // Procesar combinaciones de 2 productos
        for (List<Producto> combinacion : combinaciones2) {
            BigDecimal suma = combinacion.stream()
                    .map(Producto::getPrecio)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            if (suma.compareTo(valorMaximo) <= 0) {
                List<String> nombres = combinacion.stream()
                        .map(Producto::getNombre)
                        .collect(Collectors.toList());
                combinaciones.add(new CombinacionProductosResponse(nombres, suma));
            }
        }
        
        // Procesar combinaciones de 3 productos
        for (List<Producto> combinacion : combinaciones3) {
            BigDecimal suma = combinacion.stream()
                    .map(Producto::getPrecio)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            if (suma.compareTo(valorMaximo) <= 0) {
                List<String> nombres = combinacion.stream()
                        .map(Producto::getNombre)
                        .collect(Collectors.toList());
                combinaciones.add(new CombinacionProductosResponse(nombres, suma));
            }
        }
        
        // Ordenar por suma de precios descendente y limitar a 5 elementos
        return combinaciones.stream()
                .sorted((c1, c2) -> c2.getSumaPrecios().compareTo(c1.getSumaPrecios()))
                .limit(5)
                .collect(Collectors.toList());
    }
    
    // Método auxiliar para generar combinaciones
    private List<List<Producto>> generarCombinaciones(List<Producto> productos, int tamano) {
        List<List<Producto>> combinaciones = new ArrayList<>();
        generarCombinacionesRecursivo(productos, tamano, 0, new ArrayList<>(), combinaciones);
        return combinaciones;
    }
    
    private void generarCombinacionesRecursivo(List<Producto> productos, int tamano, int inicio, 
                                             List<Producto> actual, List<List<Producto>> combinaciones) {
        if (actual.size() == tamano) {
            combinaciones.add(new ArrayList<>(actual));
            return;
        }
        
        for (int i = inicio; i < productos.size(); i++) {
            actual.add(productos.get(i));
            generarCombinacionesRecursivo(productos, tamano, i + 1, actual, combinaciones);
            actual.remove(actual.size() - 1);
        }
    }
    
    // Método auxiliar para convertir entidad a DTO
    private ProductoResponse convertToResponse(Producto producto) {
        return new ProductoResponse(
                producto.getId(),
                producto.getNombre(),
                producto.getDescripcion(),
                producto.getPrecio(),
                producto.getCantidadStock()
        );
    }
}
