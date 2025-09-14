import React, { useState, useEffect } from 'react';

const InventarioStats = ({ productos }) => {
  const [inventarioInfo, setInventarioInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInventarioInfo();
  }, [productos]);

  const loadInventarioInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/productos/inventario');
      if (response.ok) {
        const data = await response.json();
        setInventarioInfo(data);
      }
    } catch (error) {
      console.error('Error al cargar información del inventario:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calcular estadísticas locales como respaldo
  const calcularEstadisticasLocales = () => {
    if (productos.length === 0) {
      return {
        valorTotal: 0,
        productoMayorValor: null,
        totalProductos: 0,
        stockBajo: 0
      };
    }

    // Calcular valor total sumando precio * cantidad de cada producto
    const valorTotal = productos.reduce((sum, producto) => {
      const valorProducto = parseFloat(producto.precio) * parseInt(producto.cantidadStock);
      console.log(`Producto: ${producto.nombre}, Precio: ${producto.precio}, Cantidad: ${producto.cantidadStock}, Valor: ${valorProducto}`);
      return sum + valorProducto;
    }, 0);
    
    console.log('Valor total calculado:', valorTotal);

    // Encontrar el producto con mayor valor de inventario
    const productoMayorValor = productos.reduce((max, producto) => {
      const valorActual = parseFloat(producto.precio) * parseInt(producto.cantidadStock);
      const valorMaximo = parseFloat(max.precio) * parseInt(max.cantidadStock);
      return valorActual > valorMaximo ? producto : max;
    });

    const stockBajo = productos.filter(p => p.cantidadStock < 10).length;

    return {
      valorTotal,
      productoMayorValor,
      totalProductos: productos.length,
      stockBajo
    };
  };

  // Siempre usar cálculo local para asegurar que funcione
  const stats = calcularEstadisticasLocales();

  // Debug: Mostrar los valores calculados
  console.log('InventarioStats - productos:', productos);
  console.log('InventarioStats - stats:', stats);
  console.log('InventarioStats - valorTotal:', stats.valorTotal);

  if (loading) {
    return (
      <div className="stats-grid">
        <div className="stat-card">
          <h3>📊 Cargando estadísticas...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>💰 Valor Total del Inventario</h3>
        <div className="value">
          ${parseFloat(stats.valorTotal || 0).toLocaleString('es-CO')} COP
        </div>
        <p>Suma total de todos los productos</p>
      </div>

      <div className="stat-card">
        <h3>📦 Total de Productos</h3>
        <div className="value">
          {stats.totalProductos || productos.length}
        </div>
        <p>Productos registrados en el sistema</p>
      </div>

      <div className="stat-card">
        <h3>🏆 Producto de Mayor Valor</h3>
        <div className="value">
          {stats.productoMayorValor ? 
            `${stats.productoMayorValor.nombre}` : 
            'N/A'
          }
        </div>
        <p>
          {stats.productoMayorValor ? 
            `$${(parseFloat(stats.productoMayorValor.precio) * parseInt(stats.productoMayorValor.cantidadStock)).toLocaleString('es-CO')} COP` : 
            'Sin productos'
          }
        </p>
      </div>

      <div className="stat-card">
        <h3>⚠️ Stock Bajo</h3>
        <div className="value">
          {stats.stockBajo || productos.filter(p => p.cantidadStock < 10).length}
        </div>
        <p>Productos con menos de 10 unidades</p>
      </div>
    </div>
  );
};

export default InventarioStats;
