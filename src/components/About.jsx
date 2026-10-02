import React from 'react';

function About() {
  return (
    <div style={{ 
      background: '#FDFBF7', // Un tono crema muy suave y moderno
      minHeight: '80vh', 
      padding: '80px 20px', 
      fontFamily: 'sans-serif', 
      textAlign: 'center' 
    }}>
      <div style={{ 
        maxWidth: '850px', 
        margin: '0 auto', 
        background: '#FFFFFF', // Tarjeta blanca para destacar el contenido
        padding: '60px 40px',
        borderRadius: '24px', // Bordes redondeados modernos
        boxShadow: '0 10px 30px rgba(139, 90, 43, 0.05)' // Sombra sutil y elegante
      }}>
        <h2 style={{ 
          color: '#5C4033', 
          fontSize: '2.8rem', 
          fontWeight: '800', 
          marginBottom: '25px' 
        }}>
          Sobre Nosotros 🧶
        </h2>
        
        <p style={{ 
          color: '#7D6658', 
          fontSize: '1.2rem', 
          lineHeight: '1.8', 
          marginBottom: '40px',
          fontWeight: '400'
        }}>
          En el <strong>Rincón del Crochet</strong>, somos un grupo de mujeres y hombres unidos por una misma pasión: el arte de tejer a mano. Cada puntada refleja nuestro amor por lo artesanal, la dedicación y el cuidado por los detalles.
        </p>

        {/* Sección destacada de pedidos personalizados */}
        <div style={{ 
          background: '#F9F6F0', // Fondo diferente para resaltar
          padding: '40px',
          borderRadius: '16px',
          border: '1px solid #E2D2C5',
          marginTop: '30px'
        }}>
          <h3 style={{ 
            color: '#C0392B', 
            fontSize: '1.6rem', 
            fontWeight: '700', 
            marginBottom: '20px' 
          }}>
            ✨ Hacemos realidad tus ideas
          </h3>
          
          <p style={{ 
            color: '#5C4033', 
            fontSize: '1.1rem', 
            lineHeight: '1.6', 
            fontWeight: '600'
          }}>
            ¿Tienes un diseño en mente, un amigurumi especial que te gustaría regalar o necesitas una prenda adaptada a tus medidas y colores preferidos?
          </p>
          
          <p style={{ 
            color: '#7D6658', 
            fontSize: '1.1rem', 
            lineHeight: '1.6', 
            marginBottom: '30px' 
          }}>
            Tomamos encargos y pedidos totalmente personalizados para que tengas exactamente lo que imaginas. ¡Contáctanos y tejámoslo juntos!
          </p>

          {/* Botón de contacto opcional */}
          <a 
            href="mailto:contacto@rincondelcrochet.com" 
            style={{
              background: 'linear-gradient(135deg, #D98880 0%, #C0392B 100%)',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 4px 15px rgba(192, 57, 43, 0.25)',
              display: 'inline-block'
            }}
          >
            Pedir Presupuesto
          </a>

        </div>
      </div>
    </div>
  );
}

export default About;