import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components';
import { LogoTitulo, ImagenEscuelas } from '../assets/images';

const Inicio: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex flex-col items-start space-y-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Bienvenidos a
                </h1>
                <img 
                  src={LogoTitulo} 
                  alt="Roller Speed" 
                  className="h-20 md:h-24 w-auto"
                />
              </div>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Únete a nosotros para mejorar tus habilidades deportivas con entrenadores expertos y programas de entrenamiento personalizados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700">
                    Inicia Sesión
                  </Button>
                </Link>
                <Link to="/registro">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                    Inscríbete ahora
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={ImagenEscuelas}
                  alt="Escuelas de patinaje Roller Speed"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-nosotros" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Sobre nosotros
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                En Roller Speed formamos a niños, jóvenes y adultos en el patinaje como deporte favorito para la vida. Contamos con entrenadores técnicos profesionales, fomentando el amor por el deporte y la excelencia en la enseñanza y la promoción de talentos e intercambio internacional.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Visión</h3>
                    <p className="text-gray-600">
                      Ser reconocidos como el patinaje de la región Caribe, por la calidad en la formación deportiva, la innovación en la enseñanza y la promoción de talentos a nivel nacional e internacional.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-400 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Misión</h3>
                    <p className="text-gray-600">
                      Brindar una formación integral en patinaje que desarrolle habilidades técnicas, disciplina y valores deportivos. Ofrecemos programas de calidad con expertos entrenadores para deportistas de todas las edades y niveles deportivos.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Valores</h3>
                    <p className="text-gray-600">
                      Disciplina, constancia y compromiso en cada entrenamiento.
                      Respeto hacia compañeros, entrenadores y la comunidad.
                      Excelencia: esfuerzo por mejorar cada día a día.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ofrecemos una amplia gama de programas de entrenamiento adaptados a todas las edades y niveles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Clases para Niños y Jóvenes</h3>
                <p className="text-gray-600 mb-4">
                  Programas especializados para el desarrollo de habilidades básicas y avanzadas en patinaje.
                </p>
                <div className="text-sm text-gray-500">
                  <p>• Edades: 4-17 años</p>
                  <p>• Duración: 1.5 horas</p>
                  <p>• Grupos pequeños</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Entrenamiento Avanzado</h3>
                <p className="text-gray-600 mb-4">
                  Para patinadores con experiencia que buscan perfeccionar su técnica y competir.
                </p>
                <div className="text-sm text-gray-500">
                  <p>• Nivel intermedio-avanzado</p>
                  <p>• Entrenamiento personalizado</p>
                  <p>• Preparación para competencias</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Preparación para Competencias</h3>
                <p className="text-gray-600 mb-4">
                  Entrenamiento intensivo para competidores que buscan destacar en torneos.
                </p>
                <div className="text-sm text-gray-500">
                  <p>• Entrenamiento intensivo</p>
                  <p>• Técnicas avanzadas</p>
                  <p>• Acompañamiento en competencias</p>
                </div>
              </div>
            </motion.div>
          </div>


        </div>
      </section>

      {/* Events Section */}
      <section id="eventos" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Próximos Eventos
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Mantente al día con nuestros eventos, competencias y actividades especiales
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Campeonato Regional de Velocidad</h3>
                  <p className="text-sm text-gray-500">15 de Febrero, 2024</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Competencia regional donde nuestros atletas demostrarán sus habilidades en pista de velocidad.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">📍 Pista Municipal</span>
                <span className="text-sm font-medium text-teal-600">Competencia</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-orange-400 w-12 h-12 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Jornada de Puertas Abiertas</h3>
                  <p className="text-sm text-gray-500">22 de Febrero, 2024</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Ven y conoce nuestras instalaciones, entrenadores y programas. Clases de prueba gratuitas.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">📍 Roller Speed</span>
                <span className="text-sm font-medium text-orange-600">Evento Abierto</span>
              </div>
            </motion.div>
          </div>


        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-teal-600">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para comenzar tu aventura?
            </h2>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Únete a nuestra comunidad y descubre todo tu potencial sobre ruedas
            </p>
            <Link to="/contacto">
              <Button variant="secondary" size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                Contáctanos Ahora
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;