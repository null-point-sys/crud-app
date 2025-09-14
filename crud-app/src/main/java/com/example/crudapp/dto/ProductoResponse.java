package com.example.crudapp.dto;

import java.math.BigDecimal;

public class ProductoResponse {
    
    private Long id;
    private String nombre;
    private String descripcion;
    private BigDecimal precio;
    private Integer cantidadStock;
    private BigDecimal valorInventario;
    
    // Constructores
    public ProductoResponse() {}
    
    public ProductoResponse(Long id, String nombre, String descripcion, BigDecimal precio, Integer cantidadStock) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidadStock = cantidadStock;
        this.valorInventario = precio.multiply(BigDecimal.valueOf(cantidadStock));
    }
    
    // Getters y Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public BigDecimal getPrecio() {
        return precio;
    }
    
    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }
    
    public Integer getCantidadStock() {
        return cantidadStock;
    }
    
    public void setCantidadStock(Integer cantidadStock) {
        this.cantidadStock = cantidadStock;
    }
    
    public BigDecimal getValorInventario() {
        return valorInventario;
    }
    
    public void setValorInventario(BigDecimal valorInventario) {
        this.valorInventario = valorInventario;
    }
    
    @Override
    public String toString() {
        return "ProductoResponse{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", precio=" + precio +
                ", cantidadStock=" + cantidadStock +
                ", valorInventario=" + valorInventario +
                '}';
    }
}
