import React from 'react';

const UnauthorizedPage = () => {
  return (
    <section style={{
      backgroundColor: '#000',
      color: '#ffffff',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
      padding: '2.5rem 2rem',
      position: 'relative'
    }}>
     

      <div style={{
        maxWidth: '800px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 700,
          color: 'red',
          marginBottom: '1rem',
          lineHeight: 1.2,
          position: 'relative',
          zIndex: 1,
          marginTop: '4rem'
        }}>
          Unauthorized!
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          maxWidth: '60vw',
          color: '#f7f7f7',
          marginBottom: '3rem',
          lineHeight: 1.8,
          fontWeight: 400,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          You are not authorized to view this page. Please log in to access the page.
        </p>


        <div style={{
          padding: '1.5rem 2rem',
          backgroundColor: '#006181',
          borderRadius: '10px',
          width: 'min(100%, 450px)',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '3rem',
          position: 'relative',
          zIndex: 1
        }}>
          <button
            onClick={() => (window.location.href = '/')}
            style={{
              backgroundColor: '#000',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '5px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s',
              flex: '1 1 150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span>Go to Login</span>
          </button>
</div>
</div>
    </section>
    
  );
};

export default UnauthorizedPage;