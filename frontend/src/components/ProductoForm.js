import React, { useState, useEffect } from 'react';

const ProductoForm = ({ producto, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    cantidadStock: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        precio: producto.precio || '',
        cantidadStock: producto.cantidadStock || ''
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es obligatoria';
    }

    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      newErrors.precio = 'El precio debe ser mayor a 0';
    }

    if (!formData.cantidadStock || parseInt(formData.cantidadStock) < 0) {
      newErrors.cantidadStock = 'La cantidad en stock no puede ser negativa';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const productoData = {
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim(),
        precio: parseFloat(formData.precio),
        cantidadStock: parseInt(formData.cantidadStock)
      };
      
      onSubmit(productoData);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{producto ? '✏️ Editar Producto' : '➕ Nuevo Producto'}</h2>
          <button className="close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre del Producto *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={errors.nombre ? 'error' : ''}
              placeholder="Ej: Laptop Dell Inspiron"
            />
            {errors.nombre && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.nombre}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción *</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className={errors.descripcion ? 'error' : ''}
              placeholder="Describe las características del producto..."
            />
            {errors.descripcion && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.descripcion}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="precio">Precio (COP) *</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className={errors.precio ? 'error' : ''}
              placeholder="0"
              step="1"
              min="0"
            />
            {errors.precio && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.precio}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="cantidadStock">Cantidad en Stock *</label>
            <input
              type="number"
              id="cantidadStock"
              name="cantidadStock"
              value={formData.cantidadStock}
              onChange={handleChange}
              className={errors.cantidadStock ? 'error' : ''}
              placeholder="0"
              min="0"
            />
            {errors.cantidadStock && <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>{errors.cantidadStock}</div>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" className="btn btn-danger" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-success">
              {producto ? '💾 Actualizar' : '➕ Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductoForm;
