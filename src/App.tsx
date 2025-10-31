import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components';
import { 
  Inicio, 
  Instructores,
  Contacto, 
  Login, 
  Registro 
} from './pages';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Desplazar suavemente a la sección si hay hash en la URL
    if (location.hash) {
      // Pequeño retraso para asegurar que el DOM esté listo
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Rutas con layout completo (Navbar + Footer) */}
        <Route path="/" element={
          <>
            <Navbar />
            <main className="flex-grow">
              <Inicio />
            </main>
            <Footer />
          </>
        } />
        <Route path="/instructores" element={
          <>
            <Navbar />
            <main className="flex-grow">
              <Instructores />
            </main>
            <Footer />
          </>
        } />
        <Route path="/contacto" element={
          <>
            <Navbar />
            <main className="flex-grow">
              <Contacto />
            </main>
            <Footer />
          </>
        } />
        
        {/* Rutas de autenticación sin Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* Ruta 404 - Página no encontrada */}
        <Route path="*" element={
          <>
            <Navbar />
            <main className="flex-grow flex items-center justify-center section-padding">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-primary-blue mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Página no encontrada</h2>
                <p className="text-gray-600 mb-8">La página que buscas no existe o ha sido movida.</p>
                <a 
                  href="/" 
                  className="inline-flex items-center px-6 py-3 bg-primary-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Volver al Inicio
                </a>
              </div>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
