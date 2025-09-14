import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [uselessFact, setUselessFact] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUselessFact();
  }, []);

  const loadUselessFact = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      
      if (!response.ok) {
        throw new Error('Error al cargar el dato inútil');
      }
      
      const data = await response.json();
      setUselessFact(data.text);
    } catch (err) {
      console.error('Error al cargar dato inútil:', err);
      setError('No se pudo cargar el dato inútil del día');
      // Dato de respaldo en caso de error
      setUselessFact('The average person will spend about 25 years asleep in their lifetime.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
              🛍️ CRUD App - Gestión de Productos
            </h3>
            <p style={{ margin: '0', opacity: '0.8' }}>
              Sistema desarrollado con Spring Boot + React
            </p>
          </div>
          
          <div style={{ textAlign: 'right', minWidth: '300px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
              🎲 Dato Inútil del Día
            </h4>
            <div className="useless-fact">
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ marginRight: '10px' }}>🔄</span>
                  Cargando dato inútil...
                </div>
              ) : error ? (
                <div style={{ color: '#ffc107' }}>
                  ⚠️ {error}
                  <button 
                    onClick={loadUselessFact}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#ffc107', 
                      cursor: 'pointer',
                      marginLeft: '10px',
                      textDecoration: 'underline'
                    }}
                  >
                    Reintentar
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom: '10px' }}>
                    "{uselessFact}"
                  </div>
                  <button 
                    onClick={loadUselessFact}
                    style={{ 
                      background: 'none', 
                      border: '1px solid #fff', 
                      color: '#fff', 
                      cursor: 'pointer',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  >
                    🔄 Otro dato
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div style={{ 
          marginTop: '20px', 
          paddingTop: '20px', 
          borderTop: '1px solid #555',
          textAlign: 'center',
          fontSize: '14px',
          opacity: '0.7'
        }}>
          <p style={{ margin: '0' }}>
            💡 <strong>API utilizada:</strong>{' '}
            <a 
              href="https://uselessfacts.jsph.pl/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#ffc107', textDecoration: 'none' }}
            >
              Useless Facts API
            </a>
            {' '}| Desarrollado para prueba técnica
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
