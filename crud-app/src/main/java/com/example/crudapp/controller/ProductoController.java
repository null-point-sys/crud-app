package com.example.crudapp.controller;

import com.example.crudapp.dto.*;
import com.example.crudapp.service.ProductoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Productos", description = "API para gestión de productos")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;
    
    // CRUD Endpoints
    
    @GetMapping
    @Operation(summary = "Obtener todos los productos", description = "Retorna una lista de todos los productos en el sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de productos obtenida exitosamente")
    })
    public ResponseEntity<List<ProductoResponse>> getAllProductos() {
        List<ProductoResponse> productos = productoService.getAllProductos();
        return ResponseEntity.ok(productos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductoResponse> getProductoById(@PathVariable Long id) {
        try {
            ProductoResponse producto = productoService.getProductoById(id);
            return ResponseEntity.ok(producto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<ProductoResponse> createProducto(@Valid @RequestBody ProductoRequest request) {
        try {
            ProductoResponse producto = productoService.createProducto(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(producto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ProductoResponse> updateProducto(@PathVariable Long id, @Valid @RequestBody ProductoRequest request) {
        try {
            ProductoResponse producto = productoService.updateProducto(id, request);
            return ResponseEntity.ok(producto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        try {
            productoService.deleteProducto(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Search and Filter Endpoints
    
    @GetMapping("/search")
    public ResponseEntity<List<ProductoResponse>> searchProductos(@RequestParam String nombre) {
        List<ProductoResponse> productos = productoService.searchProductos(nombre);
        return ResponseEntity.ok(productos);
    }
    
    @GetMapping("/precio-range")
    public ResponseEntity<List<ProductoResponse>> getProductosByPrecioRange(
            @RequestParam BigDecimal precioMin, 
            @RequestParam BigDecimal precioMax) {
        List<ProductoResponse> productos = productoService.getProductosByPrecioRange(precioMin, precioMax);
        return ResponseEntity.ok(productos);
    }
    
    @GetMapping("/low-stock")
    public ResponseEntity<List<ProductoResponse>> getProductosLowStock(@RequestParam(defaultValue = "10") Integer cantidad) {
        List<ProductoResponse> productos = productoService.getProductosLowStock(cantidad);
        return ResponseEntity.ok(productos);
    }
    
    // Inventory Endpoints
    
    @GetMapping("/inventario")
    public ResponseEntity<InventarioResponse> getInventarioInfo() {
        InventarioResponse inventario = productoService.getInventarioInfo();
        return ResponseEntity.ok(inventario);
    }
    
    // Special Function: Product Combinations
    @GetMapping("/combinaciones")
    @Operation(summary = "Obtener combinaciones de productos", 
               description = "Retorna combinaciones de 2-3 productos cuya suma de precios sea menor o igual al valor máximo especificado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Combinaciones obtenidas exitosamente")
    })
    public ResponseEntity<List<CombinacionProductosResponse>> getCombinacionesProductos(
            @Parameter(description = "Valor máximo para la suma de precios de productos") 
            @RequestParam BigDecimal valorMaximo) {
        List<CombinacionProductosResponse> combinaciones = productoService.getCombinacionesProductos(valorMaximo);
        return ResponseEntity.ok(combinaciones);
    }
    
    // Health Check
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Producto API is running");
    }
}
