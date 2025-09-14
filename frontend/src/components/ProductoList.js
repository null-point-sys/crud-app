import React, { useState } from 'react';

const ProductoList = ({ productos, onEdit, onDelete, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nombre');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filtrar productos basado en el término de búsqueda
  const filteredProductos = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ordenar productos
  const sortedProductos = [...filteredProductos].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'precio':
        aValue = parseFloat(a.precio);
        bValue = parseFloat(b.precio);
        break;
      case 'cantidadStock':
        aValue = a.cantidadStock;
        bValue = b.cantidadStock;
        break;
      case 'valorInventario':
        aValue = parseFloat(a.valorInventario);
        bValue = parseFloat(b.valorInventario);
        break;
      default:
        aValue = a.nombre.toLowerCase();
        bValue = b.nombre.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Buscar productos por nombre o descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="nombre">Ordenar por Nombre</option>
          <option value="precio">Ordenar por Precio</option>
          <option value="cantidadStock">Ordenar por Stock</option>
          <option value="valorInventario">Ordenar por Valor Inventario</option>
        </select>
        <button 
          className="btn btn-warning"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? '↑ Ascendente' : '↓ Descendente'}
        </button>
        <button 
          className="btn"
          onClick={onRefresh}
        >
          🔄 Actualizar
        </button>
      </div>

      {sortedProductos.length === 0 ? (
        <div className="alert alert-info">
          {searchTerm ? 'No se encontraron productos que coincidan con la búsqueda.' : 'No hay productos registrados.'}
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => handleSort('nombre')} style={{ cursor: 'pointer' }}>
                  Nombre {getSortIcon('nombre')}
                </th>
                <th>Descripción</th>
                <th onClick={() => handleSort('precio')} style={{ cursor: 'pointer' }}>
                  Precio {getSortIcon('precio')}
                </th>
                <th onClick={() => handleSort('cantidadStock')} style={{ cursor: 'pointer' }}>
                  Stock {getSortIcon('cantidadStock')}
                </th>
                <th onClick={() => handleSort('valorInventario')} style={{ cursor: 'pointer' }}>
                  Valor Inventario {getSortIcon('valorInventario')}
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedProductos.map((producto) => (
                <tr key={producto.id}>
                  <td>
                    <strong>{producto.nombre}</strong>
                  </td>
                  <td>
                    <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {producto.descripcion}
                    </div>
                  </td>
                  <td>
                    <span style={{ color: '#28a745', fontWeight: 'bold' }}>
                      ${parseFloat(producto.precio).toLocaleString('es-CO')} COP
                    </span>
                  </td>
                  <td>
                    <span style={{ 
                      color: producto.cantidadStock < 10 ? '#dc3545' : '#28a745',
                      fontWeight: 'bold'
                    }}>
                      {producto.cantidadStock} unidades
                    </span>
                  </td>
                  <td>
                    <span style={{ color: '#007bff', fontWeight: 'bold' }}>
                      ${parseFloat(producto.valorInventario).toLocaleString('es-CO')} COP
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => onEdit(producto)}
                      style={{ marginRight: '5px' }}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDelete(producto.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
        Mostrando {sortedProductos.length} de {productos.length} productos
        {searchTerm && ` (filtrados por "${searchTerm}")`}
      </div>
    </div>
  );
};

export default ProductoList;
