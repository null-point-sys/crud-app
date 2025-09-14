import React, { useState, useEffect } from 'react';
import ProductoList from './components/ProductoList';
import ProductoForm from './components/ProductoForm';
import InventarioStats from './components/InventarioStats';
import CombinacionesProductos from './components/CombinacionesProductos';
import CatFactsModal from './components/CatFactsModal';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);
  const [showCatFacts, setShowCatFacts] = useState(false);

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProductos();
    // Mostrar modal de datos de gatos al cargar la página
    setShowCatFacts(true);
  }, []);

  const loadProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/productos');
      if (!response.ok) {
        throw new Error('Error al cargar productos');
      }
      const data = await response.json();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProducto = async (productoData) => {
    try {
      const response = await fetch('/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoData),
      });

      if (!response.ok) {
        throw new Error('Error al crear producto');
      }

      await loadProductos();
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateProducto = async (id, productoData) => {
    try {
      const response = await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar producto');
      }

      await loadProductos();
      setShowForm(false);
      setEditingProducto(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteProducto = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const response = await fetch(`/api/productos/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar producto');
        }

        await loadProductos();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEditProducto = (producto) => {
    setEditingProducto(producto);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProducto(null);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <h2>Cargando productos...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <header className="card">
          <h1>🛍️ CRUD App - Gestión de Productos</h1>
          <p>Sistema de gestión de inventario con operaciones CRUD completas</p>
        </header>

        {error && (
          <div className="alert alert-danger">
            <strong>Error:</strong> {error}
            <button 
              className="btn btn-danger" 
              onClick={() => setError(null)}
              style={{ marginLeft: '10px' }}
            >
              Cerrar
            </button>
          </div>
        )}

        <InventarioStats productos={productos} />

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Lista de Productos</h2>
            <button 
              className="btn btn-success"
              onClick={() => setShowForm(true)}
            >
              ➕ Nuevo Producto
            </button>
          </div>
          
          <ProductoList
            productos={productos}
            onEdit={handleEditProducto}
            onDelete={handleDeleteProducto}
            onRefresh={loadProductos}
          />
        </div>

        <CombinacionesProductos />

        {showForm && (
          <ProductoForm
            producto={editingProducto}
            onSubmit={editingProducto ? 
              (data) => handleUpdateProducto(editingProducto.id, data) : 
              handleCreateProducto
            }
            onClose={handleCloseForm}
          />
        )}

        {showCatFacts && (
          <CatFactsModal onClose={() => setShowCatFacts(false)} />
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
