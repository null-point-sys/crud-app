package com.example.crudapp.dto;

import java.math.BigDecimal;

public class InventarioResponse {
    
    private BigDecimal valorTotalInventario;
    private ProductoResponse productoMayorValor;
    
    // Constructores
    public InventarioResponse() {}
    
    public InventarioResponse(BigDecimal valorTotalInventario, ProductoResponse productoMayorValor) {
        this.valorTotalInventario = valorTotalInventario;
        this.productoMayorValor = productoMayorValor;
    }
    
    // Getters y Setters
    public BigDecimal getValorTotalInventario() {
        return valorTotalInventario;
    }
    
    public void setValorTotalInventario(BigDecimal valorTotalInventario) {
        this.valorTotalInventario = valorTotalInventario;
    }
    
    public ProductoResponse getProductoMayorValor() {
        return productoMayorValor;
    }
    
    public void setProductoMayorValor(ProductoResponse productoMayorValor) {
        this.productoMayorValor = productoMayorValor;
    }
    
    @Override
    public String toString() {
        return "InventarioResponse{" +
                "valorTotalInventario=" + valorTotalInventario +
                ", productoMayorValor=" + productoMayorValor +
                '}';
    }
}
