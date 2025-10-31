import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { LogoPrincipal, LogoTitulo } from '../assets/images';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Sobre Nosotros', href: '/#sobre-nosotros' },
    { name: 'Servicios', href: '/#servicios' },
    { name: 'Eventos', href: '/#eventos' },
    { name: 'Instructores', href: '/instructores' },
    { name: 'Contacto', href: '/contacto' },
  ];

  const isActive = (path: string) => {
    const { pathname, hash } = location;
    if (path.startsWith('/#')) {
      const targetHash = path.slice(1); // '#sobre-nosotros', etc.
      return pathname === '/' && hash === targetHash;
    }
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src={LogoPrincipal} 
                alt="Roller Speed Logo" 
                className="h-10 w-auto"
              />
              <img 
                src={LogoTitulo} 
                alt="Roller Speed Título" 
                className="h-15 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-blue border-b-2 border-primary-blue'
                      : 'text-gray-700 hover:text-primary-blue'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="btn-primary"
            >
              Inicia Sesión
            </Link>
            <Link
              to="/registro"
              className="btn-secondary"
            >
              Regístrate
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-blue"
            >
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? 'text-primary-blue bg-blue-50'
                      : 'text-gray-700 hover:text-primary-blue hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex flex-col space-y-3 px-3">
                  <Link
                    to="/login"
                    className="btn-primary text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Inicia Sesión
                  </Link>
                  <Link
                    to="/registro"
                    className="btn-secondary text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Regístrate
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;