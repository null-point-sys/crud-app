import React, { useState, useEffect } from 'react';

const CatFactsModal = ({ onClose }) => {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCatFacts();
  }, []);

  const loadCatFacts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Cargar 2 datos sobre gatos (la API no soporta español, usamos datos en inglés)
      const promises = [
        fetch('https://meowfacts.herokuapp.com/'),
        fetch('https://meowfacts.herokuapp.com/')
      ];
      
      const responses = await Promise.all(promises);
      const data = await Promise.all(responses.map(res => res.json()));
      
      const catFacts = data.map(item => item.data[0]);
      setFacts(catFacts);
    } catch (err) {
      console.error('Error al cargar datos de gatos:', err);
      setError('No se pudieron cargar los datos de gatos');
      // Datos de respaldo en caso de error
      setFacts([
        'Los gatos pueden hacer más de 100 sonidos diferentes, mientras que los perros solo pueden hacer alrededor de 10.',
        'Un grupo de gatos se llama "clowder" y un grupo de gatitos se llama "kindle".'
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h2>🐱 ¿Sabías que...?</h2>
          <button className="close" onClick={onClose}>
            ×
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🐱</div>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Datos interesantes sobre nuestros amigos felinos
          </p>
          <p style={{ color: '#999', fontSize: '14px', fontStyle: 'italic' }}>
            (Información en inglés desde la API de MeowFacts)
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔄</div>
            <p>Cargando datos curiosos sobre gatos...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">
            <strong>Error:</strong> {error}
            <div style={{ marginTop: '10px' }}>
              <button className="btn btn-warning" onClick={loadCatFacts}>
                🔄 Reintentar
              </button>
            </div>
          </div>
        ) : (
          <div>
            {facts.map((fact, index) => (
              <div 
                key={index} 
                className="alert alert-info" 
                style={{ 
                  marginBottom: '15px',
                  textAlign: 'left',
                  fontSize: '16px',
                  lineHeight: '1.5'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ 
                    fontSize: '20px', 
                    marginRight: '10px',
                    marginTop: '2px'
                  }}>
                    {index === 0 ? '🐾' : '✨'}
                  </span>
                  <span>{fact}</span>
                </div>
              </div>
            ))}
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                className="btn btn-warning" 
                onClick={loadCatFacts}
                style={{ marginRight: '10px' }}
              >
                🔄 Más datos curiosos
              </button>
              <button className="btn btn-success" onClick={onClose}>
                ✅ ¡Genial!
              </button>
            </div>
          </div>
        )}

        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '6px',
          fontSize: '14px',
          color: '#666',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0 }}>
            💡 <strong>Dato:</strong> Esta información se obtiene de la API de 
            <a href="https://meowfacts.herokuapp.com" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
              {' '}MeowFacts
            </a>
            {' '}(en inglés)
          </p>
        </div>
      </div>
    </div>
  );
};

export default CatFactsModal;
