import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon 
} from '@heroicons/react/24/outline';
import { LogoPrincipal, LogoTitulo } from '../assets/images';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={LogoPrincipal} 
                alt="Roller Speed Logo" 
                className="h-16 w-auto"
              />
              <img 
                src={LogoTitulo} 
                alt="Roller Speed Título" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Escuela de patinaje líder en formación deportiva. Desarrollamos habilidades, 
              fortalecemos el carácter y creamos campeones dentro y fuera de la pista.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-300 hover:text-primary-yellow transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-primary-yellow transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.876.807 1.366 1.958 1.366 3.255s-.49 2.448-1.297 3.323c-.876.876-2.027 1.366-3.324 1.366zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.876-.875-1.366-2.026-1.366-3.323s.49-2.448 1.297-3.323c.875-.876 2.026-1.366 3.323-1.366s2.448.49 3.323 1.297c.876.875 1.366 2.026 1.366 3.323s-.49 2.448-1.297 3.323c-.875.876-2.026 1.366-3.323 1.366z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-primary-yellow transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-yellow transition-colors duration-200">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/sobre-nosotros" className="text-gray-300 hover:text-primary-yellow transition-colors duration-200">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-300 hover:text-primary-yellow transition-colors duration-200">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="text-gray-300 hover:text-primary-yellow transition-colors duration-200">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-primary-yellow transition-colors duration-200">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-primary-yellow mr-3" />
                <span className="text-gray-300">Calle 123 #45-67, Ciudad</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-primary-yellow mr-3" />
                <span className="text-gray-300">+57 300 123 4567</span>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-primary-yellow mr-3" />
                <span className="text-gray-300">info@rollerspeed.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria y derechos reservados */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 ROLLER SPEED. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;