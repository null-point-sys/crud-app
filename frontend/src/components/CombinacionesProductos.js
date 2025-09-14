import React, { useState } from 'react';

const CombinacionesProductos = () => {
  const [valorMaximo, setValorMaximo] = useState('');
  const [combinaciones, setCombinaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!valorMaximo || parseFloat(valorMaximo) <= 0) {
      setError('Por favor ingresa un valor válido mayor a 0');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/productos/combinaciones?valorMaximo=${parseFloat(valorMaximo)}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener combinaciones');
      }
      
      const data = await response.json();
      setCombinaciones(data);
    } catch (err) {
      setError(err.message);
      setCombinaciones([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setValorMaximo('');
    setCombinaciones([]);
    setError(null);
  };

  return (
    <div className="card">
      <h2>🛒 Combinaciones de Productos</h2>
      <p>
        Ingresa un valor máximo y encuentra todas las combinaciones de 2-3 productos 
        cuya suma de precios sea menor o igual a ese valor.
      </p>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <label htmlFor="valorMaximo">Valor Máximo (COP)</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="number"
              id="valorMaximo"
              value={valorMaximo}
              onChange={(e) => setValorMaximo(e.target.value)}
              placeholder="Ej: 100000"
              step="1"
              min="0"
              style={{ flex: 1 }}
            />
            <button 
              type="submit" 
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? '🔄 Buscando...' : '🔍 Buscar Combinaciones'}
            </button>
            <button 
              type="button" 
              className="btn btn-danger"
              onClick={handleClear}
            >
              🗑️ Limpiar
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
      )}

      {combinaciones.length > 0 && (
        <div>
          <h3>📋 Resultados ({combinaciones.length} combinaciones encontradas)</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Ordenadas por suma de precios (descendente)
          </p>
          
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {combinaciones.map((combinacion, index) => (
              <div key={index} className="combination-card">
                <h4>Combinación #{index + 1}</h4>
                <div className="products">
                  <strong>Productos:</strong> {combinacion.nombresProductos.join(', ')}
                </div>
                <div className="total">
                  <strong>Total:</strong> ${parseFloat(combinacion.sumaPrecios).toLocaleString('es-CO')} COP
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {combinaciones.length === 0 && !loading && valorMaximo && !error && (
        <div className="alert alert-info">
          No se encontraron combinaciones que cumplan con el criterio especificado.
        </div>
      )}

      {!valorMaximo && (
        <div className="alert alert-info">
          💡 <strong>Tip:</strong> Prueba con valores como 50000, 100000, o 200000 para ver diferentes combinaciones.
        </div>
      )}
    </div>
  );
};

export default CombinacionesProductos;
