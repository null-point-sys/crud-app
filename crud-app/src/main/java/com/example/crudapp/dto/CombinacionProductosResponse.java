package com.example.crudapp.dto;

import java.math.BigDecimal;
import java.util.List;

public class CombinacionProductosResponse {
    
    private List<String> nombresProductos;
    private BigDecimal sumaPrecios;
    
    // Constructores
    public CombinacionProductosResponse() {}
    
    public CombinacionProductosResponse(List<String> nombresProductos, BigDecimal sumaPrecios) {
        this.nombresProductos = nombresProductos;
        this.sumaPrecios = sumaPrecios;
    }
    
    // Getters y Setters
    public List<String> getNombresProductos() {
        return nombresProductos;
    }
    
    public void setNombresProductos(List<String> nombresProductos) {
        this.nombresProductos = nombresProductos;
    }
    
    public BigDecimal getSumaPrecios() {
        return sumaPrecios;
    }
    
    public void setSumaPrecios(BigDecimal sumaPrecios) {
        this.sumaPrecios = sumaPrecios;
    }
    
    @Override
    public String toString() {
        return "CombinacionProductosResponse{" +
                "nombresProductos=" + nombresProductos +
                ", sumaPrecios=" + sumaPrecios +
                '}';
    }
}
